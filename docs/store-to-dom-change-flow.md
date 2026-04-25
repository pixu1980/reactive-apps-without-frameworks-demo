# Store to DOM Change Flow

This walkthrough follows one real update in the demo: the user checks the
`completed` checkbox on a todo item.

The goal is to show how one logical property change travels through the runtime:

```text
DOM input
  -> model directive
  -> todo action
  -> proxy store write
  -> store:change event
  -> tickState signal
  -> computed signals and effects
  -> template parts
  -> DOM updates
```

The important detail: the demo does not create one signal per store field. The
proxy store is the source of truth. `tickState` is the bridge that tells the
signal layer, "something in the store changed".

---

## Step 0 - State Shape

The store holds one plain state tree. A todo item has a `completed` field, but
the rest of the runtime only knows it as data inside `store.state.todos`.

```js
/**
 * Single todo item rendered by the demo.
 * @typedef {object} TodoItem
 * @property {string} id
 * @property {string} title
 * @property {string} notes
 * @property {string} category
 * @property {TodoPriority} priority
 * @property {string} dueDate
 * @property {boolean} completed
 * @property {boolean} selected
 * @property {number} createdAt
 */
```

Source: `src/scripts/data/_data.js`

---

## Step 1 - The Component Binds a Field to `model()`

`TodoItem()` renders a checkbox for the `completed` field. The template does not
wire the field manually. It passes a `model` directive to the template engine.

```js
export function TodoItem(todo) {
  const language = store.state.preferences.language;
  const isDone = todo.completed;

  return html`
    <label data-control-group="checkline" data-slot="completion-toggle">
      <input
        model=${todoModel(todo.id, 'completed', {
          prop: 'checked',
          event: 'change',
        })}
        type="checkbox"
      />
      <span>${t(language, 'labels.done')}</span>
    </label>
  `;
}
```

Source: `src/scripts/components/TodoItem/_TodoItem.js`

Mental model:

- `model=...` becomes an `AttributePart` because it is an attribute position.
- `todoModel(...)` describes how to read and write that field.
- The checkbox itself stays a normal native input.

---

## Step 2 - `todoModel()` Builds the Read and Write Contract

`todoModel()` wraps the field in a directive payload. It gives the renderer three
things:

- `signal`: what tells the control to resync after store changes
- `get`: how to read the current value
- `set`: how to write the next value

```js
export function todoModel(todoId, field, options = {}) {
  return model({
    signal: tickState,
    get: () => getTodoById(todoId)?.[field] ?? (options.prop === 'checked' ? false : ''),
    set: (value) => updateTodo(todoId, { [field]: value }),
    ...options,
  });
}
```

Source: `src/scripts/helpers/models/_todoModel.js`

For the checkbox, `field` is `"completed"`, `prop` is `"checked"`, and `event`
is `"change"`.

---

## Step 3 - `AttributePart` Turns `model()` Into a DOM Listener

When the template engine sees `model=${...}`, `AttributePart.setValue()` detects
the directive and calls `commitModel()`.

```js
setValue(value) {
  if (this.name === "model" && isDirective(value, "model")) {
    this.commitModel(value.payload);
    this.value = value;

    return;
  }

  if (isSignalLike(value)) {
    this.disposeModel();
    this.bindSignal(value, (resolved) => this.commit(resolved));

    return;
  }

  this.disposeModel();
  this.disposeSignal();
  this.commit(value);
}
```

Source: `src/scripts/core/template-engine/_attribute-part.js`

Inside `commitModel()`, the part creates the actual browser event listener.

```js
const onInput = (event) => {
  const target = event.currentTarget;
  const nextValue = property === 'checked' ? target.checked : target[property];

  binding.config.set(nextValue);
};

this.element.addEventListener(eventName, onInput);
```

Source: `src/scripts/core/template-engine/_attribute-part.js`

So when the user checks the checkbox:

```text
change event -> onInput -> binding.config.set(true)
```

For this checkbox, `binding.config.set(true)` calls:

```js
updateTodo(todoId, { completed: true });
```

---

## Step 4 - The Action Writes Into the Proxy Store

`updateTodo()` finds the item and replaces it with a new object containing the
patch.

```js
export function updateTodo(id, patch) {
  const index = store.state.todos.findIndex((todo) => todo.id === id);

  if (index < 0) {
    return;
  }

  const current = store.state.todos[index];

  store.state.todos[index] = { ...current, ...patch };
}
```

Source: `src/scripts/helpers/actions/_updateTodo.js`

Logical change:

```js
todo.completed = true;
```

Actual write performed by the app:

```js
store.state.todos[index] = {
  ...current,
  completed: true,
};
```

That means the store event path is the array slot, for example `todos.1`, not a
deep path like `todos.1.completed`. The field changed, but the proxy assignment
replaced the whole todo object.

---

## Step 5 - The Proxy `set` Trap Detects the Write

The store wraps the state tree in proxies. Nested objects and arrays are wrapped
lazily when they are read.

```js
createProxy(target, path) {
  if (!isObject(target)) return target;
  if (this.proxyCache.has(target)) return this.proxyCache.get(target);

  const proxy = new Proxy(target, {
    get: (raw, key, receiver) => {
      if (key === "__raw") return raw;
      if (key === "__path") return path;

      const value = Reflect.get(raw, key, receiver);

      if (isObject(value)) return this.createProxy(value, [...path, key]);

      return value;
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
```

Source: `src/scripts/core/store/_store.js`

For `store.state.todos[index] = nextTodo`, the trap receives:

```text
path before write: ["todos"]
key: index
nextPath: ["todos", index]
oldValue: previous todo object
prepared: cloned next todo object
```

If the value changed, the store emits a change event.

---

## Step 6 - The Store Emits `store:change`

The store does not expose raw internal references. It clones the payload before
dispatching the event.

```js
emitChange(path, oldValue, newValue) {
  const detail = {
    path: pathToString(path),
    oldValue: deepClone(oldValue),
    newValue: deepClone(newValue),
  };

  const event = new CustomEvent("store:change", { detail });
  this.events.dispatchEvent(event);
}
```

Source: `src/scripts/core/store/_store.js`

Example payload shape:

```js
{
  path: "todos.1",
  oldValue: { title: "Refine the keyed repeat engine", completed: false },
  newValue: { title: "Refine the keyed repeat engine", completed: true }
}
```

The event path is useful for debug output and persistence. It is not used as a
granular dependency graph in this demo.

---

## Step 7 - `_App.js` Bridges Store Events to Signals

The app listens to one browser event: `store:change`.

```js
window.addEventListener('store:change', (event) => {
  handleStoreChange(event, {
    store,
    tickState,
    getIsWritingDebugLog: () => isWritingDebugLog,
    setIsWritingDebugLog: (value) => {
      isWritingDebugLog = value;
    },
  });
});
```

Source: `src/scripts/components/App/_App.js`

`handleStoreChange()` handles side effects, then bumps `tickState`.

```js
export function handleStoreChange(event, context) {
  if (context.getIsWritingDebugLog()) {
    return;
  }

  if (!context.store.state.debug.paused && event.detail.path !== 'debug.logs') {
    context.setIsWritingDebugLog(true);

    try {
      appendDebugLog(event.detail, context.store);
    } finally {
      context.setIsWritingDebugLog(false);
    }
  }

  persistState(context.store);
  context.tickState.set(performance.now());
}
```

Source: `src/scripts/components/App/_App.helpers.js`

This is the main bridge:

```text
proxy write -> store:change -> handleStoreChange -> tickState.set(...)
```

---

## Step 8 - `tickState` Is a Deliberately Noisy Signal

`tickState` is created with an equality function that always returns `false`.
Every call to `set()` notifies subscribers, even if the numeric value looks
similar.

```js
export const tickState = new Signal.State(0, { equals: () => false });
```

Source: `src/scripts/components/App/_App.state.js`

The state signal implementation is tiny.

```js
export class StateSignal extends BaseSignal {
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

Source: `src/scripts/core/signals/_state-signal.js`

`notify()` calls every subscriber registered on that signal.

```js
notify() {
  for (const subscriber of [...this.subscribers]) subscriber();
}
```

Source: `src/scripts/core/signals/_base-signal.js`

So `tickState` means:

```text
No business meaning. Just a pulse.
```

---

## Step 9 - Computed Signals Become Dirty

Computed signals read `tickState` to join that pulse.

```js
export const visibleTodos = new Signal.Computed(() => {
  tickState.get();

  return pipelineTodos(store.state.todos, store.state.filters, store.state.preferences.language);
});
```

Source: `src/scripts/helpers/computed/_visibleTodos.js`

During the first evaluation, `tickState.get()` calls `track()`. Because the
computed signal is the active collector, it subscribes to `tickState`.

```js
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
```

Source: `src/scripts/core/signals/_computed-signal.js`

When `tickState` changes:

```text
tickState.notify()
  -> visibleTodos.invalidate()
  -> visibleTodos.dirty = true
  -> visibleTodos.notify()
```

The computed value is lazy. It does not recompute during `invalidate()`.
It recomputes on the next `get()`.

```js
get() {
  this.track();

  return this.evaluate();
}
```

Source: `src/scripts/core/signals/_computed-signal.js`

---

## Step 10 - Effects Are Scheduled, Not Run Inline

`mountApp()` creates two effects. Both read `tickState`, so both subscribe to the
same pulse.

```js
effect(() => {
  tickState.get();
  syncDocumentPreferences(store);
});

effect(() => {
  tickState.get();
  render(App(), root);
  scheduleAppShellSizeSync(() => {
    syncAppShellSize({
      root,
      observedAppShell,
      setObservedAppShell: (value) => {
        observedAppShell = value;
      },
      appShellResizeObserver,
    });
  });
});
```

Source: `src/scripts/components/App/_App.js`

An effect subscribes to every signal it reads. When that signal changes, the
effect is queued in a microtask.

```js
addDependency(signal) {
  if (this.dependencies.has(signal)) return;

  const unsubscribe = signal.subscribe(() => schedule(this));
  this.dependencies.set(signal, unsubscribe);
}
```

Source: `src/scripts/core/signals/_effect-collector.js`

The scheduler batches repeated invalidations.

```js
export function schedule(effect) {
  scheduled.add(effect);

  if (flushing) return;

  flushing = true;

  queueMicrotask(() => {
    try {
      while (scheduled.size > 0) {
        const batch = [...scheduled];
        scheduled.clear();

        for (const job of batch) {
          job.run();
        }
      }
    } finally {
      flushing = false;
    }
  });
}
```

Source: `src/scripts/core/signals/_scheduler.js`

That means one store mutation can notify many subscribers, but the app render
effect still runs through one queued job.

---

## Step 11 - `render()` Reuses One Stable Root Part

The render effect calls `render(App(), root)`. The first render creates a root
`ChildNodePart`. Later renders reuse it.

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

Source: `src/scripts/core/template-engine/_template.js`

`App()` returns a plain template result.

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
```

Source: `src/scripts/components/App/_App.js`

`html()` itself only packages strings and values. It does not touch the DOM.

```js
export function html(strings, ...values) {
  return {
    kind: 'template-result',
    strings,
    values,
  };
}
```

Source: `src/scripts/core/template-engine/_template-helpers.js`

---

## Step 12 - Template Instances Push Values Into Parts

The template engine parses each template literal once, then maps every dynamic
expression to a part.

```js
if (descriptor.type === 'child') {
  const start = document.createComment(`start:${descriptor.index}`);
  const end = document.createComment(`end:${descriptor.index}`);

  node.replaceWith(start, end);
  part = new ChildNodePart(start, end);
} else if (descriptor.type === 'attribute') {
  node.removeAttribute(descriptor.rawName);
  part = new AttributePart(node, descriptor.name);
} else if (descriptor.type === 'property') {
  node.removeAttribute(descriptor.rawName);
  part = new PropertyPart(node, descriptor.name);
} else if (descriptor.type === 'event') {
  node.removeAttribute(descriptor.rawName);
  part = new EventPart(node, descriptor.name);
}
```

Source: `src/scripts/core/template-engine/_template-instance.js`

On each update, the values are pushed into their matching parts.

```js
update(values) {
  for (let index = 0; index < values.length; index += 1) {
    const part = this.parts.get(index);

    if (!part) {
      continue;
    }

    part.setValue(values[index]);
  }
}
```

Source: `src/scripts/core/template-engine/_template-instance.js`

The runtime updates DOM zones, not component instances.

---

## Step 13 - `repeat()` Reconciles the Todo List

The todo list receives `visibleTodos`, which is a computed signal.

```js
export function TodoList() {
  const language = store.state.preferences.language;

  return html`
    <ol data-list-reset data-slot="items">
      ${repeat(visibleTodos, (todo) => `${todo.id}:${language}`, TodoItem)}
    </ol>
  `;
}
```

Source: `src/scripts/components/TodoList/_TodoList.js`

When `ChildNodePart` commits a repeat directive, it subscribes to the signal-like
items source.

```js
commitRepeat({ items, key, renderItem }) {
  this.repeatPayload = { items, key, renderItem };

  if (isSignalLike(items)) {
    this.bindRepeatItemsSignal(items);
  } else {
    this.disposeRepeatItemsSignal();
  }

  const source = isSignalLike(items) ? items.get() : items;
  const list = Array.isArray(source)
    ? source
    : isIterable(source)
      ? [...source]
      : [];
}
```

Source: `src/scripts/core/template-engine/_child-node-part.js`

Existing blocks are keyed. If the same key stays in the list but the item object
changes, only that block renders again.

```js
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
```

Source: `src/scripts/core/template-engine/_child-node-part.js`

Because `updateTodo()` replaces the todo object, `block.item !== item` becomes
true for that todo. The keyed block stays in place, but its internal template is
updated.

---

## Step 14 - DOM Parts Commit the Final Changes

When `TodoItem(nextTodo)` runs again, `isDone` changes from `false` to `true`.

```js
const isDone = todo.completed;

return html`
  <article data-component="todo-item" data-priority=${todo.priority} data-state=${isDone ? 'done' : 'open'}>
    <input aria-label=${t(language, 'fields.title')} aria-readonly=${String(isDone)} data-slot="title" model=${todoModel(todo.id, 'title')} readonly=${isDone} />
  </article>
`;
```

Source: `src/scripts/components/TodoItem/_TodoItem.js`

Different expressions land in different part types:

- `data-state=${...}` lands in `AttributePart`.
- `readonly=${isDone}` lands in `AttributePart`.
- `model=${todoModel(...)}` lands in `AttributePart.commitModel()`.
- Text content like `${visibleLabel}` lands in `ChildNodePart`.
- Event bindings like `@click=${...}` land in `EventPart`.

An attribute part writes directly to the element.

```js
commit(value) {
  if (value == null || value === false) {
    this.element.removeAttribute(this.name);
    return;
  }

  this.element.setAttribute(this.name, value === true ? "" : String(value));
}
```

Source: `src/scripts/core/template-engine/_attribute-part.js`

A child node part replaces only its marker range.

```js
commitNode(node) {
  clearRange(this.start, this.end);
  this.currentNode = node;
  this.start.parentNode.insertBefore(node, this.end);
}
```

Source: `src/scripts/core/template-engine/_child-node-part.js`

The checkbox model also syncs from state after the signal pulse.

```js
const sync = () => {
  const nextValue = binding.config.get();

  if (property === 'checked') {
    const normalizedValue = Boolean(nextValue);

    if (this.element.checked !== normalizedValue) {
      this.element.checked = normalizedValue;
    }
  }
};
```

Source: `src/scripts/core/template-engine/_attribute-part.js`

So the visible result is:

```text
checkbox.checked = true
article[data-state="done"]
readonly fields become readonly
summary counts update
visible list may reorder or refilter
debug panel gets one new entry
```

---

## What Runs Synchronously and What Runs Later

One store write causes two kinds of work.

Synchronous work during `tickState.notify()`:

- model bindings subscribed to `tickState` resync controls
- computed signals become dirty and notify their subscribers
- DOM parts bound directly to computed signals may refresh immediately
- repeat parts bound to `visibleTodos` can reconcile their blocks

Microtask work through the scheduler:

- effects that read `tickState` are queued
- the render effect calls `render(App(), root)`
- document preferences are synced from the store

This split keeps direct bindings responsive while still batching top level
effects.

---

## Why No Virtual DOM Is Needed

The runtime already has enough information:

- the proxy store knows when data changed
- `tickState` wakes reactive readers
- computed signals know when cached values are stale
- effects know which signals they read
- template instances know which expression maps to which DOM part
- repeat blocks know which keyed item owns which DOM range

The update path is small and explicit:

```text
write data -> emit event -> pulse signal -> update affected parts
```

There is no framework scheduler, no component class, and no virtual tree diff.

---

## Full Trace in One Screen

```js
// 1. User checks the checkbox rendered by TodoItem.
<input
  model=${todoModel(todo.id, "completed", {
    prop: "checked",
    event: "change",
  })}
  type="checkbox"
/>

// 2. AttributePart model listener reads the native checked value.
const nextValue = target.checked;
binding.config.set(nextValue);

// 3. todoModel writes through an action.
set: (value) => updateTodo(todoId, { completed: value });

// 4. The action writes into the proxy store.
store.state.todos[index] = { ...current, completed: true };

// 5. The proxy emits a cloned change payload.
this.emitChange(["todos", index], oldValue, prepared);

// 6. The app handles the event and bumps the signal bridge.
persistState(store);
tickState.set(performance.now());

// 7. Computed values that read tickState become dirty.
export const visibleTodos = new Signal.Computed(() => {
  tickState.get();
  return pipelineTodos(store.state.todos, store.state.filters, language);
});

// 8. Effects that read tickState are scheduled.
effect(() => {
  tickState.get();
  render(App(), root);
});

// 9. The renderer pushes fresh values into stable DOM parts.
rootPart.setValue(App());
part.setValue(nextValue);

// 10. The DOM receives direct writes.
element.setAttribute("data-state", "done");
element.checked = true;
```

That is the under the hood loop: plain objects, one proxy store, one signal
pulse, lazy computed values, scheduled effects, and DOM parts that know exactly
where to write.
