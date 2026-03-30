// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"jV4no":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 6014;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "17677af8c6396971";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"8JWvp":[function(require,module,exports,__globalThis) {
var _indexJs = require("@/components/index.js");
var _indexJs1 = require("@/core/index.js");
var _indexJs2 = require("@/state/index.js");
/**
 * Bootstraps the demo and keeps the root view in sync with store driven invalidations.
 */ document.documentElement.dataset.embed = String((0, _indexJs2.isEmbedded));
(0, _indexJs2.root).dataset.appRoot = "true";
let observedAppShell = null;
const appShellResizeObserver = new ResizeObserver(()=>{
    syncAppShellSize();
});
/**
 * Mirrors persisted UI preferences onto the document element so CSS can react to them.
 * @returns {void}
 */ function syncDocumentPreferences() {
    const { colorScheme, theme, language } = (0, _indexJs2.store).state.preferences;
    document.documentElement.dataset.colorScheme = colorScheme;
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language;
}
/**
 * Measures the main workspace and mirrors its height onto the mount node.
 * @returns {void}
 */ function syncAppShellSize() {
    const appShell = (0, _indexJs2.root).querySelector('[data-component="app-shell"]');
    if (!(appShell instanceof HTMLElement)) {
        (0, _indexJs2.root).style.removeProperty("--app-main-block-size");
        return;
    }
    if (observedAppShell !== appShell) {
        if (observedAppShell instanceof HTMLElement) appShellResizeObserver.unobserve(observedAppShell);
        observedAppShell = appShell;
        appShellResizeObserver.observe(appShell);
    }
    (0, _indexJs2.root).style.setProperty("--app-main-block-size", `${Math.ceil(appShell.getBoundingClientRect().height)}px`);
}
/**
 * Schedules a post-render workspace measurement.
 * @returns {void}
 */ function scheduleAppShellSizeSync() {
    requestAnimationFrame(()=>{
        syncAppShellSize();
    });
}
(0, _indexJs1.effect)(()=>{
    (0, _indexJs2.mainState).get();
    syncDocumentPreferences();
});
(0, _indexJs1.effect)(()=>{
    (0, _indexJs2.mainState).get();
    (0, _indexJs1.render)((0, _indexJs.appView)(), (0, _indexJs2.root));
    scheduleAppShellSizeSync();
});
(0, _indexJs2.mainState).set(performance.now());

},{"@/components/index.js":"8dS8W","@/core/index.js":"12Zhm","@/state/index.js":"bQ2qF"}],"8dS8W":[function(require,module,exports,__globalThis) {
/**
 * Public exports for the component based view tree.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "appView", ()=>(0, _indexJs.appView));
parcelHelpers.export(exports, "todoItem", ()=>(0, _indexJs1.todoItem));
var _indexJs = require("./App/index.js");
var _indexJs1 = require("./TodoItem/index.js");

},{"./App/index.js":"cQOID","./TodoItem/index.js":"2Lvoo","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"cQOID":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "appView", ()=>(0, _appJs.appView));
var _appJs = require("./_App.js");

},{"./_App.js":"2gQir","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"2gQir":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the full application shell used by the demo.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "appView", ()=>appView);
var _appCss = require("./_App.css");
var _indexJs = require("@/components/AppHeader/index.js");
var _indexJs1 = require("@/components/BulkActions/index.js");
var _indexJs2 = require("@/components/CategoryModal/index.js");
var _indexJs3 = require("@/components/DebugPanel/index.js");
var _indexJs4 = require("@/components/Filters/index.js");
var _indexJs5 = require("@/components/StatsRow/index.js");
var _indexJs6 = require("@/components/TodoModal/index.js");
var _indexJs7 = require("@/components/TodoList/index.js");
var _indexJs8 = require("@/core/index.js");
function appView() {
    return (0, _indexJs8.html)`
    ${(0, _indexJs.appHeader)()}
    <main data-component="app-shell">${(0, _indexJs5.statsRow)()} ${(0, _indexJs7.todoListPanel)()}</main>
    <aside data-slot="controls">${(0, _indexJs4.filtersPanel)()} ${(0, _indexJs1.bulkActionsPanel)()}</aside>
    <aside data-slot="debug-sidebar">${(0, _indexJs3.debugPanel)()}</aside>
    ${(0, _indexJs6.todoModal)()} ${(0, _indexJs2.categoryModal)()}
  `;
}

},{"./_App.css":"j1i5H","@/components/AppHeader/index.js":"6b6ie","@/components/BulkActions/index.js":"jPyMi","@/components/CategoryModal/index.js":"7PlUN","@/components/DebugPanel/index.js":"dqz2C","@/components/Filters/index.js":"dzEtb","@/components/StatsRow/index.js":"k0vrQ","@/components/TodoList/index.js":"jycQm","@/core/index.js":"12Zhm","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW","@/components/TodoModal/index.js":"6L1pj"}],"j1i5H":[function() {},{}],"6b6ie":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "appHeader", ()=>(0, _appHeaderJs.appHeader));
var _appHeaderJs = require("./_AppHeader.js");

},{"./_AppHeader.js":"ksBMQ","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"ksBMQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the hero header and top level demo actions.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "appHeader", ()=>appHeader);
var _appHeaderCss = require("./_AppHeader.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/helpers/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
function appHeader() {
    const language = (0, _indexJs3.store).state.preferences.language;
    return (0, _indexJs.html)`
    <header data-component="app-header" data-surface="card">
      <section data-slot="copy">
        <p data-text="eyebrow">${(0, _indexJs2.t)(language, "app.eyebrow")}</p>
        <h1>${(0, _indexJs2.t)(language, "app.title")}</h1>
        <p data-text="subcopy">${(0, _indexJs2.t)(language, "app.subcopyPrimary")}</p>
        <p data-text="subcopy">${(0, _indexJs2.t)(language, "app.subcopySecondary")}</p>
      </section>

      <section data-slot="toolbar">
        <menu data-list-reset data-slot="actions">
          <li>
            <button data-variant="warning" @click=${0, _indexJs3.resetDemo}>
              ${(0, _indexJs2.t)(language, "buttons.resetDemo")}
            </button>
          </li>
          <li>
            <button @click=${0, _indexJs3.openTodoModal}>
              ${(0, _indexJs2.t)(language, "buttons.newTodo")}
            </button>
          </li>
          <li>
            <button data-variant="secondary" @click=${0, _indexJs3.openCategoryModal}>
              ${(0, _indexJs2.t)(language, "buttons.newCategory")}
            </button>
          </li>
        </menu>

        <section data-slot="preferences">
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.colorScheme")}</span>
            <select
              model=${(0, _indexJs1.storeModel)("preferences.colorScheme", {
        event: "change"
    })}
            >
              ${(0, _indexJs1.colorSchemeOptions)()}
            </select>
          </label>

          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.theme")}</span>
            <select
              model=${(0, _indexJs1.storeModel)("preferences.theme", {
        event: "change"
    })}
            >
              ${(0, _indexJs1.themeOptions)()}
            </select>
          </label>

          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.language")}</span>
            <select
              model=${(0, _indexJs1.storeModel)("preferences.language", {
        event: "change"
    })}
            >
              ${(0, _indexJs1.languageOptions)()}
            </select>
          </label>
        </section>
      </section>
    </header>
  `;
}

},{"./_AppHeader.css":"hdZ33","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"hdZ33":[function() {},{}],"12Zhm":[function(require,module,exports,__globalThis) {
/**
 * Public entry point for the demo runtime.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "effect", ()=>(0, _indexJs.effect));
parcelHelpers.export(exports, "isSignalLike", ()=>(0, _indexJs.isSignalLike));
parcelHelpers.export(exports, "Signal", ()=>(0, _indexJs.Signal));
parcelHelpers.export(exports, "Store", ()=>(0, _indexJs1.Store));
parcelHelpers.export(exports, "directive", ()=>(0, _indexJs2.directive));
parcelHelpers.export(exports, "html", ()=>(0, _indexJs2.html));
parcelHelpers.export(exports, "isDirective", ()=>(0, _indexJs2.isDirective));
parcelHelpers.export(exports, "model", ()=>(0, _indexJs2.model));
parcelHelpers.export(exports, "render", ()=>(0, _indexJs2.render));
parcelHelpers.export(exports, "repeat", ()=>(0, _indexJs2.repeat));
var _indexJs = require("./signals/index.js");
var _indexJs1 = require("./store/index.js");
var _indexJs2 = require("./template-engine/index.js");

},{"./signals/index.js":"d1jnm","./store/index.js":"6CPRA","./template-engine/index.js":"ey2lM","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"d1jnm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Signal", ()=>Signal);
/**
 * Checks whether a value implements the signal contract expected by the renderer.
 * @param {unknown} value
 * @returns {boolean}
 */ parcelHelpers.export(exports, "isSignalLike", ()=>isSignalLike);
/**
 * Creates a tracked side effect and returns a disposer.
 * @param {() => void} callback
 * @returns {() => void}
 */ parcelHelpers.export(exports, "effect", ()=>effect);
var _collectorContextJs = require("./_collector-context.js");
var _computedSignalJs = require("./_computed-signal.js");
var _effectCollectorJs = require("./_effect-collector.js");
var _stateSignalJs = require("./_state-signal.js");
const Signal = {
    State: (0, _stateSignalJs.StateSignal),
    Computed: (0, _computedSignalJs.ComputedSignal),
    subtle: {
        untrack: (0, _collectorContextJs.withoutCollector)
    }
};
function isSignalLike(value) {
    return Boolean(value && typeof value.get === "function" && value.__isSignal);
}
function effect(callback) {
    const runner = new (0, _effectCollectorJs.EffectCollector)(callback);
    return ()=>runner.stop();
}

},{"./_collector-context.js":"hD2l5","./_computed-signal.js":"l5r2o","./_effect-collector.js":"c7V3C","./_state-signal.js":"7MCC0","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"hD2l5":[function(require,module,exports,__globalThis) {
/**
 * Collector capable of subscribing itself to the signals it reads.
 * @typedef {{ addDependency(signal: unknown): void }} DependencyCollector
 */ /** @type {DependencyCollector[]} */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Returns the collector currently tracking signal reads, if any.
 * @returns {DependencyCollector | undefined}
 */ parcelHelpers.export(exports, "getCurrentCollector", ()=>getCurrentCollector);
/**
 * Pushes a collector on the active tracking stack.
 * @param {DependencyCollector} collector
 * @returns {void}
 */ parcelHelpers.export(exports, "pushCollector", ()=>pushCollector);
/**
 * Removes and returns the current collector.
 * @returns {DependencyCollector | undefined}
 */ parcelHelpers.export(exports, "popCollector", ()=>popCollector);
/**
 * Runs a callback while a collector is active.
 * @template T
 * @param {DependencyCollector} collector
 * @param {() => T} callback
 * @returns {T}
 */ parcelHelpers.export(exports, "withCollector", ()=>withCollector);
/**
 * Runs a callback without tracking the reads performed inside it.
 * @template T
 * @param {() => T} callback
 * @returns {T}
 */ parcelHelpers.export(exports, "withoutCollector", ()=>withoutCollector);
const collectorStack = [];
function getCurrentCollector() {
    return collectorStack[collectorStack.length - 1];
}
function pushCollector(collector) {
    collectorStack.push(collector);
}
function popCollector() {
    return collectorStack.pop();
}
function withCollector(collector, callback) {
    pushCollector(collector);
    try {
        return callback();
    } finally{
        popCollector();
    }
}
function withoutCollector(callback) {
    const current = popCollector();
    try {
        return callback();
    } finally{
        if (current) pushCollector(current);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"cIvOW":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"l5r2o":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Options controlling computed signal invalidation.
 * @template T
 * @typedef {object} ComputedSignalOptions
 * @property {(previousValue: T | undefined, nextValue: T) => boolean} [equals]
 */ /**
 * Derived signal that lazily recomputes its value when one of its dependencies changes.
 * @template T
 * @extends {BaseSignal<T>}
 */ parcelHelpers.export(exports, "ComputedSignal", ()=>ComputedSignal);
var _collectorContextJs = require("./_collector-context.js");
var _baseSignalJs = require("./_base-signal.js");
class ComputedSignal extends (0, _baseSignalJs.BaseSignal) {
    /**
   * @param {() => T} compute
   * @param {ComputedSignalOptions<T>} [options]
   */ constructor(compute, options = {}){
        super();
        /** @type {() => T} */ this.compute = compute;
        /** @type {(previousValue: T | undefined, nextValue: T) => boolean} */ this.equals = options.equals ?? Object.is;
        /** @type {Map<unknown, () => unknown>} */ this.dependencies = new Map();
        /** @type {T | undefined} */ this.cached = undefined;
        this.dirty = true;
        this.recomputing = false;
        /** @type {() => void} */ this.boundInvalidate = this.invalidate.bind(this);
    }
    /**
   * Records a dependency and subscribes once to its invalidation channel.
   * @param {{ subscribe(subscriber: () => void): () => unknown }} signal
   * @returns {void}
   */ addDependency(signal) {
        if (this.dependencies.has(signal)) return;
        const unsubscribe = signal.subscribe(this.boundInvalidate);
        this.dependencies.set(signal, unsubscribe);
    }
    /**
   * Removes subscriptions to the previous dependency graph before recomputing.
   * @returns {void}
   */ cleanupDependencies() {
        for (const unsubscribe of this.dependencies.values())unsubscribe();
        this.dependencies.clear();
    }
    /**
   * Marks the computed value as stale and propagates the invalidation downstream.
   * @returns {void}
   */ invalidate() {
        if (this.dirty) return;
        this.dirty = true;
        this.notify();
    }
    /**
   * Recomputes the cached value when needed.
   * @returns {T}
   */ evaluate() {
        if (!this.dirty) return /** @type {T} */ this.cached;
        if (this.recomputing) return /** @type {T} */ this.cached;
        this.recomputing = true;
        this.cleanupDependencies();
        try {
            const nextValue = (0, _collectorContextJs.withCollector)(this, ()=>this.compute());
            if (this.dirty || !this.equals(this.cached, nextValue)) this.cached = nextValue;
            this.dirty = false;
            return /** @type {T} */ this.cached;
        } finally{
            this.recomputing = false;
        }
    }
    /**
   * Returns the tracked computed value.
   * @returns {T}
   */ get() {
        this.track();
        return this.evaluate();
    }
    /**
   * Returns the computed value without adding the current collector as a dependency.
   * @returns {T}
   */ peek() {
        return this.evaluate();
    }
}

},{"./_collector-context.js":"hD2l5","./_base-signal.js":"aIFzX","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"aIFzX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Subscriber invoked when a signal changes.
 * @callback SignalSubscriber
 * @returns {void}
 */ /**
 * Base class for trackable reactive primitives.
 * @template T
 */ parcelHelpers.export(exports, "BaseSignal", ()=>BaseSignal);
var _collectorContextJs = require("./_collector-context.js");
class BaseSignal {
    /**
   * @returns {void}
   */ constructor(){
        /** @type {Set<SignalSubscriber>} */ this.subscribers = new Set();
        /** @type {true} */ this.__isSignal = true;
    }
    /**
   * Subscribes a callback to invalidation notifications.
   * @param {SignalSubscriber} subscriber
   * @returns {() => boolean}
   */ subscribe(subscriber) {
        this.subscribers.add(subscriber);
        return ()=>this.subscribers.delete(subscriber);
    }
    /**
   * Registers the signal in the current collector when one is active.
   * @returns {void}
   */ track() {
        const current = (0, _collectorContextJs.getCurrentCollector)();
        if (current) current.addDependency(this);
    }
    /**
   * Notifies all subscribers of the latest invalidation.
   * @returns {void}
   */ notify() {
        for (const subscriber of [
            ...this.subscribers
        ])subscriber();
    }
}

},{"./_collector-context.js":"hD2l5","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"c7V3C":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Signal contract required by the effect dependency tracker.
 * @typedef {{ subscribe(subscriber: () => void): () => unknown }} TrackableSignal
 */ /**
 * Reactive effect runner that automatically tracks and resubscribes to accessed signals.
 */ parcelHelpers.export(exports, "EffectCollector", ()=>EffectCollector);
var _collectorContextJs = require("./_collector-context.js");
var _schedulerJs = require("./_scheduler.js");
class EffectCollector {
    /**
   * @param {() => void} callback
   */ constructor(callback){
        /** @type {() => void} */ this.callback = callback;
        /** @type {Map<TrackableSignal, () => unknown>} */ this.dependencies = new Map();
        this.active = true;
        /** @type {() => void} */ this.run = this.run.bind(this);
        this.run();
    }
    /**
   * Records a dependency and schedules the effect when it changes.
   * @param {TrackableSignal} signal
   * @returns {void}
   */ addDependency(signal) {
        if (this.dependencies.has(signal)) return;
        const unsubscribe = signal.subscribe(()=>(0, _schedulerJs.schedule)(this));
        this.dependencies.set(signal, unsubscribe);
    }
    /**
   * Removes all active signal subscriptions.
   * @returns {void}
   */ cleanup() {
        for (const unsubscribe of this.dependencies.values())unsubscribe();
        this.dependencies.clear();
    }
    /**
   * Re-runs the effect while collecting the fresh dependency graph.
   * @returns {void}
   */ run() {
        if (!this.active) return;
        this.cleanup();
        (0, _collectorContextJs.withCollector)(this, ()=>{
            this.callback();
        });
    }
    /**
   * Permanently disables the effect and unsubscribes from all dependencies.
   * @returns {void}
   */ stop() {
        this.active = false;
        this.cleanup();
    }
}

},{"./_collector-context.js":"hD2l5","./_scheduler.js":"42z3d","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"42z3d":[function(require,module,exports,__globalThis) {
/**
 * Job contract accepted by the microtask scheduler.
 * @typedef {{ run(): void }} SchedulableJob
 */ /** @type {Set<SchedulableJob>} */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Queues an effect for batched microtask execution.
 * @param {SchedulableJob} effect
 * @returns {void}
 */ parcelHelpers.export(exports, "schedule", ()=>schedule);
const scheduled = new Set();
let flushing = false;
function schedule(effect) {
    scheduled.add(effect);
    if (flushing) return;
    flushing = true;
    queueMicrotask(()=>{
        try {
            while(scheduled.size > 0){
                const batch = [
                    ...scheduled
                ];
                scheduled.clear();
                for (const job of batch)job.run();
            }
        } finally{
            flushing = false;
        }
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"7MCC0":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Mutable signal that stores a concrete value.
 * @template T
 * @extends {BaseSignal<T>}
 */ parcelHelpers.export(exports, "StateSignal", ()=>StateSignal);
var _baseSignalJs = require("./_base-signal.js");
class StateSignal extends (0, _baseSignalJs.BaseSignal) {
    /**
   * @param {T} value
   * @param {{ equals?: (previousValue: T, nextValue: T) => boolean }} [options]
   */ constructor(value, options = {}){
        super();
        /** @type {T} */ this.value = value;
        /** @type {(previousValue: T, nextValue: T) => boolean} */ this.equals = options.equals ?? Object.is;
    }
    /**
   * Returns the tracked value.
   * @returns {T}
   */ get() {
        this.track();
        return this.value;
    }
    /**
   * Returns the current value without tracking.
   * @returns {T}
   */ peek() {
        return this.value;
    }
    /**
   * Updates the signal when the equality guard allows it.
   * @param {T} nextValue
   * @returns {T}
   */ set(nextValue) {
        if (this.equals(this.value, nextValue)) return this.value;
        this.value = nextValue;
        this.notify();
        return this.value;
    }
}

},{"./_base-signal.js":"aIFzX","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"6CPRA":[function(require,module,exports,__globalThis) {
/**
 * Public exports for the proxy based store layer.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Store", ()=>(0, _storeJs.Store));
var _storeJs = require("./_store.js");

},{"./_store.js":"iD8H5","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"iD8H5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Store path expressed as dot notation or as discrete path segments.
 * @typedef {string | number | symbol | Array<string | number | symbol>} StorePath
 */ /**
 * Options accepted by the proxy store.
 * @typedef {object} StoreOptions
 * @property {EventTarget} [eventsTarget]
 */ /**
 * Change detail emitted with each store mutation.
 * @typedef {object} StoreChangeDetail
 * @property {string} path
 * @property {unknown} oldValue
 * @property {unknown} newValue
 */ /**
 * Proxy based state container that emits immutable change payloads after each write.
 */ parcelHelpers.export(exports, "Store", ()=>Store);
var _cloneJs = require("./_clone.js");
var _guardsJs = require("./_guards.js");
var _pathsJs = require("./_paths.js");
class Store {
    /**
   * @param {object} [initialState={}]
   * @param {StoreOptions} [options={}]
   */ constructor(initialState = {}, options = {}){
        /** @type {EventTarget} */ this.events = options.eventsTarget ?? window;
        /** @type {object} */ this.target = (0, _cloneJs.deepClone)(initialState);
        /** @type {WeakMap<object, object>} */ this.proxyCache = new WeakMap();
        /** @type {any} */ this.state = this.createProxy(this.target, []);
    }
    /**
   * Recursively wraps nested objects in stable proxies.
   * @param {object} target
   * @param {Array<string | number | symbol>} path
   * @returns {any}
   */ createProxy(target, path) {
        if (!(0, _guardsJs.isObject)(target)) return target;
        if (this.proxyCache.has(target)) return this.proxyCache.get(target);
        const proxy = new Proxy(target, {
            get: (raw, key, receiver)=>{
                // Internal escape hatches are kept enumerable free and only exist for cloning helpers.
                if (key === "__raw") return raw;
                if (key === "__path") return path;
                const value = Reflect.get(raw, key, receiver);
                if ((0, _guardsJs.isObject)(value)) return this.createProxy(value, [
                    ...path,
                    key
                ]);
                return value;
            },
            set: (raw, key, value, receiver)=>{
                const nextPath = [
                    ...path,
                    key
                ];
                const oldValue = raw[key];
                const prepared = (0, _cloneJs.clonePlainValue)(value);
                const result = Reflect.set(raw, key, prepared, receiver);
                if (oldValue !== prepared) this.emitChange(nextPath, oldValue, prepared);
                return result;
            },
            deleteProperty: (raw, key)=>{
                if (!(key in raw)) return true;
                const nextPath = [
                    ...path,
                    key
                ];
                const oldValue = raw[key];
                const result = Reflect.deleteProperty(raw, key);
                this.emitChange(nextPath, oldValue, undefined);
                return result;
            }
        });
        this.proxyCache.set(target, proxy);
        return proxy;
    }
    /**
   * Emits a store:change event with cloned payloads so listeners cannot mutate the store internals.
   * @param {Array<string | number | symbol>} path
   * @param {unknown} oldValue
   * @param {unknown} newValue
   * @returns {void}
   */ emitChange(path, oldValue, newValue) {
        /** @type {StoreChangeDetail} */ const detail = {
            path: (0, _pathsJs.pathToString)(path),
            oldValue: (0, _cloneJs.deepClone)(oldValue),
            newValue: (0, _cloneJs.deepClone)(newValue)
        };
        const event = new CustomEvent("store:change", {
            detail
        });
        this.events.dispatchEvent(event);
    }
    /**
   * Reads a value by path from the proxied state tree.
   * @param {StorePath | null | undefined} path
   * @returns {unknown}
   */ get(path) {
        const parts = (0, _pathsJs.toPathArray)(path);
        let current = this.state;
        for (const part of parts)current = current?.[part];
        return current;
    }
    /**
   * Writes a value by path, creating missing intermediate objects when needed.
   * @param {StorePath | null | undefined} path
   * @param {unknown} value
   * @returns {unknown}
   */ set(path, value) {
        const parts = (0, _pathsJs.toPathArray)(path);
        if (!parts.length) throw new Error("Path is required");
        const last = parts.pop();
        let current = this.state;
        for (const part of parts){
            if (!(0, _guardsJs.isObject)(current[part])) current[part] = {};
            current = current[part];
        }
        current[last] = value;
        return value;
    }
    /**
   * Updates a value by passing the current snapshot to an updater callback.
   * @param {StorePath | null | undefined} path
   * @param {(currentValue: unknown) => unknown} updater
   * @returns {unknown}
   */ update(path, updater) {
        const currentValue = this.get(path);
        return this.set(path, updater(currentValue));
    }
    /**
   * Replaces the entire state tree with a fresh proxy graph.
   * @param {object} nextState
   * @returns {void}
   */ replace(nextState) {
        const oldValue = (0, _cloneJs.deepClone)(this.target);
        this.target = (0, _cloneJs.deepClone)(nextState);
        this.proxyCache = new WeakMap();
        this.state = this.createProxy(this.target, []);
        this.emitChange([], oldValue, this.target);
    }
    /**
   * Returns a deep cloned snapshot of the current store state.
   * @returns {unknown}
   */ snapshot() {
        return (0, _cloneJs.deepClone)(this.target);
    }
}

},{"./_clone.js":"2hE4i","./_guards.js":"9TEpF","./_paths.js":"4WsmQ","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"2hE4i":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Deeply clones plain serializable values while preserving Maps, Sets, Dates, and RegExps.
 * @template T
 * @param {T} value
 * @param {WeakMap<object, unknown>} [seen]
 * @returns {T}
 */ parcelHelpers.export(exports, "clonePlainValue", ()=>clonePlainValue);
/**
 * Convenience wrapper used by the store when it needs a fresh immutable snapshot.
 * @template T
 * @param {T} value
 * @returns {T}
 */ parcelHelpers.export(exports, "deepClone", ()=>deepClone);
var _guardsJs = require("./_guards.js");
/**
 * Unwraps proxy values before cloning them.
 * @template T
 * @param {T} value
 * @returns {T}
 */ function getRawValue(value) {
    if (!(0, _guardsJs.isObject)(value)) return value;
    return value.__raw ?? value;
}
function clonePlainValue(value, seen = new WeakMap()) {
    const raw = getRawValue(value);
    if (!(0, _guardsJs.isObject)(raw)) return raw;
    if (seen.has(raw)) return seen.get(raw);
    if (raw instanceof Date) return new Date(raw.getTime());
    if (raw instanceof RegExp) return new RegExp(raw.source, raw.flags);
    if (raw instanceof Map) {
        const next = new Map();
        seen.set(raw, next);
        for (const [key, entryValue] of raw.entries())next.set(clonePlainValue(key, seen), clonePlainValue(entryValue, seen));
        return next;
    }
    if (raw instanceof Set) {
        const next = new Set();
        seen.set(raw, next);
        for (const entry of raw.values())next.add(clonePlainValue(entry, seen));
        return next;
    }
    if (Array.isArray(raw)) {
        const next = [];
        seen.set(raw, next);
        for (const entry of raw)next.push(clonePlainValue(entry, seen));
        return next;
    }
    const next = {};
    seen.set(raw, next);
    for (const key of Reflect.ownKeys(raw)){
        const descriptor = Object.getOwnPropertyDescriptor(raw, key);
        if (!descriptor?.enumerable) continue;
        next[key] = clonePlainValue(raw[key], seen);
    }
    return next;
}
function deepClone(value) {
    return clonePlainValue(value);
}

},{"./_guards.js":"9TEpF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"9TEpF":[function(require,module,exports,__globalThis) {
/**
 * Checks whether a value can be wrapped in a proxy or traversed deeply.
 * @param {unknown} value
 * @returns {boolean}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isObject", ()=>isObject);
function isObject(value) {
    return value !== null && typeof value === "object";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"4WsmQ":[function(require,module,exports,__globalThis) {
/**
 * Converts a dot notation path into an array of path segments.
 * @param {string | number | symbol | Array<string | number | symbol> | null | undefined} path
 * @returns {Array<string | number | symbol>}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toPathArray", ()=>toPathArray);
/**
 * Serializes a path back to dot notation for change events.
 * @param {string | number | symbol | Array<string | number | symbol> | null | undefined} path
 * @returns {string}
 */ parcelHelpers.export(exports, "pathToString", ()=>pathToString);
function toPathArray(path) {
    if (Array.isArray(path)) return path;
    if (path == null || path === "") return [];
    return String(path).split(".").filter(Boolean);
}
function pathToString(path) {
    return toPathArray(path).join(".");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"ey2lM":[function(require,module,exports,__globalThis) {
/**
 * Public exports for the template engine.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "directive", ()=>(0, _templateJs.directive));
parcelHelpers.export(exports, "html", ()=>(0, _templateJs.html));
parcelHelpers.export(exports, "isDirective", ()=>(0, _templateJs.isDirective));
parcelHelpers.export(exports, "model", ()=>(0, _templateJs.model));
parcelHelpers.export(exports, "render", ()=>(0, _templateJs.render));
parcelHelpers.export(exports, "repeat", ()=>(0, _templateJs.repeat));
var _templateJs = require("./_template.js");

},{"./_template.js":"4CdTm","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"4CdTm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** @typedef {HTMLElement & { __rootPart?: ChildNodePart }} RenderContainer */ parcelHelpers.export(exports, "directive", ()=>(0, _templateHelpersJs.directive));
parcelHelpers.export(exports, "html", ()=>(0, _templateHelpersJs.html));
parcelHelpers.export(exports, "isDirective", ()=>(0, _templateHelpersJs.isDirective));
parcelHelpers.export(exports, "model", ()=>(0, _templateHelpersJs.model));
parcelHelpers.export(exports, "repeat", ()=>(0, _templateHelpersJs.repeat));
/**
 * Renders a template result into a container using a stable root child part.
 * @param {unknown} result
 * @param {RenderContainer} container
 * @returns {void}
 */ parcelHelpers.export(exports, "render", ()=>render);
var _partsJs = require("./_parts.js");
var _templateInstanceJs = require("./_template-instance.js");
var _templateInstanceRefJs = require("./_template-instance-ref.js");
var _templateHelpersJs = require("./_template-helpers.js");
(0, _templateInstanceRefJs.setTemplateInstanceClass)((0, _templateInstanceJs.TemplateInstance));
function render(result, container) {
    let rootPart = container.__rootPart;
    if (!rootPart) {
        const start = document.createComment("root:start");
        const end = document.createComment("root:end");
        container.textContent = "";
        container.append(start, end);
        rootPart = new (0, _partsJs.ChildNodePart)(start, end);
        container.__rootPart = rootPart;
    }
    rootPart.setValue(result);
}

},{"./_parts.js":"gt9re","./_template-instance.js":"jHIqE","./_template-instance-ref.js":"hZJLF","./_template-helpers.js":"5Sfjs","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"gt9re":[function(require,module,exports,__globalThis) {
/**
 * Public exports for the DOM part implementations used by the template engine.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AttributePart", ()=>(0, _attributePartJs.AttributePart));
parcelHelpers.export(exports, "ChildNodePart", ()=>(0, _childNodePartJs.ChildNodePart));
parcelHelpers.export(exports, "EventPart", ()=>(0, _eventPartJs.EventPart));
parcelHelpers.export(exports, "Part", ()=>(0, _partJs.Part));
parcelHelpers.export(exports, "PropertyPart", ()=>(0, _propertyPartJs.PropertyPart));
var _attributePartJs = require("./_attribute-part.js");
var _childNodePartJs = require("./_child-node-part.js");
var _eventPartJs = require("./_event-part.js");
var _partJs = require("./_part.js");
var _propertyPartJs = require("./_property-part.js");

},{"./_attribute-part.js":"dc8ak","./_child-node-part.js":"kf7xK","./_event-part.js":"4SI1R","./_part.js":"hdeVM","./_property-part.js":"iboG4","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"dc8ak":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * DOM element supported by the model binding directive.
 * @typedef {HTMLElement & Record<string, any>} ModelBoundElement
 */ /**
 * Signal contract accepted by the model directive.
 * @typedef {{ get(): unknown, subscribe(subscriber: () => void): (() => unknown) }} ModelSignal
 */ /**
 * Configuration object consumed by the model directive.
 * @typedef {object} ModelDirectiveConfig
 * @property {ModelSignal} [signal]
 * @property {string} [event]
 * @property {string} [prop]
 * @property {() => unknown} get
 * @property {(value: unknown) => unknown} set
 */ /**
 * Cached model binding instance reused while the directive shape stays stable.
 * @typedef {object} ModelBinding
 * @property {ModelDirectiveConfig} config
 * @property {string} eventName
 * @property {string} property
 * @property {ModelSignal | undefined} signal
 * @property {() => void} sync
 */ /**
 * Attribute binding part used for plain attributes and for the model directive.
 * @extends {Part}
 */ parcelHelpers.export(exports, "AttributePart", ()=>AttributePart);
var _indexJs = require("../signals/index.js");
var _partJs = require("./_part.js");
var _rangeJs = require("./_range.js");
var _templateHelpersJs = require("./_template-helpers.js");
class AttributePart extends (0, _partJs.Part) {
    /**
   * @param {ModelBoundElement} element
   * @param {string} name
   */ constructor(element, name){
        super();
        /** @type {ModelBoundElement} */ this.element = element;
        /** @type {string} */ this.name = name;
        /** @type {(() => void) | null} */ this.modelCleanup = null;
        /** @type {ModelBinding | null} */ this._modelBinding = null;
    }
    /**
   * Removes the active model event listener if present.
   * @returns {void}
   */ disposeModel() {
        if (this.modelCleanup) this.modelCleanup();
        this.modelCleanup = null;
    }
    /**
   * Resolves model directives and signals before committing an attribute value.
   * @param {unknown} value
   * @returns {void}
   */ setValue(value) {
        if (this.name === "model" && (0, _templateHelpersJs.isDirective)(value, "model")) {
            this.commitModel(/** @type {ModelDirectiveConfig} */ value.payload);
            this.value = value;
            return;
        }
        if ((0, _indexJs.isSignalLike)(value)) {
            this.disposeModel();
            this.bindSignal(value, (resolved)=>this.commit(resolved));
            return;
        }
        this.disposeModel();
        this.disposeSignal();
        this.commit(value);
    }
    /**
   * Writes a normalized attribute value to the DOM element.
   * @param {unknown} value
   * @returns {void}
   */ commit(value) {
        if (value == null || value === false) {
            this.element.removeAttribute(this.name);
            return;
        }
        this.element.setAttribute(this.name, value === true ? "" : String(value));
    }
    /**
   * Wires a two way model binding between a signal or store facade and a form control.
   * @param {ModelDirectiveConfig} config
   * @returns {void}
   */ commitModel(config) {
        const eventName = config.event ?? "input";
        const property = config.prop ?? (0, _rangeJs.inferModelProperty)(this.element);
        if (this._modelBinding && this._modelBinding.eventName === eventName && this._modelBinding.property === property && this._modelBinding.signal === config.signal) {
            this._modelBinding.config = config;
            this._modelBinding.sync();
            return;
        }
        this.disposeSignal();
        this.disposeModel();
        /** @type {ModelBinding} */ const binding = {
            config,
            eventName,
            property,
            signal: config.signal
        };
        /**
     * Synchronizes the DOM control with the current model value.
     * @returns {void}
     */ const sync = ()=>{
            const nextValue = binding.config.get();
            if (property === "checked") {
                const normalizedValue = Boolean(nextValue);
                if (this.element.checked !== normalizedValue) this.element.checked = normalizedValue;
            } else {
                const normalizedValue = nextValue ?? "";
                if (this.element[property] === normalizedValue) return;
                const isActiveElement = document.activeElement === this.element;
                const supportsSelection = typeof this.element.selectionStart === "number" && typeof this.element.selectionEnd === "number";
                const selectionStart = supportsSelection ? this.element.selectionStart : null;
                const selectionEnd = supportsSelection ? this.element.selectionEnd : null;
                // Preserve the cursor when a controlled field re-renders while focused.
                this.element[property] = normalizedValue;
                if (isActiveElement && supportsSelection && selectionStart !== null && selectionEnd !== null) {
                    const textValue = typeof normalizedValue === "string" ? normalizedValue : String(normalizedValue);
                    const nextCursor = Math.min(selectionStart, textValue.length);
                    const nextSelectionEnd = Math.min(selectionEnd, textValue.length);
                    this.element.setSelectionRange(nextCursor, nextSelectionEnd);
                }
            }
        };
        /**
     * Defers one extra sync for select elements so their options are in place first.
     * @returns {void}
     */ const syncAfterRender = ()=>{
            sync();
            if (this.element instanceof HTMLSelectElement) queueMicrotask(()=>{
                if (this._modelBinding === binding && this.element.isConnected) sync();
            });
        };
        binding.sync = sync;
        this._modelBinding = binding;
        /**
     * Pushes user input back into the bound signal or store facade.
     * @param {Event} event
     * @returns {void}
     */ const onInput = (event)=>{
            const target = /** @type {ModelBoundElement} */ event.currentTarget;
            const nextValue = property === "checked" ? target.checked : target[property];
            binding.config.set(nextValue);
        };
        this.element.addEventListener(eventName, onInput);
        this.modelCleanup = ()=>{
            this.element.removeEventListener(eventName, onInput);
            this._modelBinding = null;
        };
        if (config.signal && (0, _indexJs.isSignalLike)(config.signal)) {
            this.bindSignal(config.signal, syncAfterRender);
            return;
        }
        syncAfterRender();
    }
}

},{"../signals/index.js":"d1jnm","./_part.js":"hdeVM","./_range.js":"lquas","./_template-helpers.js":"5Sfjs","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"hdeVM":[function(require,module,exports,__globalThis) {
/**
 * Minimal signal contract required by DOM parts.
 * @typedef {{ get(): unknown, subscribe(subscriber: () => void): (() => unknown) }} PartSignal
 */ /**
 * Base class shared by attribute, property, and child node parts.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Part", ()=>Part);
class Part {
    /**
   * @returns {void}
   */ constructor(){
        this.value = undefined;
        /** @type {(() => unknown) | null} */ this.signalCleanup = null;
    }
    /**
   * Binds a signal to the part and keeps it in sync until disposed.
   * @param {PartSignal} signal
   * @param {(resolved: unknown) => void} callback
   * @returns {void}
   */ bindSignal(signal, callback) {
        this.disposeSignal();
        this.signalCleanup = signal.subscribe(()=>callback(signal.get()));
        callback(signal.get());
    }
    /**
   * Removes the current signal subscription if one exists.
   * @returns {void}
   */ disposeSignal() {
        if (this.signalCleanup) this.signalCleanup();
        this.signalCleanup = null;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"lquas":[function(require,module,exports,__globalThis) {
/**
 * Removes every sibling node between the provided start and end markers.
 * @param {Comment} start
 * @param {Comment} end
 * @returns {void}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "clearRange", ()=>clearRange);
/**
 * Moves the marker range before a given reference node without recreating DOM nodes.
 * @param {Comment} start
 * @param {Comment} end
 * @param {Node} referenceNode
 * @returns {void}
 */ parcelHelpers.export(exports, "moveRangeBefore", ()=>moveRangeBefore);
/**
 * Checks whether the marker range is already positioned directly before a reference node.
 * @param {Comment} start
 * @param {Comment} end
 * @param {Node} referenceNode
 * @returns {boolean}
 */ parcelHelpers.export(exports, "isRangeBeforeReference", ()=>isRangeBeforeReference);
/**
 * Normalizes arbitrary template values into DOM nodes.
 * @param {unknown} value
 * @returns {Node}
 */ parcelHelpers.export(exports, "normalizeNode", ()=>normalizeNode);
/**
 * Checks whether a value can be iterated by the repeat renderer.
 * @param {unknown} value
 * @returns {boolean}
 */ parcelHelpers.export(exports, "isIterable", ()=>isIterable);
/**
 * Infers the default form control property used by the model directive.
 * @param {HTMLElement & { type?: string }} element
 * @returns {"checked" | "value"}
 */ parcelHelpers.export(exports, "inferModelProperty", ()=>inferModelProperty);
function clearRange(start, end) {
    let current = start.nextSibling;
    while(current && current !== end){
        const next = current.nextSibling;
        current.remove();
        current = next;
    }
}
function moveRangeBefore(start, end, referenceNode) {
    const fragment = document.createDocumentFragment();
    let current = start;
    while(current){
        const next = current.nextSibling;
        fragment.append(current);
        if (current === end) break;
        current = next;
    }
    referenceNode.parentNode.insertBefore(fragment, referenceNode);
}
function isRangeBeforeReference(start, end, referenceNode) {
    let current = start;
    while(current){
        if (current === referenceNode) return false;
        if (current === end) return current.nextSibling === referenceNode;
        current = current.nextSibling;
    }
    return false;
}
function normalizeNode(value) {
    if (value instanceof Node) return value;
    return document.createTextNode(value == null ? "" : String(value));
}
function isIterable(value) {
    return value && typeof value !== "string" && typeof value[Symbol.iterator] === "function";
}
function inferModelProperty(element) {
    return element instanceof HTMLInputElement && element.type === "checkbox" ? "checked" : "value";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"5Sfjs":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Result produced by the html tagged template helper.
 * @typedef {object} TemplateResult
 * @property {"template-result"} kind
 * @property {TemplateStringsArray} strings
 * @property {unknown[]} values
 */ /**
 * Generic directive payload consumed by template parts.
 * @template TPayload
 * @typedef {object} DirectiveResult
 * @property {string} name
 * @property {TPayload} payload
 */ /**
 * Signal contract accepted by the model directive.
 * @typedef {{ get(): unknown, subscribe(subscriber: () => void): (() => unknown) }} DirectiveSignal
 */ /**
 * Two way binding contract used by the model directive.
 * @typedef {object} ModelDirectiveConfig
 * @property {DirectiveSignal} [signal]
 * @property {string} [event]
 * @property {string} [prop]
 * @property {() => unknown} get
 * @property {(value: unknown) => unknown} set
 */ /**
 * Configuration used by the repeat directive.
 * @template TItem
 * @typedef {object} RepeatDirectiveConfig
 * @property {Iterable<TItem> | DirectiveSignal} items
 * @property {(item: TItem) => string | number | symbol} key
 * @property {(item: TItem) => unknown} renderItem
 */ /**
 * Tagged template helper used by every view and DOM part.
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {TemplateResult}
 */ parcelHelpers.export(exports, "html", ()=>html);
/**
 * Creates a branded directive payload recognized by the template engine.
 * @template TPayload
 * @param {string} name
 * @param {TPayload} payload
 * @returns {DirectiveResult<TPayload>}
 */ parcelHelpers.export(exports, "directive", ()=>directive);
/**
 * Checks whether a value is a branded directive and optionally matches its name.
 * @param {unknown} value
 * @param {string} [name]
 * @returns {boolean}
 */ parcelHelpers.export(exports, "isDirective", ()=>isDirective);
/**
 * Creates a two way model binding directive.
 * @param {ModelDirectiveConfig} config
 * @returns {DirectiveResult<ModelDirectiveConfig>}
 */ parcelHelpers.export(exports, "model", ()=>model);
/**
 * Creates a keyed repeat directive for efficient list reconciliation.
 * @template TItem
 * @param {Iterable<TItem> | DirectiveSignal} items
 * @param {(item: TItem) => string | number | symbol} key
 * @param {(item: TItem) => unknown} renderItem
 * @returns {DirectiveResult<RepeatDirectiveConfig<TItem>>}
 */ parcelHelpers.export(exports, "repeat", ()=>repeat);
const directiveBrand = Symbol("directive");
function html(strings, ...values) {
    return {
        kind: "template-result",
        strings,
        values
    };
}
function directive(name, payload) {
    return {
        [directiveBrand]: true,
        name,
        payload
    };
}
function isDirective(value, name) {
    return Boolean(value?.[directiveBrand] && (!name || value.name === name));
}
function model(config) {
    return directive("model", config);
}
function repeat(items, key, renderItem) {
    return directive("repeat", {
        items,
        key,
        renderItem
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"kf7xK":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Child node part responsible for text, templates, iterables, and repeat directives.
 * @extends {Part}
 */ parcelHelpers.export(exports, "ChildNodePart", ()=>ChildNodePart);
var _indexJs = require("../signals/index.js");
var _partJs = require("./_part.js");
var _rangeJs = require("./_range.js");
var _templateHelpersJs = require("./_template-helpers.js");
var _templateInstanceRefJs = require("./_template-instance-ref.js");
/**
 * Rendered template result shape accepted by child parts.
 * @typedef {{ kind: "template-result", strings: TemplateStringsArray, values: unknown[] }} TemplateResult
 */ /**
 * Repeat directive payload consumed by commitRepeat.
 * @typedef {object} RepeatDirectivePayload
 * @property {Iterable<unknown> | { get(): Iterable<unknown> }} items
 * @property {(item: unknown) => string | number | symbol} key
 * @property {(item: unknown) => unknown} renderItem
 */ /**
 * DOM block tracked by the keyed repeat reconciler.
 * @typedef {object} RepeatBlock
 * @property {string | number | symbol} key
 * @property {Comment} start
 * @property {Comment} end
 * @property {ChildNodePart} part
 * @property {unknown} [item]
 */ /**
 * Internal repeat reconciliation state.
 * @typedef {{ blocks: Map<string | number | symbol, RepeatBlock> }} RepeatState
 */ /**
 * Creates the marker pair and child part used by a repeated item.
 * @param {string | number | symbol} itemKey
 * @param {Node} referenceNode
 * @returns {RepeatBlock}
 */ function createBlock(itemKey, referenceNode) {
    const start = document.createComment(`repeat-start:${itemKey}`);
    const end = document.createComment(`repeat-end:${itemKey}`);
    referenceNode.parentNode.insertBefore(start, referenceNode);
    referenceNode.parentNode.insertBefore(end, referenceNode);
    return {
        key: itemKey,
        start,
        end,
        part: new ChildNodePart(start, end)
    };
}
class ChildNodePart extends (0, _partJs.Part) {
    /**
   * @param {Comment} start
   * @param {Comment} end
   */ constructor(start, end){
        super();
        /** @type {Comment} */ this.start = start;
        /** @type {Comment} */ this.end = end;
        /** @type {Node | null} */ this.currentNode = null;
        /** @type {{ strings: TemplateStringsArray, update(values: unknown[]): void, fragment: DocumentFragment } | null} */ this.currentTemplateInstance = null;
        /** @type {RepeatState | null} */ this.repeatState = null;
        /** @type {RepeatDirectivePayload | null} */ this.repeatPayload = null;
        /** @type {{ get(): Iterable<unknown>, subscribe(subscriber: () => void): (() => unknown) } | null} */ this.repeatItemsSignal = null;
        /** @type {(() => unknown) | null} */ this.repeatItemsCleanup = null;
    }
    /**
   * Resolves signals before committing child content.
   * @param {unknown} value
   * @returns {void}
   */ setValue(value) {
        if ((0, _indexJs.isSignalLike)(value)) {
            this.bindSignal(value, (resolved)=>this.commit(resolved));
            return;
        }
        this.disposeSignal();
        this.commit(value);
    }
    /**
   * Commits arbitrary child content to the marker range.
   * @param {unknown} value
   * @returns {void}
   */ commit(value) {
        if ((0, _templateHelpersJs.isDirective)(value, "repeat")) {
            this.commitRepeat(/** @type {RepeatDirectivePayload} */ value.payload);
            this.value = value;
            return;
        }
        this.disposeRepeatItemsSignal();
        this.repeatPayload = null;
        this.repeatState = null;
        if (value?.kind === "template-result") {
            this.commitTemplate(/** @type {TemplateResult} */ value);
            this.value = value;
            return;
        }
        if ((0, _rangeJs.isIterable)(value)) {
            this.currentTemplateInstance = null;
            const fragment = document.createDocumentFragment();
            for (const item of value)fragment.append((0, _rangeJs.normalizeNode)(item));
            this.commitNode(fragment);
            this.value = value;
            return;
        }
        this.currentTemplateInstance = null;
        this.commitNode((0, _rangeJs.normalizeNode)(value));
        this.value = value;
    }
    /**
   * Replaces the current child range with a single node or fragment.
   * @param {Node} node
   * @returns {void}
   */ commitNode(node) {
        (0, _rangeJs.clearRange)(this.start, this.end);
        this.currentNode = node;
        this.start.parentNode.insertBefore(node, this.end);
    }
    /**
   * Reuses the current template instance when the template literal identity is unchanged.
   * @param {TemplateResult} result
   * @returns {void}
   */ commitTemplate(result) {
        const strings = result.strings;
        if (this.currentTemplateInstance?.strings === strings) {
            this.currentTemplateInstance.update(result.values);
            return;
        }
        (0, _rangeJs.clearRange)(this.start, this.end);
        const TemplateInstance = (0, _templateInstanceRefJs.getTemplateInstanceClass)();
        const instance = new TemplateInstance(strings);
        this.currentTemplateInstance = instance;
        instance.update(result.values);
        this.start.parentNode.insertBefore(instance.fragment, this.end);
    }
    /**
   * Subscribes repeat blocks to a signal-like items source so nested lists stay reactive.
   * @param {{ get(): Iterable<unknown>, subscribe(subscriber: () => void): (() => unknown) }} signal
   * @returns {void}
   */ bindRepeatItemsSignal(signal) {
        if (this.repeatItemsSignal === signal && this.repeatItemsCleanup) return;
        this.disposeRepeatItemsSignal();
        this.repeatItemsSignal = signal;
        this.repeatItemsCleanup = signal.subscribe(()=>{
            if (!this.start.isConnected || !this.end.isConnected) {
                this.disposeRepeatItemsSignal();
                return;
            }
            if (this.repeatPayload) this.commitRepeat(this.repeatPayload);
        });
    }
    /**
   * Removes the repeat items subscription when the part no longer renders a repeat directive.
   * @returns {void}
   */ disposeRepeatItemsSignal() {
        if (this.repeatItemsCleanup) this.repeatItemsCleanup();
        this.repeatItemsCleanup = null;
        this.repeatItemsSignal = null;
    }
    /**
   * Reconciles a keyed iterable against previously rendered blocks.
   * @param {RepeatDirectivePayload} payload
   * @returns {void}
   */ commitRepeat({ items, key, renderItem }) {
        this.repeatPayload = {
            items,
            key,
            renderItem
        };
        if ((0, _indexJs.isSignalLike)(items)) this.bindRepeatItemsSignal(items);
        else this.disposeRepeatItemsSignal();
        const source = (0, _indexJs.isSignalLike)(items) ? items.get() : items;
        const list = Array.isArray(source) ? source : (0, _rangeJs.isIterable)(source) ? [
            ...source
        ] : [];
        /** @type {RepeatState} */ const state = this.repeatState ?? {
            blocks: new Map()
        };
        /** @type {Map<string | number | symbol, RepeatBlock>} */ const nextBlocks = new Map();
        const seenKeys = new Set();
        let referenceNode = this.end;
        // Walking backwards gives each block a stable anchor to move before.
        for(let index = list.length - 1; index >= 0; index -= 1){
            const item = list[index];
            const itemKey = key(item);
            if (seenKeys.has(itemKey)) throw new Error(`repeat() keys must be unique. Duplicate key: ${String(itemKey)}`);
            seenKeys.add(itemKey);
            let block = state.blocks.get(itemKey);
            if (!block) {
                block = createBlock(itemKey, referenceNode);
                block.part.setValue(renderItem(item));
                block.item = item;
            } else {
                if (!(0, _rangeJs.isRangeBeforeReference)(block.start, block.end, referenceNode)) (0, _rangeJs.moveRangeBefore)(block.start, block.end, referenceNode);
                if (block.item !== item) {
                    block.part.setValue(renderItem(item));
                    block.item = item;
                }
            }
            nextBlocks.set(itemKey, block);
            referenceNode = block.start;
        }
        for (const [itemKey, block] of state.blocks.entries()){
            if (nextBlocks.has(itemKey)) continue;
            (0, _rangeJs.clearRange)(block.start, block.end);
            block.start.remove();
            block.end.remove();
        }
        state.blocks = nextBlocks;
        this.repeatState = state;
        this.currentTemplateInstance = null;
    }
}

},{"../signals/index.js":"d1jnm","./_part.js":"hdeVM","./_range.js":"lquas","./_template-helpers.js":"5Sfjs","./_template-instance-ref.js":"hZJLF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"hZJLF":[function(require,module,exports,__globalThis) {
/**
 * Constructor contract used by the renderer to instantiate parsed templates.
 * @typedef {new (strings: TemplateStringsArray) => { fragment: DocumentFragment, update(values: unknown[]): void }} TemplateInstanceConstructor
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Registers the concrete TemplateInstance class to avoid circular imports.
 * @param {TemplateInstanceConstructor} cls
 * @returns {void}
 */ parcelHelpers.export(exports, "setTemplateInstanceClass", ()=>setTemplateInstanceClass);
/**
 * Returns the registered TemplateInstance class.
 * @returns {TemplateInstanceConstructor}
 */ parcelHelpers.export(exports, "getTemplateInstanceClass", ()=>getTemplateInstanceClass);
let TemplateInstance;
function setTemplateInstanceClass(cls) {
    TemplateInstance = cls;
}
function getTemplateInstanceClass() {
    if (!TemplateInstance) throw new Error("TemplateInstance class not registered.");
    return TemplateInstance;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"4SI1R":[function(require,module,exports,__globalThis) {
/**
 * Event listener part used for @event bindings inside templates.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EventPart", ()=>EventPart);
class EventPart {
    /**
   * @param {Element} element
   * @param {string} name
   */ constructor(element, name){
        /** @type {Element} */ this.element = element;
        /** @type {string} */ this.name = name;
        /** @type {EventListener | null} */ this.listener = null;
    }
    /**
   * Replaces the active event listener with the provided callback.
   * @param {unknown} value
   * @returns {void}
   */ setValue(value) {
        if (this.listener) {
            this.element.removeEventListener(this.name, this.listener);
            this.listener = null;
        }
        if (typeof value !== "function") return;
        this.listener = value;
        this.element.addEventListener(this.name, this.listener);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"iboG4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Property binding part used for .property syntax inside templates.
 * @extends {Part}
 */ parcelHelpers.export(exports, "PropertyPart", ()=>PropertyPart);
var _indexJs = require("../signals/index.js");
var _partJs = require("./_part.js");
class PropertyPart extends (0, _partJs.Part) {
    /**
   * @param {HTMLElement & Record<string, any>} element
   * @param {string} name
   */ constructor(element, name){
        super();
        /** @type {HTMLElement & Record<string, any>} */ this.element = element;
        /** @type {string} */ this.name = name;
    }
    /**
   * Resolves signals before committing the latest property value.
   * @param {unknown} value
   * @returns {void}
   */ setValue(value) {
        if ((0, _indexJs.isSignalLike)(value)) {
            this.bindSignal(value, (resolved)=>this.commit(resolved));
            return;
        }
        this.disposeSignal();
        this.commit(value);
    }
    /**
   * Writes the resolved value to the backing DOM property.
   * @param {unknown} value
   * @returns {void}
   */ commit(value) {
        this.element[this.name] = value;
    }
}

},{"../signals/index.js":"d1jnm","./_part.js":"hdeVM","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"jHIqE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Instantiated template that maps placeholder descriptors to concrete DOM parts.
 */ parcelHelpers.export(exports, "TemplateInstance", ()=>TemplateInstance);
var _partsJs = require("./_parts.js");
const ATTRIBUTE_PART_RE = /([.@]?[-\w:]+)\s*=\s*(?:"|'|)?$/;
const COMMENT_PART_RE = /^part:(\d+)$/;
const PLACEHOLDER_PART_RE = /^__part_(\d+)__$/;
/**
 * Parsed placeholder descriptor stored in the template cache.
 * @typedef {{ type: "child", index: number, path: number[] } | { type: "attribute" | "property" | "event", index: number, name: string, rawName: string, path: number[] }} TemplateDescriptor
 */ /**
 * Cached template record reused across template literal instances.
 * @typedef {object} TemplateRecord
 * @property {HTMLTemplateElement} template
 * @property {TemplateDescriptor[]} descriptors
 */ /**
 * Minimal part contract shared by all template part implementations.
 * @typedef {{ setValue(value: unknown): void }} TemplatePart
 */ const templateCache = new WeakMap();
/**
 * Computes the index of a node within its parent without allocating an array copy.
 * @param {Node} node
 * @returns {number}
 */ function getChildIndex(node) {
    let index = 0;
    let current = node;
    while(current.previousSibling){
        current = current.previousSibling;
        index += 1;
    }
    return index;
}
/**
 * Resolves a node path from the template root to a concrete node.
 * @param {Node} node
 * @param {ParentNode} root
 * @returns {number[]}
 */ function getNodePath(node, root) {
    const path = [];
    let current = node;
    while(current && current !== root){
        const parent = current.parentNode;
        if (!parent) break;
        path.unshift(getChildIndex(current));
        current = parent;
    }
    return path;
}
/**
 * Resolves a previously stored node path inside a cloned fragment.
 * @param {ParentNode} root
 * @param {number[]} path
 * @returns {Node}
 */ function resolveNodePath(root, path) {
    let current = root;
    for (const index of path)current = current.childNodes[index];
    return current;
}
/**
 * Parses a template literal once and caches the placeholder descriptors by string identity.
 * @param {TemplateStringsArray} strings
 * @returns {TemplateRecord}
 */ function getTemplate(strings) {
    let record = templateCache.get(strings);
    if (record) return record;
    let markup = "";
    for(let index = 0; index < strings.length - 1; index += 1){
        const chunk = strings[index];
        markup += chunk;
        const attributeMatch = chunk.match(ATTRIBUTE_PART_RE);
        if (attributeMatch) markup += `__part_${index}__`;
        else markup += `<!--part:${index}-->`;
    }
    markup += strings[strings.length - 1];
    const template = document.createElement("template");
    template.innerHTML = markup;
    /** @type {TemplateDescriptor[]} */ const descriptors = [];
    const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT);
    let node = walker.nextNode();
    while(node){
        if (node.nodeType === Node.COMMENT_NODE) {
            const match = node.data.match(COMMENT_PART_RE);
            if (match) descriptors.push({
                type: "child",
                index: Number(match[1]),
                path: getNodePath(node, template.content)
            });
            node = walker.nextNode();
            continue;
        }
        if (node.nodeType === Node.ELEMENT_NODE) for (const attribute of [
            ...node.attributes
        ]){
            const match = attribute.value.match(PLACEHOLDER_PART_RE);
            if (!match) continue;
            const rawName = attribute.name;
            let type = "attribute";
            let name = rawName;
            if (rawName.startsWith(".")) {
                type = "property";
                name = rawName.slice(1);
            } else if (rawName.startsWith("@")) {
                type = "event";
                name = rawName.slice(1);
            }
            descriptors.push({
                type,
                index: Number(match[1]),
                name,
                rawName,
                path: getNodePath(node, template.content)
            });
        }
        node = walker.nextNode();
    }
    record = {
        template,
        descriptors
    };
    templateCache.set(strings, record);
    return record;
}
class TemplateInstance {
    /**
   * @param {TemplateStringsArray} strings
   */ constructor(strings){
        /** @type {TemplateStringsArray} */ this.strings = strings;
        const record = getTemplate(strings);
        /** @type {DocumentFragment} */ this.fragment = record.template.content.cloneNode(true);
        /** @type {Map<number, TemplatePart>} */ this.parts = new Map();
        const resolved = record.descriptors.map((descriptor)=>({
                descriptor,
                node: resolveNodePath(this.fragment, descriptor.path)
            }));
        for (const { descriptor, node } of resolved){
            /** @type {TemplatePart | undefined} */ let part;
            if (descriptor.type === "child") {
                const start = document.createComment(`start:${descriptor.index}`);
                const end = document.createComment(`end:${descriptor.index}`);
                node.replaceWith(start, end);
                part = new (0, _partsJs.ChildNodePart)(start, end);
            } else if (descriptor.type === "attribute") {
                node.removeAttribute(descriptor.rawName);
                part = new (0, _partsJs.AttributePart)(node, descriptor.name);
            } else if (descriptor.type === "property") {
                node.removeAttribute(descriptor.rawName);
                part = new (0, _partsJs.PropertyPart)(node, descriptor.name);
            } else if (descriptor.type === "event") {
                node.removeAttribute(descriptor.rawName);
                part = new (0, _partsJs.EventPart)(node, descriptor.name);
            }
            if (!part) continue;
            this.parts.set(descriptor.index, part);
        }
    }
    /**
   * Pushes the latest template values into their matching DOM parts.
   * @param {unknown[]} values
   * @returns {void}
   */ update(values) {
        for(let index = 0; index < values.length; index += 1){
            const part = this.parts.get(index);
            if (!part) continue;
            part.setValue(values[index]);
        }
    }
}

},{"./_parts.js":"gt9re","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"cacNq":[function(require,module,exports,__globalThis) {
/**
 * Public exports for reusable template helpers.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "categoryFilterOptions", ()=>(0, _helpersJs.categoryFilterOptions));
parcelHelpers.export(exports, "colorSchemeOptions", ()=>(0, _helpersJs.colorSchemeOptions));
parcelHelpers.export(exports, "themeOptions", ()=>(0, _helpersJs.themeOptions));
parcelHelpers.export(exports, "categorySelect", ()=>(0, _helpersJs.categorySelect));
parcelHelpers.export(exports, "directionOptions", ()=>(0, _helpersJs.directionOptions));
parcelHelpers.export(exports, "languageOptions", ()=>(0, _helpersJs.languageOptions));
parcelHelpers.export(exports, "priorityFilterOptions", ()=>(0, _helpersJs.priorityFilterOptions));
parcelHelpers.export(exports, "priorityOptions", ()=>(0, _helpersJs.priorityOptions));
parcelHelpers.export(exports, "sortByOptions", ()=>(0, _helpersJs.sortByOptions));
parcelHelpers.export(exports, "statCard", ()=>(0, _helpersJs.statCard));
parcelHelpers.export(exports, "statusOptions", ()=>(0, _helpersJs.statusOptions));
parcelHelpers.export(exports, "storeModel", ()=>(0, _helpersJs.storeModel));
parcelHelpers.export(exports, "todoModel", ()=>(0, _helpersJs.todoModel));
var _helpersJs = require("./_helpers.js");

},{"./_helpers.js":"a2fRa","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"a2fRa":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Creates a model directive backed by a store path.
 * @param {string} path
 * @param {Partial<ModelConfig>} [options={}]
 * @returns {ReturnType<typeof model>}
 */ parcelHelpers.export(exports, "storeModel", ()=>storeModel);
/**
 * Creates a model directive bound to a specific todo field.
 * @param {string} todoId
 * @param {keyof TodoItem} field
 * @param {Partial<ModelConfig>} [options={}]
 * @returns {ReturnType<typeof model>}
 */ parcelHelpers.export(exports, "todoModel", ()=>todoModel);
/**
 * Renders the static priority options used by editors.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "priorityOptions", ()=>priorityOptions);
/**
 * Renders the priority filter options including the all sentinel.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "priorityFilterOptions", ()=>priorityFilterOptions);
/**
 * Renders the status filter options.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "statusOptions", ()=>statusOptions);
/**
 * Renders the sorting direction options.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "directionOptions", ()=>directionOptions);
/**
 * Renders the supported color scheme selector options.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "colorSchemeOptions", ()=>colorSchemeOptions);
/**
 * Renders the supported theme selector options.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "themeOptions", ()=>themeOptions);
/**
 * Renders the supported language selector options.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "languageOptions", ()=>languageOptions);
/**
 * Renders the supported sort field options.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "sortByOptions", ()=>sortByOptions);
/**
 * Renders the category filter options using the shared named option pipeline.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "categoryFilterOptions", ()=>categoryFilterOptions);
/**
 * Renders a category select bound to a model directive.
 * @param {ReturnType<typeof model>} modelDirective
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "categorySelect", ()=>categorySelect);
/**
 * Renders a single stat card that accepts a raw value or a signal.
 * @param {unknown} signal
 * @param {string} label
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "statCard", ()=>statCard);
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/i18n/index.js");
var _indexJs2 = require("@/state/index.js");
/** @typedef {import("../data/_data.js").TodoItem} TodoItem */ /** @typedef {Parameters<typeof model>[0]} ModelConfig */ /** @typedef {{ value: string, label: string }} NamedOption */ const colorSchemeValues = [
    "system",
    "light",
    "dark"
];
const themeValues = [
    "studio",
    "atelier",
    "cabinet",
    "grove",
    "signal",
    "nocturne"
];
const priorityValues = [
    "low",
    "medium",
    "high"
];
const statusValues = [
    "all",
    "open",
    "done"
];
const directionValues = [
    "asc",
    "desc"
];
const sortByValues = [
    "createdAt",
    "title",
    "priority",
    "dueDate",
    "category"
];
/** @type {NamedOption[]} */ const languageOptionList = [
    {
        value: "it",
        label: "\uD83C\uDDEE\uD83C\uDDF9 Italiano"
    },
    {
        value: "en",
        label: "\uD83C\uDDEC\uD83C\uDDE7 English"
    },
    {
        value: "fr",
        label: "\uD83C\uDDEB\uD83C\uDDF7 Fran\xe7ais"
    },
    {
        value: "de",
        label: "\uD83C\uDDE9\uD83C\uDDEA Deutsch"
    },
    {
        value: "es",
        label: "\uD83C\uDDEA\uD83C\uDDF8 Espa\xf1ol"
    }
];
/**
 * Renders a static option list from name/value pairs.
 * @param {NamedOption[]} options
 * @returns {ReturnType<typeof html>}
 */ function namedOptions(options) {
    return (0, _indexJs.html)`${(0, _indexJs.repeat)(options, (option)=>option.value, (option)=>(0, _indexJs.html)`<option value=${option.value}>${option.label}</option>`)}`;
}
/**
 * Returns the current UI language from persisted preferences.
 * @returns {import("../data/_data.js").LanguageCode}
 */ function currentLanguage() {
    return (0, _indexJs2.store).state.preferences.language;
}
/**
 * Creates name/value pairs from stable enum values.
 * @param {string[]} values
 * @param {(value: string) => string} getLabel
 * @returns {NamedOption[]}
 */ function toNamedOptionList(values, getLabel) {
    return values.map((value)=>({
            value,
            label: getLabel(value)
        }));
}
function storeModel(path, options = {}) {
    return (0, _indexJs.model)({
        signal: (0, _indexJs2.mainState),
        get: ()=>(0, _indexJs2.store).get(path),
        set: (value)=>(0, _indexJs2.store).set(path, value),
        ...options
    });
}
function todoModel(todoId, field, options = {}) {
    return (0, _indexJs.model)({
        signal: (0, _indexJs2.mainState),
        get: ()=>(0, _indexJs2.getTodoById)(todoId)?.[field] ?? (options.prop === "checked" ? false : ""),
        set: (value)=>(0, _indexJs2.updateTodo)(todoId, {
                [field]: value
            }),
        ...options
    });
}
function priorityOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList(priorityValues, (value)=>(0, _indexJs1.optionLabel)(language, "priority", value)));
}
function priorityFilterOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList([
        "all",
        ...priorityValues
    ], (value)=>(0, _indexJs1.optionLabel)(language, "priority", value)));
}
function statusOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList(statusValues, (value)=>(0, _indexJs1.optionLabel)(language, "status", value)));
}
function directionOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList(directionValues, (value)=>(0, _indexJs1.optionLabel)(language, "direction", value)));
}
function colorSchemeOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList(colorSchemeValues, (value)=>(0, _indexJs1.optionLabel)(language, "colorScheme", value)));
}
function themeOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList(themeValues, (value)=>(0, _indexJs1.optionLabel)(language, "theme", value)));
}
function languageOptions() {
    return namedOptions(languageOptionList);
}
function sortByOptions() {
    const language = currentLanguage();
    return namedOptions(toNamedOptionList(sortByValues, (value)=>(0, _indexJs1.optionLabel)(language, "sortBy", value)));
}
function categoryFilterOptions() {
    const language = currentLanguage();
    return namedOptions([
        {
            value: "all",
            label: (0, _indexJs1.t)(language, "options.category.all")
        },
        ...(0, _indexJs2.categoryChoices).get().map((category)=>({
                value: category,
                label: category
            }))
    ]);
}
function categorySelect(modelDirective) {
    const options = (0, _indexJs2.categoryChoices).get().map((category)=>({
            value: category,
            label: category
        }));
    return (0, _indexJs.html)`
    <select model=${modelDirective}>
      ${namedOptions(options)}
    </select>
  `;
}
function statCard(signal, label) {
    return (0, _indexJs.html)`
    <li>
      <article data-component="stat-card" data-surface="card">
        <strong>${signal}</strong>
        <span>${label}</span>
      </article>
    </li>
  `;
}

},{"@/core/index.js":"12Zhm","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"4jB2J":[function(require,module,exports,__globalThis) {
/** @typedef {import("../data/_data.js").LanguageCode} LanguageCode */ /**
 * Locale tags used for formatting and collation.
 * @type {Record<LanguageCode, string>}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Returns the locale tag for the current UI language.
 * @param {LanguageCode} language
 * @returns {string}
 */ parcelHelpers.export(exports, "localeForLanguage", ()=>localeForLanguage);
/**
 * Resolves a translated UI string with optional placeholder interpolation.
 * @param {LanguageCode} language
 * @param {string} key
 * @param {Record<string, string | number>} [params={}]
 * @returns {string}
 */ parcelHelpers.export(exports, "t", ()=>t);
/**
 * Returns a translated label for enum-like option groups.
 * @param {LanguageCode} language
 * @param {string} group
 * @param {string} value
 * @returns {string}
 */ parcelHelpers.export(exports, "optionLabel", ()=>optionLabel);
/**
 * Builds the translated summary label shown above the list.
 * @param {LanguageCode} language
 * @param {number} count
 * @param {string} sortBy
 * @returns {string}
 */ parcelHelpers.export(exports, "visibleSummaryLabel", ()=>visibleSummaryLabel);
/**
 * Formats debug log timestamps using the active locale.
 * @param {LanguageCode} language
 * @param {Date} [value=new Date()]
 * @returns {string}
 */ parcelHelpers.export(exports, "formatDebugTime", ()=>formatDebugTime);
const localeByLanguage = {
    en: "en-GB",
    it: "it-IT",
    fr: "fr-FR",
    de: "de-DE",
    es: "es-ES"
};
/**
 * Translation catalog used by the demo UI.
 * @type {Record<LanguageCode, Record<string, unknown>>}
 */ const dictionary = {
    en: {
        app: {
            eyebrow: "HTML state, signals, proxy store",
            title: "Vanilla Todo List",
            subcopyPrimary: "A vanilla todo demo where forms write directly into a proxy backed store.",
            subcopySecondary: "List updates, filters, counters, and the debug log rerender through signals and DOM parts."
        },
        buttons: {
            resetDemo: "Reset demo",
            newTodo: "New todo",
            newCategory: "New category",
            addTodo: "Add todo",
            cancel: "Cancel",
            createCategory: "Create category",
            selectVisible: "Select visible",
            clearSelection: "Clear selection",
            completeSelected: "Complete selected",
            reopenSelected: "Reopen selected",
            deleteSelected: "Delete selected",
            deleteCompleted: "Delete completed",
            delete: "Delete"
        },
        sections: {
            quickAdd: "Quick add",
            filtersSorting: "Filters and sorting",
            bulkActions: "Bulk actions",
            reactiveList: "Reactive list",
            overview: "Overview",
            debugLog: "store:change log"
        },
        fields: {
            colorScheme: "Color scheme",
            theme: "Theme",
            language: "Language",
            search: "Search",
            status: "Status",
            category: "Category",
            priority: "Priority",
            sortBy: "Sort by",
            direction: "Direction",
            title: "Title",
            notes: "Notes",
            dueDate: "Due date",
            name: "Name"
        },
        labels: {
            select: "Select",
            done: "Done",
            pauseLog: "Pause log"
        },
        stats: {
            total: "Total",
            open: "Open",
            done: "Done",
            visible: "Visible",
            selected: "Selected"
        },
        placeholders: {
            search: "Search title, notes, category...",
            todoTitle: "What needs to happen?",
            categoryName: "Research"
        },
        modal: {
            eyebrow: "Store driven dialog",
            title: "New category",
            description: "Add it once and every category dropdown updates on the next render cycle.",
            help: "Use a unique label so filters and editors stay aligned.",
            todoEyebrow: "Draft driven dialog",
            todoTitle: "New todo",
            todoDescription: "Create a new todo from the shared draft state without leaving the current workspace.",
            todoHelp: "A title is required before the todo can be created."
        },
        messages: {
            visibleSummary: "{count} visible item(s), sorted by {sortBy}"
        },
        errors: {
            emptyCategory: "Enter a category name.",
            emptyTodoTitle: "Enter a todo title.",
            duplicateCategory: "That category already exists.",
            missingMount: "Missing application mount node."
        },
        options: {
            colorScheme: {
                system: "System",
                light: "Light",
                dark: "Dark"
            },
            theme: {
                studio: "Studio",
                atelier: "Atelier",
                cabinet: "Cabinet",
                grove: "Grove",
                signal: "Signal",
                nocturne: "Nocturne"
            },
            priority: {
                all: "All priorities",
                low: "Low",
                medium: "Medium",
                high: "High"
            },
            status: {
                all: "All",
                open: "Open",
                done: "Done"
            },
            direction: {
                asc: "Ascending",
                desc: "Descending"
            },
            sortBy: {
                createdAt: "Created date",
                title: "Title",
                priority: "Priority",
                dueDate: "Due date",
                category: "Category"
            },
            category: {
                all: "All categories"
            }
        }
    },
    it: {
        app: {
            eyebrow: "Stato HTML, segnali, proxy store",
            title: "Vanilla Todo List",
            subcopyPrimary: "Una demo todo vanilla in cui i form scrivono direttamente in uno store basato su proxy.",
            subcopySecondary: "Lista, filtri, contatori e log di debug si aggiornano con signals e DOM parts."
        },
        buttons: {
            resetDemo: "Reimposta demo",
            newTodo: "Nuovo todo",
            newCategory: "Nuova categoria",
            addTodo: "Aggiungi todo",
            cancel: "Annulla",
            createCategory: "Crea categoria",
            selectVisible: "Seleziona visibili",
            clearSelection: "Azzera selezione",
            completeSelected: "Completa selezionate",
            reopenSelected: "Riapri selezionate",
            deleteSelected: "Elimina selezionate",
            deleteCompleted: "Elimina completate",
            delete: "Elimina"
        },
        sections: {
            quickAdd: "Aggiunta rapida",
            filtersSorting: "Filtri e ordinamento",
            bulkActions: "Azioni di gruppo",
            reactiveList: "Lista reattiva",
            overview: "Panoramica",
            debugLog: "Log store:change"
        },
        fields: {
            colorScheme: "Schema colore",
            theme: "Tema",
            language: "Lingua",
            search: "Cerca",
            status: "Stato",
            category: "Categoria",
            priority: "Priorita",
            sortBy: "Ordina per",
            direction: "Direzione",
            title: "Titolo",
            notes: "Note",
            dueDate: "Scadenza",
            name: "Nome"
        },
        labels: {
            select: "Seleziona",
            done: "Fatto",
            pauseLog: "Metti in pausa il log"
        },
        stats: {
            total: "Totali",
            open: "Aperte",
            done: "Fatte",
            visible: "Visibili",
            selected: "Selezionate"
        },
        placeholders: {
            search: "Cerca per titolo, note, categoria...",
            todoTitle: "Cosa deve succedere?",
            categoryName: "Ricerca"
        },
        modal: {
            eyebrow: "Dialog guidato dallo store",
            title: "Nuova categoria",
            description: "Aggiungila una volta e ogni menu categoria si aggiorna al ciclo di render successivo.",
            help: "Usa un'etichetta unica per mantenere allineati filtri ed editor.",
            todoEyebrow: "Dialog guidato dal draft",
            todoTitle: "Nuovo todo",
            todoDescription: "Crea un nuovo todo dallo stato condiviso del draft senza lasciare il workspace corrente.",
            todoHelp: "Inserisci un titolo prima di creare il todo."
        },
        messages: {
            visibleSummary: "{count} elementi visibili, ordinati per {sortBy}"
        },
        errors: {
            emptyCategory: "Inserisci un nome categoria.",
            emptyTodoTitle: "Inserisci un titolo per il todo.",
            duplicateCategory: "Questa categoria esiste gia.",
            missingMount: "Manca il nodo di mount dell'applicazione."
        },
        options: {
            colorScheme: {
                system: "Sistema",
                light: "Chiaro",
                dark: "Scuro"
            },
            theme: {
                studio: "Studio",
                atelier: "Atelier",
                cabinet: "Cabinet",
                grove: "Grove",
                signal: "Signal",
                nocturne: "Nocturne"
            },
            priority: {
                all: "Tutte le priorita",
                low: "Bassa",
                medium: "Media",
                high: "Alta"
            },
            status: {
                all: "Tutte",
                open: "Aperte",
                done: "Fatte"
            },
            direction: {
                asc: "Crescente",
                desc: "Decrescente"
            },
            sortBy: {
                createdAt: "Data di creazione",
                title: "Titolo",
                priority: "Priorita",
                dueDate: "Scadenza",
                category: "Categoria"
            },
            category: {
                all: "Tutte le categorie"
            }
        }
    },
    fr: {
        app: {
            eyebrow: "Etat HTML, signaux, proxy store",
            title: "Vanilla Todo List",
            subcopyPrimary: "Une demo todo vanilla ou les formulaires ecrivent directement dans un store base sur proxy.",
            subcopySecondary: "La liste, les filtres, les compteurs et le journal de debug se mettent a jour avec signals et DOM parts."
        },
        buttons: {
            resetDemo: "Reinitialiser la demo",
            newTodo: "Nouveau todo",
            newCategory: "Nouvelle categorie",
            addTodo: "Ajouter le todo",
            cancel: "Annuler",
            createCategory: "Creer la categorie",
            selectVisible: "Selectionner les visibles",
            clearSelection: "Effacer la selection",
            completeSelected: "Terminer la selection",
            reopenSelected: "Reouvrir la selection",
            deleteSelected: "Supprimer la selection",
            deleteCompleted: "Supprimer les termines",
            delete: "Supprimer"
        },
        sections: {
            quickAdd: "Ajout rapide",
            filtersSorting: "Filtres et tri",
            bulkActions: "Actions de groupe",
            reactiveList: "Liste reactive",
            overview: "Vue d'ensemble",
            debugLog: "Journal store:change"
        },
        fields: {
            colorScheme: "Schema de couleurs",
            theme: "Theme",
            language: "Langue",
            search: "Recherche",
            status: "Statut",
            category: "Categorie",
            priority: "Priorite",
            sortBy: "Trier par",
            direction: "Direction",
            title: "Titre",
            notes: "Notes",
            dueDate: "Date limite",
            name: "Nom"
        },
        labels: {
            select: "Selectionner",
            done: "Fait",
            pauseLog: "Mettre le journal en pause"
        },
        stats: {
            total: "Total",
            open: "Ouverts",
            done: "Faits",
            visible: "Visibles",
            selected: "Selectionnes"
        },
        placeholders: {
            search: "Rechercher dans le titre, les notes, la categorie...",
            todoTitle: "Que faut-il faire ?",
            categoryName: "Recherche"
        },
        modal: {
            eyebrow: "Dialogue pilote par le store",
            title: "Nouvelle categorie",
            description: "Ajoutez-la une fois et chaque menu de categorie se met a jour au prochain cycle de rendu.",
            help: "Utilisez un libelle unique pour garder filtres et editeurs alignes.",
            todoEyebrow: "Dialogue pilote par le draft",
            todoTitle: "Nouveau todo",
            todoDescription: "Creez un nouveau todo depuis l'etat partage du draft sans quitter l'espace de travail courant.",
            todoHelp: "Saisissez un titre avant de creer le todo."
        },
        messages: {
            visibleSummary: "{count} element(s) visibles, tries par {sortBy}"
        },
        errors: {
            emptyCategory: "Saisissez un nom de categorie.",
            emptyTodoTitle: "Saisissez un titre pour le todo.",
            duplicateCategory: "Cette categorie existe deja.",
            missingMount: "Le noeud de montage de l'application est introuvable."
        },
        options: {
            colorScheme: {
                system: "Systeme",
                light: "Clair",
                dark: "Sombre"
            },
            theme: {
                studio: "Studio",
                atelier: "Atelier",
                cabinet: "Cabinet",
                grove: "Grove",
                signal: "Signal",
                nocturne: "Nocturne"
            },
            priority: {
                all: "Toutes les priorites",
                low: "Basse",
                medium: "Moyenne",
                high: "Haute"
            },
            status: {
                all: "Tous",
                open: "Ouverts",
                done: "Faits"
            },
            direction: {
                asc: "Croissant",
                desc: "Decroissant"
            },
            sortBy: {
                createdAt: "Date de creation",
                title: "Titre",
                priority: "Priorite",
                dueDate: "Date limite",
                category: "Categorie"
            },
            category: {
                all: "Toutes les categories"
            }
        }
    },
    de: {
        app: {
            eyebrow: "HTML Zustand, Signale, Proxy Store",
            title: "Vanilla Todo List",
            subcopyPrimary: "Eine Vanilla Todo Demo, in der Formulare direkt in einen Proxy Store schreiben.",
            subcopySecondary: "Liste, Filter, Zaehler und Debug Log werden mit Signals und DOM Parts neu gerendert."
        },
        buttons: {
            resetDemo: "Demo zuruecksetzen",
            newTodo: "Neues Todo",
            newCategory: "Neue Kategorie",
            addTodo: "Todo hinzufuegen",
            cancel: "Abbrechen",
            createCategory: "Kategorie erstellen",
            selectVisible: "Sichtbare auswaehlen",
            clearSelection: "Auswahl aufheben",
            completeSelected: "Auswahl abschliessen",
            reopenSelected: "Auswahl wieder oeffnen",
            deleteSelected: "Auswahl loeschen",
            deleteCompleted: "Erledigte loeschen",
            delete: "Loeschen"
        },
        sections: {
            quickAdd: "Schnell erfassen",
            filtersSorting: "Filter und Sortierung",
            bulkActions: "Sammelaktionen",
            reactiveList: "Reaktive Liste",
            overview: "Ueberblick",
            debugLog: "store:change Protokoll"
        },
        fields: {
            colorScheme: "Farbschema",
            theme: "Thema",
            language: "Sprache",
            search: "Suche",
            status: "Status",
            category: "Kategorie",
            priority: "Prioritaet",
            sortBy: "Sortieren nach",
            direction: "Richtung",
            title: "Titel",
            notes: "Notizen",
            dueDate: "Faelligkeit",
            name: "Name"
        },
        labels: {
            select: "Auswaehlen",
            done: "Erledigt",
            pauseLog: "Protokoll pausieren"
        },
        stats: {
            total: "Gesamt",
            open: "Offen",
            done: "Erledigt",
            visible: "Sichtbar",
            selected: "Ausgewaehlt"
        },
        placeholders: {
            search: "Titel, Notizen, Kategorie durchsuchen...",
            todoTitle: "Was muss passieren?",
            categoryName: "Recherche"
        },
        modal: {
            eyebrow: "Store gesteuerter Dialog",
            title: "Neue Kategorie",
            description: "Einmal hinzufuegen und jedes Kategorie Menue aktualisiert sich im naechsten Render Zyklus.",
            help: "Verwende eine eindeutige Bezeichnung, damit Filter und Editoren synchron bleiben.",
            todoEyebrow: "Draft gesteuerter Dialog",
            todoTitle: "Neues Todo",
            todoDescription: "Erstelle ein neues Todo aus dem gemeinsamen Draft Zustand, ohne den aktuellen Workspace zu verlassen.",
            todoHelp: "Gib einen Titel ein, bevor du das Todo erstellst."
        },
        messages: {
            visibleSummary: "{count} sichtbare Eintraege, sortiert nach {sortBy}"
        },
        errors: {
            emptyCategory: "Gib einen Kategorienamen ein.",
            emptyTodoTitle: "Gib einen Titel fuer das Todo ein.",
            duplicateCategory: "Diese Kategorie existiert bereits.",
            missingMount: "Der Mount Knoten der Anwendung fehlt."
        },
        options: {
            colorScheme: {
                system: "System",
                light: "Hell",
                dark: "Dunkel"
            },
            theme: {
                studio: "Studio",
                atelier: "Atelier",
                cabinet: "Cabinet",
                grove: "Grove",
                signal: "Signal",
                nocturne: "Nocturne"
            },
            priority: {
                all: "Alle Prioritaeten",
                low: "Niedrig",
                medium: "Mittel",
                high: "Hoch"
            },
            status: {
                all: "Alle",
                open: "Offen",
                done: "Erledigt"
            },
            direction: {
                asc: "Aufsteigend",
                desc: "Absteigend"
            },
            sortBy: {
                createdAt: "Erstellt am",
                title: "Titel",
                priority: "Prioritaet",
                dueDate: "Faelligkeit",
                category: "Kategorie"
            },
            category: {
                all: "Alle Kategorien"
            }
        }
    },
    es: {
        app: {
            eyebrow: "Estado HTML, senales, proxy store",
            title: "Vanilla Todo List",
            subcopyPrimary: "Una demo todo vanilla donde los formularios escriben directamente en un store basado en proxy.",
            subcopySecondary: "La lista, los filtros, los contadores y el log de depuracion se actualizan con signals y DOM parts."
        },
        buttons: {
            resetDemo: "Reiniciar demo",
            newTodo: "Nuevo todo",
            newCategory: "Nueva categoria",
            addTodo: "Anadir todo",
            cancel: "Cancelar",
            createCategory: "Crear categoria",
            selectVisible: "Seleccionar visibles",
            clearSelection: "Limpiar seleccion",
            completeSelected: "Completar seleccionadas",
            reopenSelected: "Reabrir seleccionadas",
            deleteSelected: "Eliminar seleccionadas",
            deleteCompleted: "Eliminar completadas",
            delete: "Eliminar"
        },
        sections: {
            quickAdd: "Alta rapida",
            filtersSorting: "Filtros y orden",
            bulkActions: "Acciones masivas",
            reactiveList: "Lista reactiva",
            overview: "Resumen",
            debugLog: "Log store:change"
        },
        fields: {
            colorScheme: "Esquema de color",
            theme: "Tema",
            language: "Idioma",
            search: "Buscar",
            status: "Estado",
            category: "Categoria",
            priority: "Prioridad",
            sortBy: "Ordenar por",
            direction: "Direccion",
            title: "Titulo",
            notes: "Notas",
            dueDate: "Fecha limite",
            name: "Nombre"
        },
        labels: {
            select: "Seleccionar",
            done: "Hecho",
            pauseLog: "Pausar log"
        },
        stats: {
            total: "Total",
            open: "Abiertas",
            done: "Hechas",
            visible: "Visibles",
            selected: "Seleccionadas"
        },
        placeholders: {
            search: "Buscar por titulo, notas, categoria...",
            todoTitle: "Que tiene que pasar?",
            categoryName: "Investigacion"
        },
        modal: {
            eyebrow: "Dialogo guiado por el store",
            title: "Nueva categoria",
            description: "Anadela una vez y cada menu de categoria se actualizara en el siguiente ciclo de render.",
            help: "Usa una etiqueta unica para mantener alineados filtros y editores.",
            todoEyebrow: "Dialogo guiado por el draft",
            todoTitle: "Nuevo todo",
            todoDescription: "Crea un nuevo todo desde el estado compartido del draft sin salir del espacio de trabajo actual.",
            todoHelp: "Ingresa un titulo antes de crear el todo."
        },
        messages: {
            visibleSummary: "{count} elemento(s) visibles, ordenados por {sortBy}"
        },
        errors: {
            emptyCategory: "Introduce un nombre de categoria.",
            emptyTodoTitle: "Introduce un titulo para el todo.",
            duplicateCategory: "Esa categoria ya existe.",
            missingMount: "Falta el nodo de montaje de la aplicacion."
        },
        options: {
            colorScheme: {
                system: "Sistema",
                light: "Claro",
                dark: "Oscuro"
            },
            theme: {
                studio: "Studio",
                atelier: "Atelier",
                cabinet: "Cabinet",
                grove: "Grove",
                signal: "Signal",
                nocturne: "Nocturne"
            },
            priority: {
                all: "Todas las prioridades",
                low: "Baja",
                medium: "Media",
                high: "Alta"
            },
            status: {
                all: "Todas",
                open: "Abiertas",
                done: "Hechas"
            },
            direction: {
                asc: "Ascendente",
                desc: "Descendente"
            },
            sortBy: {
                createdAt: "Fecha de creacion",
                title: "Titulo",
                priority: "Prioridad",
                dueDate: "Fecha limite",
                category: "Categoria"
            },
            category: {
                all: "Todas las categorias"
            }
        }
    }
};
const timeFormatterCache = new Map();
/**
 * Safely resolves a nested key inside a dictionary branch.
 * @param {Record<string, unknown>} source
 * @param {string} key
 * @returns {string | undefined}
 */ function lookup(source, key) {
    const segments = key.split(".");
    let cursor = /** @type {unknown} */ source;
    for (const segment of segments){
        if (typeof cursor !== "object" || cursor === null) return undefined;
        cursor = /** @type {Record<string, unknown>} */ cursor[segment];
    }
    return typeof cursor === "string" ? cursor : undefined;
}
/**
 * Replaces named placeholders inside a translated template.
 * @param {string} template
 * @param {Record<string, string | number>} params
 * @returns {string}
 */ function interpolate(template, params) {
    return template.replace(/\{(\w+)\}/g, (_, name)=>String(params[name] ?? ""));
}
function localeForLanguage(language) {
    return localeByLanguage[language] ?? localeByLanguage.en;
}
function t(language, key, params = {}) {
    const messages = dictionary[language] ?? dictionary.en;
    const template = lookup(messages, key) ?? lookup(dictionary.en, key) ?? key;
    return interpolate(template, params);
}
function optionLabel(language, group, value) {
    return t(language, `options.${group}.${value}`);
}
function visibleSummaryLabel(language, count, sortBy) {
    return t(language, "messages.visibleSummary", {
        count,
        sortBy: optionLabel(language, "sortBy", sortBy)
    });
}
function formatDebugTime(language, value = new Date()) {
    const locale = localeForLanguage(language);
    let formatter = timeFormatterCache.get(locale);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(locale, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        timeFormatterCache.set(locale, formatter);
    }
    return formatter.format(value);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"bQ2qF":[function(require,module,exports,__globalThis) {
/**
 * Public exports for the demo state layer.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addCategory", ()=>(0, _actionsJs.addCategory));
parcelHelpers.export(exports, "addTodo", ()=>(0, _actionsJs.addTodo));
parcelHelpers.export(exports, "clearSelection", ()=>(0, _actionsJs.clearSelection));
parcelHelpers.export(exports, "closeCategoryModal", ()=>(0, _actionsJs.closeCategoryModal));
parcelHelpers.export(exports, "closeTodoModal", ()=>(0, _actionsJs.closeTodoModal));
parcelHelpers.export(exports, "deleteCompleted", ()=>(0, _actionsJs.deleteCompleted));
parcelHelpers.export(exports, "deleteSelected", ()=>(0, _actionsJs.deleteSelected));
parcelHelpers.export(exports, "getTodoById", ()=>(0, _actionsJs.getTodoById));
parcelHelpers.export(exports, "openCategoryModal", ()=>(0, _actionsJs.openCategoryModal));
parcelHelpers.export(exports, "openTodoModal", ()=>(0, _actionsJs.openTodoModal));
parcelHelpers.export(exports, "removeTodo", ()=>(0, _actionsJs.removeTodo));
parcelHelpers.export(exports, "resetDemo", ()=>(0, _actionsJs.resetDemo));
parcelHelpers.export(exports, "selectAllVisible", ()=>(0, _actionsJs.selectAllVisible));
parcelHelpers.export(exports, "toggleAllSelected", ()=>(0, _actionsJs.toggleAllSelected));
parcelHelpers.export(exports, "updateTodo", ()=>(0, _actionsJs.updateTodo));
parcelHelpers.export(exports, "categoryChoices", ()=>(0, _computedJs.categoryChoices));
parcelHelpers.export(exports, "categoryOptions", ()=>(0, _computedJs.categoryOptions));
parcelHelpers.export(exports, "completedCount", ()=>(0, _computedJs.completedCount));
parcelHelpers.export(exports, "debugLogs", ()=>(0, _computedJs.debugLogs));
parcelHelpers.export(exports, "openCount", ()=>(0, _computedJs.openCount));
parcelHelpers.export(exports, "selectedCount", ()=>(0, _computedJs.selectedCount));
parcelHelpers.export(exports, "summary", ()=>(0, _computedJs.summary));
parcelHelpers.export(exports, "totalCount", ()=>(0, _computedJs.totalCount));
parcelHelpers.export(exports, "visibleCount", ()=>(0, _computedJs.visibleCount));
parcelHelpers.export(exports, "visibleLabel", ()=>(0, _computedJs.visibleLabel));
parcelHelpers.export(exports, "visibleTodos", ()=>(0, _computedJs.visibleTodos));
parcelHelpers.export(exports, "mainState", ()=>(0, _storeSetupJs.mainState));
parcelHelpers.export(exports, "isEmbedded", ()=>(0, _storeSetupJs.isEmbedded));
parcelHelpers.export(exports, "root", ()=>(0, _storeSetupJs.root));
parcelHelpers.export(exports, "store", ()=>(0, _storeSetupJs.store));
var _actionsJs = require("./_actions.js");
var _computedJs = require("./_computed.js");
var _storeSetupJs = require("./_store-setup.js");

},{"./_actions.js":"9hiOk","./_computed.js":"iAgmE","./_store-setup.js":"cWGnk","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"9hiOk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** @typedef {import("../data/_data.js").TodoItem} TodoItem */ /**
 * Returns the todo matching the provided identifier.
 * @param {string} id
 * @returns {TodoItem | undefined}
 */ parcelHelpers.export(exports, "getTodoById", ()=>getTodoById);
/**
 * Merges a partial patch into an existing todo item.
 * @param {string} id
 * @param {Partial<TodoItem>} patch
 * @returns {void}
 */ parcelHelpers.export(exports, "updateTodo", ()=>updateTodo);
/**
 * Removes a todo by identifier.
 * @param {string} id
 * @returns {void}
 */ parcelHelpers.export(exports, "removeTodo", ()=>removeTodo);
/**
 * Creates a new todo from the draft form when the title is not empty.
 * @returns {boolean}
 */ parcelHelpers.export(exports, "addTodo", ()=>addTodo);
/**
 * Marks every selected todo with the provided completion state.
 * @param {boolean} nextCompleted
 * @returns {void}
 */ parcelHelpers.export(exports, "toggleAllSelected", ()=>toggleAllSelected);
/**
 * Removes every completed todo.
 * @returns {void}
 */ parcelHelpers.export(exports, "deleteCompleted", ()=>deleteCompleted);
/**
 * Removes every selected todo.
 * @returns {void}
 */ parcelHelpers.export(exports, "deleteSelected", ()=>deleteSelected);
/**
 * Clears the selection state of all todos.
 * @returns {void}
 */ parcelHelpers.export(exports, "clearSelection", ()=>clearSelection);
/**
 * Selects the todos currently visible in the filtered list.
 * @param {{ peek(): TodoItem[] }} visibleTodos
 * @returns {void}
 */ parcelHelpers.export(exports, "selectAllVisible", ()=>selectAllVisible);
/**
 * Opens the category modal and resets its previous validation state.
 * @returns {void}
 */ parcelHelpers.export(exports, "openCategoryModal", ()=>openCategoryModal);
/**
 * Closes the category modal and clears the transient form state.
 * @returns {void}
 */ parcelHelpers.export(exports, "closeCategoryModal", ()=>closeCategoryModal);
/**
 * Opens the todo modal and clears transient validation feedback.
 * @returns {void}
 */ parcelHelpers.export(exports, "openTodoModal", ()=>openTodoModal);
/**
 * Closes the todo modal while preserving the current draft values.
 * @returns {void}
 */ parcelHelpers.export(exports, "closeTodoModal", ()=>closeTodoModal);
/**
 * Adds a new category from the modal state when the value is valid and unique.
 * @param {string} [inputValue=store.state.ui.categoryModal.value]
 * @returns {boolean}
 */ parcelHelpers.export(exports, "addCategory", ()=>addCategory);
/**
 * Restores the demo to its seed state and bumps the render version.
 * @returns {void}
 */ parcelHelpers.export(exports, "resetDemo", ()=>resetDemo);
var _indexJs = require("@/data/index.js");
var _indexJs1 = require("@/i18n/index.js");
var _storeSetupJs = require("./_store-setup.js");
function getTodoById(id) {
    return (0, _storeSetupJs.store).state.todos.find((todo)=>todo.id === id);
}
function updateTodo(id, patch) {
    const index = (0, _storeSetupJs.store).state.todos.findIndex((todo)=>todo.id === id);
    if (index < 0) return;
    const current = (0, _storeSetupJs.store).state.todos[index];
    (0, _storeSetupJs.store).state.todos[index] = {
        ...current,
        ...patch
    };
}
function removeTodo(id) {
    (0, _storeSetupJs.store).state.todos = (0, _storeSetupJs.store).state.todos.filter((todo)=>todo.id !== id);
}
function addTodo() {
    const draft = (0, _storeSetupJs.store).state.draft;
    const language = (0, _storeSetupJs.store).state.preferences.language;
    if (!draft.title.trim()) {
        (0, _storeSetupJs.store).state.ui.todoModal = {
            ...(0, _storeSetupJs.store).state.ui.todoModal,
            open: true,
            error: (0, _indexJs1.t)(language, "errors.emptyTodoTitle")
        };
        return false;
    }
    (0, _storeSetupJs.store).state.todos = [
        {
            id: crypto.randomUUID(),
            title: draft.title.trim(),
            notes: draft.notes.trim(),
            category: draft.category,
            priority: draft.priority,
            dueDate: draft.dueDate,
            completed: false,
            selected: false,
            createdAt: Date.now()
        },
        ...(0, _storeSetupJs.store).state.todos
    ];
    (0, _storeSetupJs.store).state.draft = {
        ...(0, _storeSetupJs.store).state.draft,
        title: "",
        notes: "",
        category: (0, _storeSetupJs.store).state.categories[0] ?? "Inbox",
        priority: "medium",
        dueDate: new Date(Date.now() + (0, _indexJs.ONE_DAY_MS)).toISOString().slice(0, 10)
    };
    closeTodoModal();
    return true;
}
function toggleAllSelected(nextCompleted) {
    (0, _storeSetupJs.store).state.todos = (0, _storeSetupJs.store).state.todos.map((todo)=>todo.selected ? {
            ...todo,
            completed: nextCompleted
        } : todo);
}
function deleteCompleted() {
    (0, _storeSetupJs.store).state.todos = (0, _storeSetupJs.store).state.todos.filter((todo)=>!todo.completed);
}
function deleteSelected() {
    (0, _storeSetupJs.store).state.todos = (0, _storeSetupJs.store).state.todos.filter((todo)=>!todo.selected);
}
function clearSelection() {
    (0, _storeSetupJs.store).state.todos = (0, _storeSetupJs.store).state.todos.map((todo)=>({
            ...todo,
            selected: false
        }));
}
function selectAllVisible(visibleTodos) {
    const ids = new Set(visibleTodos.peek().map((todo)=>todo.id));
    (0, _storeSetupJs.store).state.todos = (0, _storeSetupJs.store).state.todos.map((todo)=>({
            ...todo,
            selected: ids.has(todo.id) ? true : todo.selected
        }));
}
/**
 * Updates the category modal state with a partial patch.
 * @param {Partial<import("../data/_data.js").CategoryModalState>} patch
 * @returns {void}
 */ function updateCategoryModal(patch) {
    (0, _storeSetupJs.store).state.ui.categoryModal = {
        ...(0, _storeSetupJs.store).state.ui.categoryModal,
        ...patch
    };
}
/**
 * Updates the todo modal state with a partial patch.
 * @param {Partial<import("../data/_data.js").TodoModalState>} patch
 * @returns {void}
 */ function updateTodoModal(patch) {
    (0, _storeSetupJs.store).state.ui.todoModal = {
        ...(0, _storeSetupJs.store).state.ui.todoModal,
        ...patch
    };
}
function openCategoryModal() {
    (0, _storeSetupJs.store).state.ui.categoryModal = {
        open: true,
        value: "",
        error: ""
    };
}
function closeCategoryModal() {
    (0, _storeSetupJs.store).state.ui.categoryModal = {
        open: false,
        value: "",
        error: ""
    };
}
function openTodoModal() {
    updateTodoModal({
        open: true,
        error: ""
    });
}
function closeTodoModal() {
    updateTodoModal({
        open: false,
        error: ""
    });
}
function addCategory(inputValue = (0, _storeSetupJs.store).state.ui.categoryModal.value) {
    const value = inputValue.trim();
    const language = (0, _storeSetupJs.store).state.preferences.language;
    if (!value) {
        updateCategoryModal({
            open: true,
            error: (0, _indexJs1.t)(language, "errors.emptyCategory")
        });
        return false;
    }
    const alreadyExists = (0, _storeSetupJs.store).state.categories.some((category)=>category.toLowerCase() === value.toLowerCase());
    if (alreadyExists) {
        updateCategoryModal({
            open: true,
            error: (0, _indexJs1.t)(language, "errors.duplicateCategory")
        });
        return false;
    }
    (0, _storeSetupJs.store).state.categories = [
        ...(0, _storeSetupJs.store).state.categories,
        value
    ];
    closeCategoryModal();
    return true;
}
function resetDemo() {
    const { preferences } = (0, _storeSetupJs.store).snapshot();
    (0, _storeSetupJs.store).replace({
        ...(0, _indexJs.createSeedData)(),
        preferences: {
            ...preferences
        }
    });
    (0, _storeSetupJs.mainState).set(performance.now());
}

},{"@/data/index.js":"bsVeC","@/i18n/index.js":"4jB2J","./_store-setup.js":"cWGnk","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"bsVeC":[function(require,module,exports,__globalThis) {
/**
 * Public exports for the demo seed data and filtering helpers.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createSeedData", ()=>(0, _dataJs.createSeedData));
parcelHelpers.export(exports, "ONE_DAY_MS", ()=>(0, _dataJs.ONE_DAY_MS));
parcelHelpers.export(exports, "filterByCategory", ()=>(0, _pipelineJs.filterByCategory));
parcelHelpers.export(exports, "filterByPriority", ()=>(0, _pipelineJs.filterByPriority));
parcelHelpers.export(exports, "filterBySearch", ()=>(0, _pipelineJs.filterBySearch));
parcelHelpers.export(exports, "filterByStatus", ()=>(0, _pipelineJs.filterByStatus));
parcelHelpers.export(exports, "fromArray", ()=>(0, _pipelineJs.fromArray));
parcelHelpers.export(exports, "pipelineTodos", ()=>(0, _pipelineJs.pipelineTodos));
parcelHelpers.export(exports, "sortTodos", ()=>(0, _pipelineJs.sortTodos));
var _dataJs = require("./_data.js");
var _pipelineJs = require("./_pipeline.js");

},{"./_data.js":"et8Wi","./_pipeline.js":"cJvkv","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"et8Wi":[function(require,module,exports,__globalThis) {
/**
 * Priority level supported by the todo demo.
 * @typedef {"low" | "medium" | "high"} TodoPriority
 */ /**
 * Filter status tokens supported by the pipeline.
 * @typedef {"all" | "open" | "done"} FilterStatus
 */ /**
 * Sort direction tokens supported by the pipeline.
 * @typedef {"asc" | "desc"} SortDirection
 */ /**
 * Sort fields supported by the pipeline.
 * @typedef {"createdAt" | "title" | "priority" | "dueDate" | "category"} SortField
 */ /**
 * Supported color scheme options.
 * @typedef {"light" | "dark" | "system"} ColorScheme
 */ /**
 * Supported theme options.
 * @typedef {"studio" | "atelier" | "cabinet" | "grove" | "signal" | "nocturne"} Theme
 */ /**
 * Supported language options.
 * @typedef {"it" | "en" | "fr" | "de" | "es"} LanguageCode
 */ /**
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
 */ /**
 * Draft state used by the quick add form.
 * @typedef {object} DraftTodo
 * @property {string} title
 * @property {string} notes
 * @property {string} category
 * @property {TodoPriority} priority
 * @property {string} dueDate
 */ /**
 * Filters used by the generator based pipeline.
 * @typedef {object} FiltersState
 * @property {string} search
 * @property {string} category
 * @property {FilterStatus} status
 * @property {"all" | TodoPriority} priority
 * @property {SortField} sortBy
 * @property {SortDirection} sortDir
 */ /**
 * Single entry shown in the debug event log.
 * @typedef {object} DebugLogEntry
 * @property {string} id
 * @property {string} timestamp
 * @property {string} path
 * @property {unknown} oldValue
 * @property {unknown} newValue
 */ /**
 * Debug panel state.
 * @typedef {object} DebugState
 * @property {boolean} paused
 * @property {DebugLogEntry[]} logs
 */ /**
 * Persisted design system and locale preferences.
 * @typedef {object} PreferencesState
 * @property {ColorScheme} colorScheme
 * @property {Theme} theme
 * @property {LanguageCode} language
 */ /**
 * New category modal state.
 * @typedef {object} CategoryModalState
 * @property {boolean} open
 * @property {string} value
 * @property {string} error
 */ /**
 * New todo modal state.
 * @typedef {object} TodoModalState
 * @property {boolean} open
 * @property {string} error
 */ /**
 * Ephemeral UI state used by the demo shell.
 * @typedef {object} UiState
 * @property {CategoryModalState} categoryModal
 * @property {TodoModalState} todoModal
 */ /**
 * Complete application state stored in the proxy store.
 * @typedef {object} DemoState
 * @property {TodoItem[]} todos
 * @property {string[]} categories
 * @property {DraftTodo} draft
 * @property {FiltersState} filters
 * @property {DebugState} debug
 * @property {PreferencesState} preferences
 * @property {UiState} ui
 */ /**
 * Milliseconds in 24 hours.
 * @type {number}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ONE_DAY_MS", ()=>ONE_DAY_MS);
/**
 * Creates the initial state used by the demo and by the reset action.
 * @returns {DemoState}
 */ parcelHelpers.export(exports, "createSeedData", ()=>createSeedData);
const ONE_DAY_MS = 86400000;
function createSeedData() {
    const now = Date.now();
    return {
        todos: [
            {
                id: crypto.randomUUID(),
                title: "Prepare the talk intro",
                notes: "Open with the comparison between expensive frameworks and DOM-first",
                category: "Talk",
                priority: "high",
                dueDate: new Date(now + ONE_DAY_MS).toISOString().slice(0, 10),
                completed: false,
                selected: false,
                createdAt: now - 800000
            },
            {
                id: crypto.randomUUID(),
                title: "Refine the keyed repeat engine",
                notes: "Verify node movement and cleanup of removed blocks",
                category: "Engine",
                priority: "medium",
                dueDate: new Date(now + 2 * ONE_DAY_MS).toISOString().slice(0, 10),
                completed: false,
                selected: true,
                createdAt: now - 600000
            },
            {
                id: crypto.randomUUID(),
                title: "Record demo screenshot",
                notes: "Show the store:change event panel",
                category: "Assets",
                priority: "low",
                dueDate: new Date(now + 3 * ONE_DAY_MS).toISOString().slice(0, 10),
                completed: true,
                selected: false,
                createdAt: now - 400000
            }
        ],
        categories: [
            "Inbox",
            "Talk",
            "Engine",
            "Assets",
            "Research"
        ],
        draft: {
            title: "",
            notes: "",
            category: "Inbox",
            priority: "medium",
            dueDate: new Date(now + ONE_DAY_MS).toISOString().slice(0, 10)
        },
        filters: {
            search: "",
            category: "all",
            status: "all",
            priority: "all",
            sortBy: "createdAt",
            sortDir: "desc"
        },
        debug: {
            paused: false,
            logs: []
        },
        preferences: {
            colorScheme: "system",
            theme: "studio",
            language: "en"
        },
        ui: {
            categoryModal: {
                open: false,
                value: "",
                error: ""
            },
            todoModal: {
                open: false,
                error: ""
            }
        }
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"cJvkv":[function(require,module,exports,__globalThis) {
/** @typedef {import("./_data.js").FiltersState} FiltersState */ /** @typedef {import("./_data.js").SortDirection} SortDirection */ /** @typedef {import("./_data.js").SortField} SortField */ /** @typedef {import("./_data.js").TodoItem} TodoItem */ /** @typedef {import("./_data.js").TodoPriority} TodoPriority */ /** @typedef {import("./_data.js").LanguageCode} LanguageCode */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Wraps an array into a lazy iterable so the filtering stages can stay generator based.
 * @template T
 * @param {T[]} items
 * @returns {Generator<T, void, unknown>}
 */ parcelHelpers.export(exports, "fromArray", ()=>fromArray);
/**
 * Filters todos by free text across the user facing fields.
 * @param {Iterable<TodoItem>} source
 * @param {string} search
 * @param {LanguageCode} language
 * @returns {Generator<TodoItem, void, unknown>}
 */ parcelHelpers.export(exports, "filterBySearch", ()=>filterBySearch);
/**
 * Filters todos by category while preserving lazy iteration.
 * @param {Iterable<TodoItem>} source
 * @param {string} category
 * @returns {Generator<TodoItem, void, unknown>}
 */ parcelHelpers.export(exports, "filterByCategory", ()=>filterByCategory);
/**
 * Filters todos by completion status.
 * @param {Iterable<TodoItem>} source
 * @param {FiltersState["status"]} status
 * @returns {Generator<TodoItem, void, unknown>}
 */ parcelHelpers.export(exports, "filterByStatus", ()=>filterByStatus);
/**
 * Filters todos by priority.
 * @param {Iterable<TodoItem>} source
 * @param {FiltersState["priority"]} priority
 * @returns {Generator<TodoItem, void, unknown>}
 */ parcelHelpers.export(exports, "filterByPriority", ()=>filterByPriority);
/**
 * Sorts a materialized todo collection using the user selected sort field.
 * A cached collator avoids rebuilding locale rules for every comparison.
 * @param {Iterable<TodoItem>} items
 * @param {SortField} sortBy
 * @param {SortDirection} sortDir
 * @param {LanguageCode} language
 * @returns {TodoItem[]}
 */ parcelHelpers.export(exports, "sortTodos", ()=>sortTodos);
/**
 * Runs the complete filtering pipeline and returns the visible todos ready for rendering.
 * @param {TodoItem[]} todos
 * @param {FiltersState} filters
 * @param {LanguageCode} language
 * @returns {TodoItem[]}
 */ parcelHelpers.export(exports, "pipelineTodos", ()=>pipelineTodos);
var _indexJs = require("@/i18n/index.js");
/**
 * Numeric ranking used when sorting by semantic priority.
 * @type {Record<TodoPriority, number>}
 */ const priorityRank = {
    low: 0,
    medium: 1,
    high: 2
};
const collatorCache = new Map();
/**
 * Returns a locale aware collator reused across sort calls.
 * @param {LanguageCode} language
 * @returns {Intl.Collator}
 */ function getTextCollator(language) {
    const locale = (0, _indexJs.localeForLanguage)(language);
    let collator = collatorCache.get(locale);
    if (!collator) {
        collator = new Intl.Collator(locale, {
            sensitivity: "base"
        });
        collatorCache.set(locale, collator);
    }
    return collator;
}
function* fromArray(items) {
    for (const item of items)yield item;
}
function* filterBySearch(source, search, language) {
    const query = search.trim().toLowerCase();
    if (!query) {
        yield* source;
        return;
    }
    for (const item of source){
        const localizedPriority = (0, _indexJs.optionLabel)(language, "priority", item.priority);
        const haystack = `${item.title} ${item.notes} ${item.category} ${item.priority} ${localizedPriority}`.toLowerCase();
        if (haystack.includes(query)) yield item;
    }
}
function* filterByCategory(source, category) {
    if (category === "all") {
        yield* source;
        return;
    }
    for (const item of source)if (item.category === category) yield item;
}
function* filterByStatus(source, status) {
    if (status === "all") {
        yield* source;
        return;
    }
    for (const item of source){
        if (status === "done" && item.completed) yield item;
        if (status === "open" && !item.completed) yield item;
    }
}
function* filterByPriority(source, priority) {
    if (priority === "all") {
        yield* source;
        return;
    }
    for (const item of source)if (item.priority === priority) yield item;
}
function sortTodos(items, sortBy, sortDir, language) {
    const direction = sortDir === "asc" ? 1 : -1;
    const sorted = [
        ...items
    ];
    const textCollator = getTextCollator(language);
    sorted.sort((left, right)=>{
        let a = left[sortBy];
        let b = right[sortBy];
        if (sortBy === "priority") {
            a = priorityRank[/** @type {TodoPriority} */ a];
            b = priorityRank[/** @type {TodoPriority} */ b];
        }
        if (sortBy === "title" || sortBy === "category") return direction * textCollator.compare(String(a), String(b));
        if (a === b) return 0;
        return a > b ? direction : -direction;
    });
    return sorted;
}
function pipelineTodos(todos, filters, language) {
    const iterator = filterByPriority(filterByStatus(filterByCategory(filterBySearch(fromArray(todos), filters.search, language), filters.category), filters.status), filters.priority);
    return sortTodos(iterator, filters.sortBy, filters.sortDir, language);
}

},{"@/i18n/index.js":"4jB2J","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"cWGnk":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "store", ()=>store);
parcelHelpers.export(exports, "mainState", ()=>mainState);
parcelHelpers.export(exports, "root", ()=>root);
parcelHelpers.export(exports, "isEmbedded", ()=>isEmbedded);
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/data/index.js");
var _indexJs2 = require("@/i18n/index.js");
/** @typedef {import("../data/_data.js").DebugLogEntry} DebugLogEntry */ /** @typedef {import("../data/_data.js").DemoState} DemoState */ const STORAGE_KEY = "reactive-apps-without-frameworks-demo-state-v1";
const MAX_DEBUG_LOG_ENTRIES = 30;
const supportedThemes = new Set([
    "studio",
    "atelier",
    "cabinet",
    "grove",
    "signal",
    "nocturne"
]);
const legacyThemeMap = {
    amber: "studio",
    cyberpunk: "signal",
    wood: "cabinet",
    sage: "grove",
    rose: "atelier"
};
/**
 * Returns true when the provided value can be spread as a plain record.
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */ function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
/**
 * Normalizes theme identifiers including persisted legacy values.
 * @param {unknown} value
 * @param {string} fallback
 * @returns {string}
 */ function normalizeTheme(value, fallback) {
    if (typeof value !== "string") return fallback;
    const candidate = legacyThemeMap[value] ?? value;
    return supportedThemes.has(candidate) ? candidate : fallback;
}
/**
 * Merges a persisted snapshot with the latest state shape while resetting ephemeral UI state.
 * @param {unknown} savedState
 * @returns {DemoState}
 */ function normalizeState(savedState) {
    const seed = (0, _indexJs1.createSeedData)();
    if (!isRecord(savedState)) return seed;
    const draft = isRecord(savedState.draft) ? savedState.draft : {};
    const filters = isRecord(savedState.filters) ? savedState.filters : {};
    const debug = isRecord(savedState.debug) ? savedState.debug : {};
    const preferences = isRecord(savedState.preferences) ? savedState.preferences : {};
    const { colorTheme: legacyTheme, ...restPreferences } = preferences;
    const theme = normalizeTheme(restPreferences.theme ?? legacyTheme, seed.preferences.theme);
    return {
        ...seed,
        ...savedState,
        todos: Array.isArray(savedState.todos) ? savedState.todos : seed.todos,
        categories: Array.isArray(savedState.categories) ? savedState.categories : seed.categories,
        draft: {
            ...seed.draft,
            ...draft
        },
        filters: {
            ...seed.filters,
            ...filters
        },
        debug: {
            ...seed.debug,
            ...debug,
            logs: Array.isArray(debug.logs) ? debug.logs : seed.debug.logs
        },
        preferences: {
            ...seed.preferences,
            ...restPreferences,
            theme
        },
        ui: seed.ui
    };
}
/**
 * Shape emitted by the proxy store on every mutation.
 * @typedef {object} StoreChangeDetail
 * @property {string} path
 * @property {unknown} oldValue
 * @property {unknown} newValue
 */ /**
 * Reads the persisted state when available and falls back to the seed data on malformed payloads.
 * @returns {DemoState}
 */ function readInitialState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return (0, _indexJs1.createSeedData)();
    try {
        return normalizeState(JSON.parse(saved));
    } catch  {
        return (0, _indexJs1.createSeedData)();
    }
}
const initialState = readInitialState();
const store = new (0, _indexJs.Store)(initialState);
localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
const mainState = new (0, _indexJs.Signal).State(0, {
    equals: ()=>false
});
let isWritingDebugLog = false;
/**
 * Appends the latest store mutation to the debug panel.
 * @param {StoreChangeDetail} detail
 * @returns {void}
 */ function appendDebugLog(detail) {
    /** @type {DebugLogEntry[]} */ const nextLogs = [
        {
            id: crypto.randomUUID(),
            timestamp: (0, _indexJs2.formatDebugTime)(store.state.preferences.language),
            ...detail
        },
        ...store.state.debug.logs
    ].slice(0, MAX_DEBUG_LOG_ENTRIES);
    store.state.debug.logs = nextLogs;
}
/**
 * Persists a serializable snapshot after each successful mutation.
 * @returns {void}
 */ function persistState() {
    const snapshot = store.snapshot();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}
/**
 * Synchronizes persistence, debug logging, and view invalidation after store writes.
 * @param {CustomEvent<StoreChangeDetail>} event
 * @returns {void}
 */ function handleStoreChange(event) {
    // The debug panel writes back into the same store, so nested debug events are ignored.
    if (isWritingDebugLog) return;
    if (!store.state.debug.paused && event.detail.path !== "debug.logs") {
        isWritingDebugLog = true;
        try {
            appendDebugLog(event.detail);
        } finally{
            isWritingDebugLog = false;
        }
    }
    persistState();
    mainState.set(performance.now());
}
window.addEventListener("store:change", handleStoreChange);
/**
 * Resolves an application mount node from an element or selector.
 * @param {HTMLElement | string | null | undefined} [target=document.body]
 * @returns {HTMLElement}
 */ function resolveMountNode(target = document.body) {
    if (typeof target === "string") {
        const node = document.querySelector(target);
        if (node instanceof HTMLElement) return node;
        throw new Error((0, _indexJs2.t)(store.state.preferences.language, "errors.missingMount"));
    }
    if (target instanceof HTMLElement) return target;
    throw new Error((0, _indexJs2.t)(store.state.preferences.language, "errors.missingMount"));
}
const root = resolveMountNode(document.body);
const isEmbedded = new URLSearchParams(window.location.search).get("embed") === "1";

},{"@/core/index.js":"12Zhm","@/data/index.js":"bsVeC","@/i18n/index.js":"4jB2J","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"iAgmE":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "visibleTodos", ()=>visibleTodos);
parcelHelpers.export(exports, "summary", ()=>summary);
parcelHelpers.export(exports, "categoryChoices", ()=>categoryChoices);
parcelHelpers.export(exports, "categoryOptions", ()=>categoryOptions);
parcelHelpers.export(exports, "totalCount", ()=>totalCount);
parcelHelpers.export(exports, "openCount", ()=>openCount);
parcelHelpers.export(exports, "completedCount", ()=>completedCount);
parcelHelpers.export(exports, "visibleCount", ()=>visibleCount);
parcelHelpers.export(exports, "selectedCount", ()=>selectedCount);
parcelHelpers.export(exports, "visibleLabel", ()=>visibleLabel);
parcelHelpers.export(exports, "debugLogs", ()=>debugLogs);
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/data/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _storeSetupJs = require("./_store-setup.js");
const visibleTodos = new (0, _indexJs.Signal).Computed(()=>{
    (0, _storeSetupJs.mainState).get();
    return (0, _indexJs1.pipelineTodos)((0, _storeSetupJs.store).state.todos, (0, _storeSetupJs.store).state.filters, (0, _storeSetupJs.store).state.preferences.language);
});
const summary = new (0, _indexJs.Signal).Computed(()=>{
    (0, _storeSetupJs.mainState).get();
    const todos = (0, _storeSetupJs.store).state.todos;
    let total = 0;
    let completed = 0;
    let selected = 0;
    for (const todo of todos){
        total += 1;
        if (todo.completed) completed += 1;
        if (todo.selected) selected += 1;
    }
    /** @type {TodoSummary} */ return {
        total,
        completed,
        open: total - completed,
        selected,
        visible: visibleTodos.get().length
    };
});
const categoryChoices = new (0, _indexJs.Signal).Computed(()=>{
    (0, _storeSetupJs.mainState).get();
    return (0, _storeSetupJs.store).state.categories;
});
const categoryOptions = new (0, _indexJs.Signal).Computed(()=>{
    return [
        "all",
        ...categoryChoices.get()
    ];
});
const totalCount = new (0, _indexJs.Signal).Computed(()=>summary.get().total);
const openCount = new (0, _indexJs.Signal).Computed(()=>summary.get().open);
const completedCount = new (0, _indexJs.Signal).Computed(()=>summary.get().completed);
const visibleCount = new (0, _indexJs.Signal).Computed(()=>summary.get().visible);
const selectedCount = new (0, _indexJs.Signal).Computed(()=>summary.get().selected);
const visibleLabel = new (0, _indexJs.Signal).Computed(()=>(0, _indexJs2.visibleSummaryLabel)((0, _storeSetupJs.store).state.preferences.language, summary.get().visible, (0, _storeSetupJs.store).state.filters.sortBy));
const debugLogs = new (0, _indexJs.Signal).Computed(()=>{
    (0, _storeSetupJs.mainState).get();
    return (0, _storeSetupJs.store).state.debug.logs;
});

},{"@/core/index.js":"12Zhm","@/data/index.js":"bsVeC","@/i18n/index.js":"4jB2J","./_store-setup.js":"cWGnk","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"jPyMi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bulkActionsPanel", ()=>(0, _bulkActionsJs.bulkActionsPanel));
var _bulkActionsJs = require("./_BulkActions.js");

},{"./_BulkActions.js":"3ySNG","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"3ySNG":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the bulk action controls operating on the current selection.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "bulkActionsPanel", ()=>bulkActionsPanel);
var _bulkActionsCss = require("./_BulkActions.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/i18n/index.js");
var _indexJs2 = require("@/state/index.js");
function bulkActionsPanel() {
    const language = (0, _indexJs2.store).state.preferences.language;
    return (0, _indexJs.html)`
    <section
      data-component="bulk-actions-panel"
      data-panel="bulk-actions"
      data-surface="card"
    >
      <h2>${(0, _indexJs1.t)(language, "sections.bulkActions")}</h2>
      <menu data-list-reset data-slot="actions-grid">
        <li>
          <button @click=${()=>(0, _indexJs2.selectAllVisible)((0, _indexJs2.visibleTodos))}>
            ${(0, _indexJs1.t)(language, "buttons.selectVisible")}
          </button>
        </li>
        <li>
          <button data-variant="secondary" @click=${0, _indexJs2.clearSelection}>
            ${(0, _indexJs1.t)(language, "buttons.clearSelection")}
          </button>
        </li>
        <li>
          <button @click=${()=>(0, _indexJs2.toggleAllSelected)(true)}>
            ${(0, _indexJs1.t)(language, "buttons.completeSelected")}
          </button>
        </li>
        <li>
          <button
            data-variant="secondary"
            @click=${()=>(0, _indexJs2.toggleAllSelected)(false)}
          >
            ${(0, _indexJs1.t)(language, "buttons.reopenSelected")}
          </button>
        </li>
        <li>
          <button data-variant="danger" @click=${0, _indexJs2.deleteSelected}>
            ${(0, _indexJs1.t)(language, "buttons.deleteSelected")}
          </button>
        </li>
        <li>
          <button data-variant="danger" @click=${0, _indexJs2.deleteCompleted}>
            ${(0, _indexJs1.t)(language, "buttons.deleteCompleted")}
          </button>
        </li>
      </menu>
    </section>
  `;
}

},{"./_BulkActions.css":"fJjMP","@/core/index.js":"12Zhm","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"fJjMP":[function() {},{}],"7PlUN":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "categoryModal", ()=>(0, _categoryModalJs.categoryModal));
var _categoryModalJs = require("./_CategoryModal.js");

},{"./_CategoryModal.js":"2LbzZ","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"2LbzZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the modal used to create a new category without relying on prompt().
 * @returns {ReturnType<typeof html> | string}
 */ parcelHelpers.export(exports, "categoryModal", ()=>categoryModal);
var _categoryModalCss = require("./_CategoryModal.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/helpers/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
/**
 * Handles submit from the category modal form.
 * @param {SubmitEvent} event
 * @returns {void}
 */ function handleCategorySubmit(event) {
    event.preventDefault();
    (0, _indexJs3.addCategory)();
}
/**
 * Closes the modal when the user cancels the native dialog.
 * @param {Event} event
 * @returns {void}
 */ function handleModalCancel(event) {
    event.preventDefault();
    (0, _indexJs3.closeCategoryModal)();
}
/**
 * Closes the modal when the overlay itself is clicked.
 * @param {MouseEvent} event
 * @returns {void}
 */ function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    (0, _indexJs3.closeCategoryModal)();
}
function categoryModal() {
    const modal = (0, _indexJs3.store).state.ui.categoryModal;
    const language = (0, _indexJs3.store).state.preferences.language;
    if (!modal.open) return "";
    const messageId = modal.error ? "new-category-error" : "new-category-help";
    const feedbackState = modal.error ? "error" : "idle";
    return (0, _indexJs.html)`
    <dialog
      aria-describedby=${messageId}
      aria-labelledby="new-category-title"
      data-component="category-modal"
      @cancel=${handleModalCancel}
      @click=${handleBackdropClick}
      open
    >
      <article data-slot="surface" data-surface="card">
        <header data-slot="copy">
          <p data-text="eyebrow">${(0, _indexJs2.t)(language, "modal.eyebrow")}</p>
          <h2 id="new-category-title">${(0, _indexJs2.t)(language, "modal.title")}</h2>
          <p data-text="subcopy">${(0, _indexJs2.t)(language, "modal.description")}</p>
        </header>

        <form data-slot="form" @submit=${handleCategorySubmit}>
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.name")}</span>
            <input
              aria-describedby=${messageId}
              aria-invalid=${String(Boolean(modal.error))}
              autofocus
              model=${(0, _indexJs1.storeModel)("ui.categoryModal.value")}
              placeholder=${(0, _indexJs2.t)(language, "placeholders.categoryName")}
            />
          </label>

          <p data-slot="feedback" data-state=${feedbackState} id=${messageId}>
            ${modal.error || (0, _indexJs2.t)(language, "modal.help")}
          </p>

          <footer data-layout="action-grid" data-slot="actions">
            <button
              data-variant="secondary"
              type="button"
              @click=${0, _indexJs3.closeCategoryModal}
            >
              ${(0, _indexJs2.t)(language, "buttons.cancel")}
            </button>
            <button type="submit">
              ${(0, _indexJs2.t)(language, "buttons.createCategory")}
            </button>
          </footer>
        </form>
      </article>
    </dialog>
  `;
}

},{"./_CategoryModal.css":"7FpWi","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"7FpWi":[function() {},{}],"dqz2C":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debugPanel", ()=>(0, _debugPanelJs.debugPanel));
var _debugPanelJs = require("./_DebugPanel.js");

},{"./_DebugPanel.js":"lleeZ","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"lleeZ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the live store:change log panel.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "debugPanel", ()=>debugPanel);
var _debugPanelCss = require("./_DebugPanel.css");
var _indexJs = require("@/components/DebugLogEntry/index.js");
var _indexJs1 = require("@/core/index.js");
var _indexJs2 = require("@/helpers/index.js");
var _indexJs3 = require("@/i18n/index.js");
var _indexJs4 = require("@/state/index.js");
function debugPanel() {
    const language = (0, _indexJs4.store).state.preferences.language;
    return (0, _indexJs1.html)`
    <section
      data-component="debug-panel"
      data-panel="debug-log"
      data-surface="card"
    >
      <header data-slot="header">
        <h2>${(0, _indexJs3.t)(language, "sections.debugLog")}</h2>
        <label data-control-group="checkline" data-density="compact">
          <input
            model=${(0, _indexJs2.storeModel)("debug.paused", {
        prop: "checked",
        event: "change"
    })}
            type="checkbox"
          />
          <span>${(0, _indexJs3.t)(language, "labels.pauseLog")}</span>
        </label>
      </header>
      <ol data-list-reset data-slot="entries">
        ${(0, _indexJs1.repeat)((0, _indexJs4.debugLogs), (entry)=>entry.id, (0, _indexJs.debugLogEntry))}
      </ol>
    </section>
  `;
}

},{"./_DebugPanel.css":"38o6C","@/components/DebugLogEntry/index.js":"5f7HS","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"38o6C":[function() {},{}],"5f7HS":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debugLogEntry", ()=>(0, _debugLogEntryJs.debugLogEntry));
var _debugLogEntryJs = require("./_DebugLogEntry.js");

},{"./_DebugLogEntry.js":"aH7XC","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"aH7XC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** @typedef {import("../../data/_data.js").DebugLogEntry} DebugLogEntry */ /**
 * Renders a single immutable store change entry.
 * @param {DebugLogEntry} entry
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "debugLogEntry", ()=>debugLogEntry);
var _debugLogEntryCss = require("./_DebugLogEntry.css");
var _indexJs = require("@/core/index.js");
function debugLogEntry(entry) {
    const payload = JSON.stringify({
        oldValue: entry.oldValue,
        newValue: entry.newValue
    }, null, 2);
    return (0, _indexJs.html)`
    <li>
      <article data-component="debug-log-entry">
        <header data-slot="entry-header">
          <strong>${entry.path || "(root)"}</strong>
          <time>${entry.timestamp}</time>
        </header>
        <pre>${payload}</pre>
      </article>
    </li>
  `;
}

},{"./_DebugLogEntry.css":"5V73w","@/core/index.js":"12Zhm","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"5V73w":[function() {},{}],"dzEtb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "filtersPanel", ()=>(0, _filtersJs.filtersPanel));
var _filtersJs = require("./_Filters.js");

},{"./_Filters.js":"481Y2","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"481Y2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the filter and sorting controls that drive the visible list pipeline.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "filtersPanel", ()=>filtersPanel);
var _filtersCss = require("./_Filters.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/helpers/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
/**
 * Prevents the filter form from submitting when Enter is pressed.
 * @param {SubmitEvent} event
 * @returns {void}
 */ function handleFiltersSubmit(event) {
    event.preventDefault();
}
function filtersPanel() {
    const language = (0, _indexJs3.store).state.preferences.language;
    return (0, _indexJs.html)`
    <section
      data-component="filters-panel"
      data-panel="filters"
      data-surface="card"
    >
      <h2>${(0, _indexJs2.t)(language, "sections.filtersSorting")}</h2>
      <form data-slot="form" @submit=${handleFiltersSubmit}>
        <label data-field>
          <span>${(0, _indexJs2.t)(language, "fields.search")}</span>
          <input
            model=${(0, _indexJs1.storeModel)("filters.search")}
            placeholder=${(0, _indexJs2.t)(language, "placeholders.search")}
          />
        </label>
        <section data-layout="pair-grid" data-slot="primary-filters">
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.status")}</span>
            <select model=${(0, _indexJs1.storeModel)("filters.status", {
        event: "change"
    })}>
              ${(0, _indexJs1.statusOptions)()}
            </select>
          </label>
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.category")}</span>
            <select
              model=${(0, _indexJs1.storeModel)("filters.category", {
        event: "change"
    })}
            >
              ${(0, _indexJs1.categoryFilterOptions)()}
            </select>
          </label>
        </section>
        <section data-layout="pair-grid" data-slot="secondary-filters">
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.priority")}</span>
            <select
              model=${(0, _indexJs1.storeModel)("filters.priority", {
        event: "change"
    })}
            >
              ${(0, _indexJs1.priorityFilterOptions)()}
            </select>
          </label>
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.sortBy")}</span>
            <select model=${(0, _indexJs1.storeModel)("filters.sortBy", {
        event: "change"
    })}>
              ${(0, _indexJs1.sortByOptions)()}
            </select>
          </label>
        </section>
        <label data-field>
          <span>${(0, _indexJs2.t)(language, "fields.direction")}</span>
          <select model=${(0, _indexJs1.storeModel)("filters.sortDir", {
        event: "change"
    })}>
            ${(0, _indexJs1.directionOptions)()}
          </select>
        </label>
      </form>
    </section>
  `;
}

},{"./_Filters.css":"dRZky","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"dRZky":[function() {},{}],"k0vrQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "statsRow", ()=>(0, _statsRowJs.statsRow));
var _statsRowJs = require("./_StatsRow.js");

},{"./_StatsRow.js":"b05yD","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"b05yD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the summary stat cards above the workspace grid.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "statsRow", ()=>statsRow);
var _statsRowCss = require("./_StatsRow.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/helpers/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
function statsRow() {
    const language = (0, _indexJs3.store).state.preferences.language;
    return (0, _indexJs.html)`
    <section
      aria-label=${(0, _indexJs2.t)(language, "sections.overview")}
      data-component="stats-row"
    >
      <ul data-list-reset data-slot="items">
        ${(0, _indexJs1.statCard)((0, _indexJs3.totalCount), (0, _indexJs2.t)(language, "stats.total"))}
        ${(0, _indexJs1.statCard)((0, _indexJs3.openCount), (0, _indexJs2.t)(language, "stats.open"))}
        ${(0, _indexJs1.statCard)((0, _indexJs3.completedCount), (0, _indexJs2.t)(language, "stats.done"))}
        ${(0, _indexJs1.statCard)((0, _indexJs3.visibleCount), (0, _indexJs2.t)(language, "stats.visible"))}
        ${(0, _indexJs1.statCard)((0, _indexJs3.selectedCount), (0, _indexJs2.t)(language, "stats.selected"))}
      </ul>
    </section>
  `;
}

},{"./_StatsRow.css":"4jmnz","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"4jmnz":[function() {},{}],"jycQm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "todoListPanel", ()=>(0, _todoListJs.todoListPanel));
var _todoListJs = require("./_TodoList.js");

},{"./_TodoList.js":"gsjFT","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"gsjFT":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the central todo list and its live visibility label.
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "todoListPanel", ()=>todoListPanel);
var _todoListCss = require("./_TodoList.css");
var _indexJs = require("@/components/TodoItem/index.js");
var _indexJs1 = require("@/core/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
function todoListPanel() {
    const language = (0, _indexJs3.store).state.preferences.language;
    return (0, _indexJs1.html)`
    <section data-component="todo-list-panel">
      <header data-slot="header">
        <h2>${(0, _indexJs2.t)(language, "sections.reactiveList")}</h2>
        <p data-slot="summary">${0, _indexJs3.visibleLabel}</p>
      </header>
      <ol data-list-reset data-slot="items">
        ${(0, _indexJs1.repeat)((0, _indexJs3.visibleTodos), (todo)=>`${todo.id}:${language}`, (0, _indexJs.todoItem))}
      </ol>
    </section>
  `;
}

},{"./_TodoList.css":"3pF3L","@/components/TodoItem/index.js":"2Lvoo","@/core/index.js":"12Zhm","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"3pF3L":[function() {},{}],"2Lvoo":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "todoItem", ()=>(0, _todoItemJs.todoItem));
var _todoItemJs = require("./_TodoItem.js");

},{"./_TodoItem.js":"3DoNx","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"3DoNx":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/** @typedef {import("../../data/_data.js").TodoItem} TodoItem */ /**
 * Renders a single todo card with inline editors and bulk selection controls.
 * @param {TodoItem} todo
 * @returns {ReturnType<typeof html>}
 */ parcelHelpers.export(exports, "todoItem", ()=>todoItem);
var _todoItemCss = require("./_TodoItem.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/helpers/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
function todoItem(todo) {
    const language = (0, _indexJs3.store).state.preferences.language;
    return (0, _indexJs.html)`
    <li data-component="todo-entry">
      <article
        data-component="todo-item"
        data-priority=${todo.priority}
        data-state=${todo.completed ? "done" : "open"}
      >
        <header data-slot="header">
          <label data-control-group="checkline" data-slot="selection-toggle">
            <input
              model=${(0, _indexJs1.todoModel)(todo.id, "selected", {
        prop: "checked",
        event: "change"
    })}
              type="checkbox"
            />
            <span>${(0, _indexJs2.t)(language, "labels.select")}</span>
          </label>
          <label data-control-group="checkline" data-slot="completion-toggle">
            <input
              model=${(0, _indexJs1.todoModel)(todo.id, "completed", {
        prop: "checked",
        event: "change"
    })}
              type="checkbox"
            />
            <span>${(0, _indexJs2.t)(language, "labels.done")}</span>
          </label>
          <input
            aria-label=${(0, _indexJs2.t)(language, "fields.title")}
            data-slot="title"
            model=${(0, _indexJs1.todoModel)(todo.id, "title")}
          />
        </header>

        <section data-slot="meta">
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.category")}</span>
            ${(0, _indexJs1.categorySelect)((0, _indexJs1.todoModel)(todo.id, "category", {
        event: "change"
    }))}
          </label>
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.priority")}</span>
            <select
              model=${(0, _indexJs1.todoModel)(todo.id, "priority", {
        event: "change"
    })}
            >
              ${(0, _indexJs1.priorityOptions)()}
            </select>
          </label>
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.dueDate")}</span>
            <input
              model=${(0, _indexJs1.todoModel)(todo.id, "dueDate", {
        event: "change"
    })}
              type="date"
            />
          </label>
        </section>

        <label data-field data-slot="notes">
          <span>${(0, _indexJs2.t)(language, "fields.notes")}</span>
          <textarea model=${(0, _indexJs1.todoModel)(todo.id, "notes")} rows="2"></textarea>
        </label>

        <footer data-slot="footer">
          <span data-component="priority-chip" data-priority=${todo.priority}>
            ${(0, _indexJs2.optionLabel)(language, "priority", todo.priority)}
          </span>
          <button @click=${()=>(0, _indexJs3.removeTodo)(todo.id)} data-variant="danger">
            ${(0, _indexJs2.t)(language, "buttons.delete")}
          </button>
        </footer>
      </article>
    </li>
  `;
}

},{"./_TodoItem.css":"2Qp7W","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"2Qp7W":[function() {},{}],"6L1pj":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "todoModal", ()=>(0, _todoModalJs.todoModal));
var _todoModalJs = require("./_TodoModal.js");

},{"./_TodoModal.js":"ebvmi","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"ebvmi":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Renders the modal used to create a new todo from the shared draft state.
 * @returns {ReturnType<typeof html> | string}
 */ parcelHelpers.export(exports, "todoModal", ()=>todoModal);
var _todoModalCss = require("./_TodoModal.css");
var _indexJs = require("@/core/index.js");
var _indexJs1 = require("@/helpers/index.js");
var _indexJs2 = require("@/i18n/index.js");
var _indexJs3 = require("@/state/index.js");
/**
 * Handles submit from the todo modal form.
 * @param {SubmitEvent} event
 * @returns {void}
 */ function handleTodoSubmit(event) {
    event.preventDefault();
    (0, _indexJs3.addTodo)();
}
/**
 * Closes the modal when the user cancels the native dialog.
 * @param {Event} event
 * @returns {void}
 */ function handleModalCancel(event) {
    event.preventDefault();
    (0, _indexJs3.closeTodoModal)();
}
/**
 * Closes the modal when the overlay itself is clicked.
 * @param {MouseEvent} event
 * @returns {void}
 */ function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;
    (0, _indexJs3.closeTodoModal)();
}
function todoModal() {
    const modal = (0, _indexJs3.store).state.ui.todoModal;
    const language = (0, _indexJs3.store).state.preferences.language;
    if (!modal.open) return "";
    const messageId = modal.error ? "new-todo-error" : "new-todo-help";
    const feedbackState = modal.error ? "error" : "idle";
    return (0, _indexJs.html)`
    <dialog
      aria-describedby=${messageId}
      aria-labelledby="new-todo-title"
      data-component="todo-modal"
      @cancel=${handleModalCancel}
      @click=${handleBackdropClick}
      open
    >
      <article data-slot="surface" data-surface="card">
        <header data-slot="header">
          <section data-slot="copy">
            <p data-text="eyebrow">${(0, _indexJs2.t)(language, "modal.todoEyebrow")}</p>
            <h2 id="new-todo-title">${(0, _indexJs2.t)(language, "modal.todoTitle")}</h2>
            <p data-text="subcopy">${(0, _indexJs2.t)(language, "modal.todoDescription")}</p>
          </section>
        </header>

        <form data-slot="form" @submit=${handleTodoSubmit}>
          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.title")}</span>
            <input
              aria-describedby=${messageId}
              aria-invalid=${String(Boolean(modal.error))}
              autofocus
              model=${(0, _indexJs1.storeModel)("draft.title")}
              placeholder=${(0, _indexJs2.t)(language, "placeholders.todoTitle")}
            />
          </label>

          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.notes")}</span>
            <textarea model=${(0, _indexJs1.storeModel)("draft.notes")} rows="4"></textarea>
          </label>

          <section data-layout="pair-grid" data-slot="meta">
            <label data-field>
              <span>${(0, _indexJs2.t)(language, "fields.category")}</span>
              ${(0, _indexJs1.categorySelect)((0, _indexJs1.storeModel)("draft.category", {
        event: "change"
    }))}
            </label>
            <label data-field>
              <span>${(0, _indexJs2.t)(language, "fields.priority")}</span>
              <select
                model=${(0, _indexJs1.storeModel)("draft.priority", {
        event: "change"
    })}
              >
                ${(0, _indexJs1.priorityOptions)()}
              </select>
            </label>
          </section>

          <label data-field>
            <span>${(0, _indexJs2.t)(language, "fields.dueDate")}</span>
            <input
              model=${(0, _indexJs1.storeModel)("draft.dueDate", {
        event: "change"
    })}
              type="date"
            />
          </label>

          <p data-slot="feedback" data-state=${feedbackState} id=${messageId}>
            ${modal.error || (0, _indexJs2.t)(language, "modal.todoHelp")}
          </p>

          <footer data-layout="action-grid" data-slot="actions">
            <button
              data-variant="secondary"
              type="button"
              @click=${0, _indexJs3.closeTodoModal}
            >
              ${(0, _indexJs2.t)(language, "buttons.cancel")}
            </button>
            <button type="submit">${(0, _indexJs2.t)(language, "buttons.addTodo")}</button>
          </footer>
        </form>
      </article>
    </dialog>
  `;
}

},{"./_TodoModal.css":"l2day","@/core/index.js":"12Zhm","@/helpers/index.js":"cacNq","@/i18n/index.js":"4jB2J","@/state/index.js":"bQ2qF","@parcel/transformer-js/src/esmodule-helpers.js":"cIvOW"}],"l2day":[function() {},{}]},["jV4no","8JWvp"], "8JWvp", "parcelRequirea905", {})

//# sourceMappingURL=reactive-apps-without-frameworks-demo.c6396971.js.map
