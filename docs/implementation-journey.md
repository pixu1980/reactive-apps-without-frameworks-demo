# Reactive App Implementation Journey

A single markdown file that can be split into slides with Reveal.js.
Use one `---` separator per horizontal slide.

---

## The Big Idea

We wanted a small app with no framework, but still with:

- one shared state tree
- reactive updates
- tiny DOM changes
- reusable UI functions
- translated labels

The story is easier to understand if we follow the build order.

1. Start with the store.
2. Add signals.
3. Turn templates into DOM parts.
4. Add i18n.
5. Compose everything as plain functions.

---

## Step 1 - Start with the Store

The first problem is simple:

- where does the truth live?

The answer is the store.

The store is the one mutable state tree used by the whole app.
Everything else depends on it:

- actions write into it
- signals react to it
- templates read from it
- components stay thin because they do not own data copies

Without this first step, every other step becomes messy.

---

## Step 1 - How the Store Is Implemented

The store is a proxy based wrapper around a deep cloned state object.

```js
export class Store {
  constructor(initialState = {}, options = {}) {
    this.events = options.eventsTarget ?? window;
    this.target = deepClone(initialState);
    this.proxyCache = new WeakMap();
    this.state = this.createProxy(this.target, []);
  }

  createProxy(target, path) {
    if (!isObject(target)) return target;
    if (this.proxyCache.has(target)) return this.proxyCache.get(target);

    const proxy = new Proxy(target, {
      get: (raw, key, receiver) => {
        if (key === '__raw') return raw;
        if (key === '__path') return path;

        const value = Reflect.get(raw, key, receiver);
        return isObject(value) ? this.createProxy(value, [...path, key]) : value;
      },
      set: (raw, key, value, receiver) => {
        const nextPath = [...path, key];
        const oldValue = raw[key];
        const prepared = clonePlainValue(value);
        const result = Reflect.set(raw, key, prepared, receiver);

        if (oldValue !== prepared) {
          this.emitChange(nextPath, oldValue, prepared);
        }

        return result;
      },
    });

    this.proxyCache.set(target, proxy);
    return proxy;
  }
}
```

What this implementation gives us:

- Nested objects are wrapped lazily, only when they are read.
- The same nested object always gets the same proxy instance.
- Direct writes like `store.state.filters.status = 'done'` are allowed.
- Every meaningful write emits one `store:change` event.

---

## Step 1 - Why This Store Design Works Well

Two details matter a lot.

### 1. It clones what it emits

The change event does not leak internal references.
Listeners receive safe payloads.

```js
emitChange(path, oldValue, newValue) {
  const detail = {
    path: pathToString(path),
    oldValue: deepClone(oldValue),
    newValue: deepClone(newValue),
  };

  const event = new CustomEvent('store:change', { detail });
  this.events.dispatchEvent(event);
}
```

### 2. It also exposes helper APIs

It is not only direct mutation.
It also supports structured reads and writes.

```js
store.get('filters.status');
store.set('preferences.language', 'it');
store.update('draft.notes', (value) => `${value}\nNext step`);
store.snapshot();
```

That combination keeps the store easy to teach and easy to use.

---

## Step 2 - Add Signals

The store answers one question:

- where is the data?

Signals answer the next one:

- what should react when that data changes?

This runtime uses three pieces:

- `BaseSignal` for subscription and dependency tracking
- `StateSignal` for mutable values
- `ComputedSignal` for derived values

Then `effect()` turns signal reads into rerunnable side effects.

---

## Step 2 - How State Signals Are Implemented

Signals are small on purpose.
The base class only knows how to subscribe, track, and notify.

```js
export class BaseSignal {
  constructor() {
    this.subscribers = new Set();
    this.__isSignal = true;
  }

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  }

  track() {
    const current = getCurrentCollector();
    if (current) current.addDependency(this);
  }

  notify() {
    for (const subscriber of [...this.subscribers]) subscriber();
  }
}

export class StateSignal extends BaseSignal {
  constructor(value, options = {}) {
    super();
    this.value = value;
    this.equals = options.equals ?? Object.is;
  }

  get() {
    this.track();
    return this.value;
  }

  set(nextValue) {
    if (this.equals(this.value, nextValue)) return this.value;

    this.value = nextValue;
    this.notify();
    return this.value;
  }
}
```

That means a state signal does exactly two jobs:

- return a tracked value on `get()`
- notify subscribers on `set()`

---

## Step 2 - How Computed Signals and Effects Are Implemented

Computed values are lazy.
They only recompute when needed.

```js
export class ComputedSignal extends BaseSignal {
  constructor(compute, options = {}) {
    super();
    this.compute = compute;
    this.equals = options.equals ?? Object.is;
    this.dependencies = new Map();
    this.cached = undefined;
    this.dirty = true;
    this.boundInvalidate = this.invalidate.bind(this);
  }

  addDependency(signal) {
    if (this.dependencies.has(signal)) return;
    const unsubscribe = signal.subscribe(this.boundInvalidate);
    this.dependencies.set(signal, unsubscribe);
  }

  invalidate() {
    if (this.dirty) return;
    this.dirty = true;
    this.notify();
  }

  get() {
    this.track();
    return this.evaluate();
  }
}

export function effect(callback) {
  const runner = new EffectCollector(callback);
  return () => runner.stop();
}
```

The important mental model is:

1. `get()` is tracked.
2. tracked reads become dependencies.
3. dependency changes call `invalidate()`.
4. the next `get()` recomputes the cached value.
5. `effect()` reruns code that read those signals.

---

## Step 2 - How the App Uses Signals

The app does not create one signal per field.
Instead, it uses the store as the main source of truth and one shared tick signal as the invalidation bridge.

```js
export const tickState = new Signal.State(0, { equals: () => false });

function handleStoreChange(event) {
  persistState();
  tickState.set(performance.now());
}

export const visibleTodos = new Signal.Computed(() => {
  tickState.get();
  return pipelineTodos(store.state.todos, store.state.filters, store.state.preferences.language);
});

effect(() => {
  tickState.get();
  render(App(), root);
});
```

This is the bridge:

- the store emits a change
- `state/_store-setup.js` bumps `tickState`
- computed views and render effects wake up

---

## Step 3 - DOM Parts and the Template Engine

Now we know when to react.
The next problem is:

- where do we update the DOM?

The answer is DOM parts.

A part is a tiny object that owns one dynamic zone:

- child content
- attributes
- DOM properties
- event listeners

The template engine turns template expressions into these tiny parts.

---

## Step 3 - How a Template Becomes Parts

`html` does not create DOM immediately.
It only returns a `template-result` object.

Later, `TemplateInstance` parses the literal and converts every dynamic slot into a part descriptor.

```js
for (let index = 0; index < strings.length - 1; index += 1) {
  const chunk = strings[index];
  markup += chunk;
  const attributeMatch = chunk.match(ATTRIBUTE_PART_RE);

  if (attributeMatch) {
    markup += `__part_${index}__`;
  } else {
    markup += `<!--part:${index}-->`;
  }
}

if (descriptor.type === 'child') {
  part = new ChildNodePart(start, end);
} else if (descriptor.type === 'attribute') {
  part = new AttributePart(node, descriptor.name);
} else if (descriptor.type === 'property') {
  part = new PropertyPart(node, descriptor.name);
} else if (descriptor.type === 'event') {
  part = new EventPart(node, descriptor.name);
}
```

So one template literal becomes:

- one cached static HTML skeleton
- many tiny dynamic parts mapped by index

---

## Step 3 - How Parts Read Signals

Parts can receive plain values, directives, or signals.
When they receive a signal, they subscribe directly to it.

```js
export class Part {
  bindSignal(signal, callback) {
    this.disposeSignal();
    this.signalCleanup = signal.subscribe(() => callback(signal.get()));
    callback(signal.get());
  }
}

setValue(value) {
  if (isSignalLike(value)) {
    this.bindSignal(value, (resolved) => this.commit(resolved));
    return;
  }

  this.disposeSignal();
  this.commit(value);
}
```

This is the key idea:

- the part reads the current signal value immediately
- the part subscribes to future invalidations
- only that part commits the next DOM change

No virtual tree diff is needed.

---

## Step 3 - How Parts Update the DOM

Each part commits in a different way.

```js
commitNode(node) {
  clearRange(this.start, this.end);
  this.currentNode = node;
  this.start.parentNode.insertBefore(node, this.end);
}

commit(value) {
  if (value == null || value === false) {
    this.element.removeAttribute(this.name);
    return;
  }

  this.element.setAttribute(this.name, value === true ? '' : String(value));
}

commit(value) {
  this.element[this.name] = value;
}
```

That gives us three very different update modes:

- `ChildNodePart` replaces only one DOM range
- `AttributePart` sets or removes HTML attributes
- `PropertyPart` writes directly to DOM properties

`EventPart` is even smaller: it only swaps listeners.

---

## Step 3 - What One Template Expression Becomes

This single template uses several part types at once.

```js
html` <button class=${buttonTone} .disabled=${isSaving} @click=${saveTodo} aria-label=${t(language, 'buttons.save')}>${labelSignal}</button> `;
```

What happens under the hood:

- `${labelSignal}` becomes a `ChildNodePart`
- `class=${buttonTone}` becomes an `AttributePart`
- `.disabled=${isSaving}` becomes a `PropertyPart`
- `@click=${saveTodo}` becomes an `EventPart`
- `aria-label=${...}` becomes another `AttributePart`

That is why the runtime can update text, attributes, properties, and events independently.

---

## Step 3 - `html()` Implementation and Usage

`html()` is intentionally tiny.
It does not create elements.
It only packages strings and values.

```js
export function html(strings, ...values) {
  return {
    kind: 'template-result',
    strings,
    values,
  };
}
```

Usage:

```js
export function GreetingCard(language) {
  return html`
    <section data-surface="card">
      <h2>${t(language, 'app.title')}</h2>
      <p>${t(language, 'app.subcopyPrimary')}</p>
    </section>
  `;
}
```

Why this matters:

- authoring stays declarative
- DOM creation is deferred
- the template literal identity can be cached later

---

## Step 3 - `render()` Implementation and Usage

`render()` creates one stable root part per container and reuses it forever.

```js
export function render(result, container) {
  let rootPart = container.__rootPart;

  if (!rootPart) {
    const start = document.createComment('root:start');
    const end = document.createComment('root:end');

    container.textContent = '';
    container.append(start, end);
    rootPart = new ChildNodePart(start, end);
    container.__rootPart = rootPart;
  }

  rootPart.setValue(result);
}
```

Usage in the app bootstrap:

```js
effect(() => {
  tickState.get();
  render(App(), root);
});
```

So the app does not recreate the mount strategy on every render.
It only pushes a new template result into the same root part.

---

## Step 3 - `model()` Implementation and Usage

`model()` is a directive factory.
It packages the read and write contract for a form control.

```js
export function model(config) {
  return directive('model', config);
}

commitModel(config) {
  const eventName = config.event ?? 'input';
  const property = config.prop ?? inferModelProperty(this.element);

  const onInput = (event) => {
    const target = event.currentTarget;
    const nextValue = property === 'checked' ? target.checked : target[property];
    config.set(nextValue);
  };

  this.element.addEventListener(eventName, onInput);

  if (config.signal && isSignalLike(config.signal)) {
    this.bindSignal(config.signal, syncAfterRender);
    return;
  }

  syncAfterRender();
}
```

Usage in real components:

```js
<input model=${todoModel(todo.id, 'title')} />

<select model=${todoModel(todo.id, 'priority', { event: 'change' })}>
  ${priorityOptions()}
</select>
```

This is two way binding without a framework runtime:

- read the current value into the field
- listen to user input
- write the next value back into state

---

## Step 3 - `repeat()` Implementation and Usage

`repeat()` is also a directive factory, but for keyed collections.

```js
export function repeat(items, key, renderItem) {
  return directive('repeat', {
    items,
    key,
    renderItem,
  });
}

for (let index = list.length - 1; index >= 0; index -= 1) {
  const item = list[index];
  const itemKey = key(item);
  let block = state.blocks.get(itemKey);

  if (!block) {
    block = createBlock(itemKey, referenceNode);
    block.part.setValue(renderItem(item));
    block.item = item;
  } else {
    if (!isRangeBeforeReference(block.start, block.end, referenceNode)) {
      moveRangeBefore(block.start, block.end, referenceNode);
    }

    if (block.item !== item) {
      block.part.setValue(renderItem(item));
      block.item = item;
    }
  }
}
```

Usage in the todo list:

```js
<ol data-list-reset data-slot="items">
  ${repeat(visibleTodos, (todo) => `${todo.id}:${language}`, TodoItem)}
</ol>
```

Why this matters:

- keys keep item blocks stable
- items can move without full rerendering
- each item keeps its own child part subtree

---

## Step 4 - Add i18n as a Small Service

The UI also needs words.
The i18n service stays intentionally small.

```js
function lookup(source, key) {
  const segments = key.split('.');
  let cursor = source;

  for (const segment of segments) {
    if (typeof cursor !== 'object' || cursor === null) {
      return undefined;
    }

    cursor = cursor?.[segment];
  }

  return typeof cursor === 'string' ? cursor : undefined;
}

export function t(language, key, params = {}) {
  const messages = dictionary[language] ?? dictionary.en;
  const template = lookup(messages, key) ?? lookup(dictionary.en, key) ?? key;
  return interpolate(template, params);
}
```

Usage stays simple too.

```js
t(language, 'buttons.newTodo');
optionLabel(language, 'priority', 'high');
visibleSummaryLabel(language, 4, 'priority');
```

That is enough for this app:

- resolve nested keys
- fall back to English
- interpolate placeholders

---

## Step 5 - Compose Everything as Plain Functions

Now the UI can stay extremely small.
Each component is just a function that imports services and returns `html`.

```js
export function App() {
  return html`
    ${Header()}
    <main data-component="app-shell">${StatsRow()} ${TodoList()}</main>
    <aside data-slot="controls">${Filters()} ${BulkActions()}</aside>
    <aside data-slot="debug-sidebar">${DebugPanel()}</aside>
    ${TodoModal()} ${CategoryModal()}
  `;
}

export function TodoList() {
  const language = store.state.preferences.language;

  return html`
    <section data-component="todo-list">
      <header data-slot="header">
        <h2>${t(language, 'sections.reactiveList')}</h2>
        <p data-slot="summary">${visibleLabel}</p>
      </header>
      <ol data-list-reset data-slot="items">
        ${repeat(visibleTodos, (todo) => `${todo.id}:${language}`, TodoItem)}
      </ol>
    </section>
  `;
}
```

This feels like functional components because each unit:

- reads services
- returns a template
- composes other functions

No class component is needed.
No framework runtime is needed.

---

## The Full Flow

Here is the whole pipeline in one sequence.

1. The user types into a field.
2. `model(...)` captures the event and writes into the store.
3. The store emits `store:change`.
4. `state/_store-setup.js` persists the snapshot and bumps `tickState`.
5. Computed signals become dirty.
6. Effects rerun and call `render(...)` again.
7. Template parts update only the exact DOM zones that changed.

That is the entire reactive loop.

---

## Final Takeaway

This architecture is not one magic abstraction.
It is a pipeline of small ideas.

- The store owns the truth.
- Signals know what is stale.
- DOM parts know where to update.
- The template engine turns updates into an ergonomic authoring model.
- i18n provides the words.
- Plain functions compose the final UI.

That is how this project builds a reactive app without a framework.
