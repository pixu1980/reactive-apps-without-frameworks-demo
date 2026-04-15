let e;function t(e){return e&&e.__esModule?e.default:e}let a=[];function o(e,t){a.push(e);try{return t()}finally{a.pop()}}class i{constructor(){this.subscribers=new Set,this.__isSignal=!0}subscribe(e){return this.subscribers.add(e),()=>this.subscribers.delete(e)}track(){let e=a[a.length-1];e&&e.addDependency(this)}notify(){for(let e of[...this.subscribers])e()}}let r=new Set,n=!1;class s{constructor(e){this.callback=e,this.dependencies=new Map,this.active=!0,this.run=this.run.bind(this),this.run()}addDependency(e){if(this.dependencies.has(e))return;let t=e.subscribe(()=>{r.add(this),!n&&(n=!0,queueMicrotask(()=>{try{for(;r.size>0;){let e=[...r];for(let t of(r.clear(),e))t.run()}}finally{n=!1}}))});this.dependencies.set(e,t)}cleanup(){for(let e of this.dependencies.values())e();this.dependencies.clear()}run(){this.active&&(this.cleanup(),o(this,()=>{this.callback()}))}stop(){this.active=!1,this.cleanup()}}let l=class extends i{constructor(e,t={}){super(),this.value=e,this.equals=t.equals??Object.is}get(){return this.track(),this.value}peek(){return this.value}set(e){return this.equals(this.value,e)||(this.value=e,this.notify()),this.value}},d=class extends i{constructor(e,t={}){super(),this.compute=e,this.equals=t.equals??Object.is,this.dependencies=new Map,this.cached=void 0,this.dirty=!0,this.recomputing=!1,this.boundInvalidate=this.invalidate.bind(this)}addDependency(e){if(this.dependencies.has(e))return;let t=e.subscribe(this.boundInvalidate);this.dependencies.set(e,t)}cleanupDependencies(){for(let e of this.dependencies.values())e();this.dependencies.clear()}invalidate(){this.dirty||(this.dirty=!0,this.notify())}evaluate(){if(!this.dirty||this.recomputing)return this.cached;this.recomputing=!0,this.cleanupDependencies();try{let e=o(this,()=>this.compute());return(this.dirty||!this.equals(this.cached,e))&&(this.cached=e),this.dirty=!1,this.cached}finally{this.recomputing=!1}}get(){return this.track(),this.evaluate()}peek(){return this.evaluate()}};function c(e){return!!(e&&"function"==typeof e.get&&e.__isSignal)}function u(e){let t=new s(e);return()=>t.stop()}function p(e){return null!==e&&"object"==typeof e}function g(e,t=new WeakMap){let a=p(e)?e.__raw??e:e;if(!p(a))return a;if(t.has(a))return t.get(a);if(a instanceof Date)return new Date(a.getTime());if(a instanceof RegExp)return new RegExp(a.source,a.flags);if(a instanceof Map){let e=new Map;for(let[o,i]of(t.set(a,e),a.entries()))e.set(g(o,t),g(i,t));return e}if(a instanceof Set){let e=new Set;for(let o of(t.set(a,e),a.values()))e.add(g(o,t));return e}if(Array.isArray(a)){let e=[];for(let o of(t.set(a,e),a))e.push(g(o,t));return e}let o={};for(let e of(t.set(a,o),Reflect.ownKeys(a))){let i=Object.getOwnPropertyDescriptor(a,e);i?.enumerable&&(o[e]=g(a[e],t))}return o}function m(e){return Array.isArray(e)?e:null==e||""===e?[]:String(e).split(".").filter(Boolean)}class h{constructor(){this.value=void 0,this.signalCleanup=null}bindSignal(e,t){this.disposeSignal(),this.signalCleanup=e.subscribe(()=>t(e.get())),t(e.get())}disposeSignal(){this.signalCleanup&&this.signalCleanup(),this.signalCleanup=null}}function f(e,t){let a=e.nextSibling;for(;a&&a!==t;){let e=a.nextSibling;a.remove(),a=e}}function y(e){return e instanceof Node?e:document.createTextNode(null==e?"":String(e))}function b(e){return e&&"string"!=typeof e&&"function"==typeof e[Symbol.iterator]}let v=Symbol("directive");function S(e,...t){return{kind:"template-result",strings:e,values:t}}function $(e,t){return{[v]:!0,name:e,payload:t}}function w(e,t){return!!(e?.[v]&&(!t||e.name===t))}function T(e){return $("model",e)}function D(e,t,a){return $("repeat",{items:e,key:t,renderItem:a})}class C extends h{constructor(e,t){super(),this.element=e,this.name=t,this.modelCleanup=null,this._modelBinding=null}disposeModel(){this.modelCleanup&&this.modelCleanup(),this.modelCleanup=null}setValue(e){if("model"===this.name&&w(e,"model")){this.commitModel(e.payload),this.value=e;return}if(c(e)){this.disposeModel(),this.bindSignal(e,e=>this.commit(e));return}this.disposeModel(),this.disposeSignal(),this.commit(e)}commit(e){null==e||!1===e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,!0===e?"":String(e))}commitModel(e){var t;let a=e.event??"input",o=e.prop??((t=this.element)instanceof HTMLInputElement&&"checkbox"===t.type?"checked":"value");if(this._modelBinding&&this._modelBinding.eventName===a&&this._modelBinding.property===o&&this._modelBinding.signal===e.signal){this._modelBinding.config=e,this._modelBinding.sync();return}this.disposeSignal(),this.disposeModel();let i={config:e,eventName:a,property:o,signal:e.signal},r=()=>{let e=i.config.get();if("checked"===o){let t=!!e;this.element.checked!==t&&(this.element.checked=t)}else{let t=e??"";if(this.element[o]===t)return;let a=document.activeElement===this.element,i="number"==typeof this.element.selectionStart&&"number"==typeof this.element.selectionEnd,r=i?this.element.selectionStart:null,n=i?this.element.selectionEnd:null;if(this.element[o]=t,a&&i&&null!==r&&null!==n){let e="string"==typeof t?t:String(t),a=Math.min(r,e.length),o=Math.min(n,e.length);this.element.setSelectionRange(a,o)}}},n=()=>{r(),this.element instanceof HTMLSelectElement&&queueMicrotask(()=>{this._modelBinding===i&&this.element.isConnected&&r()})};i.sync=r,this._modelBinding=i;let s=e=>{let t=e.currentTarget,a="checked"===o?t.checked:t[o];i.config.set(a)};(this.element.addEventListener(a,s),this.modelCleanup=()=>{this.element.removeEventListener(a,s),this._modelBinding=null},e.signal&&c(e.signal))?this.bindSignal(e.signal,n):n()}}class k extends h{constructor(e,t){super(),this.start=e,this.end=t,this.currentNode=null,this.currentTemplateInstance=null,this.repeatState=null,this.repeatPayload=null,this.repeatItemsSignal=null,this.repeatItemsCleanup=null}setValue(e){c(e)?this.bindSignal(e,e=>this.commit(e)):(this.disposeSignal(),this.commit(e))}commit(e){if(w(e,"repeat")){this.commitRepeat(e.payload),this.value=e;return}if(this.disposeRepeatItemsSignal(),this.repeatPayload=null,this.repeatState=null,e?.kind==="template-result"){this.commitTemplate(e),this.value=e;return}if(b(e)){this.currentTemplateInstance=null;let t=document.createDocumentFragment();for(let a of e)t.append(y(a));this.commitNode(t),this.value=e;return}this.currentTemplateInstance=null,this.commitNode(y(e)),this.value=e}commitNode(e){f(this.start,this.end),this.currentNode=e,this.start.parentNode.insertBefore(e,this.end)}commitTemplate(t){let a=t.strings;if(this.currentTemplateInstance?.strings===a)return void this.currentTemplateInstance.update(t.values);f(this.start,this.end);let o=new(function(){if(!e)throw Error("TemplateInstance class not registered.");return e}())(a);this.currentTemplateInstance=o,o.update(t.values),this.start.parentNode.insertBefore(o.fragment,this.end)}bindRepeatItemsSignal(e){this.repeatItemsSignal===e&&this.repeatItemsCleanup||(this.disposeRepeatItemsSignal(),this.repeatItemsSignal=e,this.repeatItemsCleanup=e.subscribe(()=>{this.start.isConnected&&this.end.isConnected?this.repeatPayload&&this.commitRepeat(this.repeatPayload):this.disposeRepeatItemsSignal()}))}disposeRepeatItemsSignal(){this.repeatItemsCleanup&&this.repeatItemsCleanup(),this.repeatItemsCleanup=null,this.repeatItemsSignal=null}commitRepeat({items:e,key:t,renderItem:a}){this.repeatPayload={items:e,key:t,renderItem:a},c(e)?this.bindRepeatItemsSignal(e):this.disposeRepeatItemsSignal();let o=c(e)?e.get():e,i=Array.isArray(o)?o:b(o)?[...o]:[],r=this.repeatState??{blocks:new Map},n=new Map,s=new Set,l=this.end;for(let e=i.length-1;e>=0;e-=1){let o=i[e],d=t(o);if(s.has(d))throw Error(`repeat() keys must be unique. Duplicate key: ${String(d)}`);s.add(d);let c=r.blocks.get(d);c?(!function(e,t,a){let o=e;for(;o&&o!==a;){if(o===t)return o.nextSibling===a;o=o.nextSibling}return!1}(c.start,c.end,l)&&function(e,t,a){let o=document.createDocumentFragment(),i=e;for(;i;){let e=i.nextSibling;if(o.append(i),i===t)break;i=e}a.parentNode.insertBefore(o,a)}(c.start,c.end,l),c.item!==o&&(c.part.setValue(a(o)),c.item=o)):((c=function(e,t){let a=document.createComment(`repeat-start:${e}`),o=document.createComment(`repeat-end:${e}`);return t.parentNode.insertBefore(a,t),t.parentNode.insertBefore(o,t),{key:e,start:a,end:o,part:new k(a,o)}}(d,l)).part.setValue(a(o)),c.item=o),n.set(d,c),l=c.start}for(let[e,t]of r.blocks.entries())n.has(e)||(f(t.start,t.end),t.start.remove(),t.end.remove());r.blocks=n,this.repeatState=r,this.currentTemplateInstance=null}}class A{constructor(e,t){this.element=e,this.name=t,this.listener=null}setValue(e){this.listener&&(this.element.removeEventListener(this.name,this.listener),this.listener=null),"function"==typeof e&&(this.listener=e,this.element.addEventListener(this.name,this.listener))}}class N extends h{constructor(e,t){super(),this.element=e,this.name=t}setValue(e){c(e)?this.bindSignal(e,e=>this.commit(e)):(this.disposeSignal(),this.commit(e))}commit(e){this.element[this.name]=e}}let M=/([.@]?[-\w:]+)\s*=\s*(?:"|'|)?$/,E=/^part:(\d+)$/,x=/^__part_(\d+)__$/,L=new WeakMap;function I(e,t){let a=[],o=e;for(;o&&o!==t;){let e=o.parentNode;if(!e)break;a.unshift(function(e){let t=0,a=e;for(;a.previousSibling;)a=a.previousSibling,t+=1;return t}(o)),o=e}return a}e=class{constructor(e){this.strings=e;let t=function(e){let t=L.get(e);if(t)return t;let a="";for(let t=0;t<e.length-1;t+=1){let o=e[t];a+=o,o.match(M)?a+=`__part_${t}__`:a+=`<!--part:${t}-->`}a+=e[e.length-1];let o=document.createElement("template");o.innerHTML=a;let i=[],r=document.createTreeWalker(o.content,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT),n=r.nextNode();for(;n;){if(n.nodeType===Node.COMMENT_NODE){let e=n.data.match(E);e&&i.push({type:"child",index:Number(e[1]),path:I(n,o.content)}),n=r.nextNode();continue}if(n.nodeType===Node.ELEMENT_NODE)for(let e of[...n.attributes]){let t=e.value.match(x);if(!t)continue;let a=e.name,r="attribute",s=a;a.startsWith(".")?(r="property",s=a.slice(1)):a.startsWith("@")&&(r="event",s=a.slice(1)),i.push({type:r,index:Number(t[1]),name:s,rawName:a,path:I(n,o.content)})}n=r.nextNode()}return t={template:o,descriptors:i},L.set(e,t),t}(e);for(let{descriptor:e,node:a}of(this.fragment=t.template.content.cloneNode(!0),this.parts=new Map,t.descriptors.map(e=>({descriptor:e,node:function(e,t){let a=e;for(let e of t)a=a.childNodes[e];return a}(this.fragment,e.path)})))){let t;if("child"===e.type){let o=document.createComment(`start:${e.index}`),i=document.createComment(`end:${e.index}`);a.replaceWith(o,i),t=new k(o,i)}else"attribute"===e.type?(a.removeAttribute(e.rawName),t=new C(a,e.name)):"property"===e.type?(a.removeAttribute(e.rawName),t=new N(a,e.name)):"event"===e.type&&(a.removeAttribute(e.rawName),t=new A(a,e.name));t&&this.parts.set(e.index,t)}}update(e){for(let t=0;t<e.length;t+=1){let a=this.parts.get(t);a&&a.setValue(e[t])}}};var B={};B=JSON.parse('{"app":{"eyebrow":"HTML Zustand, Signale, Proxy Store","title":"Vanilla Todo List","subcopyPrimary":"Eine Vanilla Todo Demo, in der Formulare direkt in einen Proxy Store schreiben.","subcopySecondary":"Liste, Filter, Zaehler und Debug Log werden mit Signals und DOM Parts neu gerendert."},"buttons":{"resetDemo":"Demo zuruecksetzen","newTodo":"Neues Todo","newCategory":"Neue Kategorie","addTodo":"Todo hinzufuegen","cancel":"Abbrechen","createCategory":"Kategorie erstellen","selectVisible":"Sichtbare auswaehlen","clearSelection":"Auswahl aufheben","completeSelected":"Auswahl abschliessen","reopenSelected":"Auswahl wieder oeffnen","deleteSelected":"Auswahl loeschen","deleteCompleted":"Erledigte loeschen","delete":"Loeschen"},"sections":{"quickAdd":"Schnell erfassen","filtersSorting":"Filter und Sortierung","bulkActions":"Sammelaktionen","reactiveList":"Reaktive Liste","overview":"Ueberblick","debugLog":"store:change Protokoll"},"fields":{"colorScheme":"Farbschema","theme":"Thema","language":"Sprache","search":"Suche","status":"Status","category":"Kategorie","priority":"Prioritaet","sortBy":"Sortieren nach","direction":"Richtung","title":"Titel","notes":"Notizen","dueDate":"Faelligkeit","name":"Name"},"labels":{"select":"Auswaehlen","done":"Erledigt","pauseLog":"Protokoll pausieren"},"stats":{"total":"Gesamt","open":"Offen","done":"Erledigt","visible":"Sichtbar","selected":"Ausgewaehlt"},"placeholders":{"search":"Titel, Notizen, Kategorie durchsuchen...","todoTitle":"Was muss passieren?","categoryName":"Recherche"},"modal":{"eyebrow":"Store gesteuerter Dialog","title":"Neue Kategorie","description":"Einmal hinzufuegen und jedes Kategorie Menue aktualisiert sich im naechsten Render Zyklus.","help":"Verwende eine eindeutige Bezeichnung, damit Filter und Editoren synchron bleiben.","todoEyebrow":"Draft gesteuerter Dialog","todoTitle":"Neues Todo","todoDescription":"Erstelle ein neues Todo aus dem gemeinsamen Draft Zustand, ohne den aktuellen Workspace zu verlassen.","todoHelp":"Gib einen Titel ein, bevor du das Todo erstellst."},"messages":{"visibleSummary":"{count} sichtbare Eintraege, sortiert nach {sortBy}"},"errors":{"emptyCategory":"Gib einen Kategorienamen ein.","emptyTodoTitle":"Gib einen Titel fuer das Todo ein.","duplicateCategory":"Diese Kategorie existiert bereits.","missingMount":"Der Mount Knoten der Anwendung fehlt."},"options":{"colorScheme":{"system":"System","light":"Hell","dark":"Dunkel"},"theme":{"studio":"Studio","atelier":"Atelier","cabinet":"Cabinet","grove":"Grove","signal":"Signal","nocturne":"Nocturne"},"priority":{"all":"Alle Prioritaeten","low":"Niedrig","medium":"Mittel","high":"Hoch"},"status":{"all":"Alle","open":"Offen","done":"Erledigt"},"direction":{"asc":"Aufsteigend","desc":"Absteigend"},"sortBy":{"createdAt":"Erstellt am","title":"Titel","priority":"Prioritaet","dueDate":"Faelligkeit","category":"Kategorie"},"category":{"all":"Alle Kategorien"}}}');var P={};P=JSON.parse('{"app":{"eyebrow":"HTML state, signals, proxy store","title":"Vanilla Todo List","subcopyPrimary":"A vanilla todo demo where forms write directly into a proxy backed store.","subcopySecondary":"List updates, filters, counters, and the debug log rerender through signals and DOM parts."},"buttons":{"resetDemo":"Reset demo","newTodo":"New todo","newCategory":"New category","addTodo":"Add todo","cancel":"Cancel","createCategory":"Create category","selectVisible":"Select visible","clearSelection":"Clear selection","completeSelected":"Complete selected","reopenSelected":"Reopen selected","deleteSelected":"Delete selected","deleteCompleted":"Delete completed","delete":"Delete"},"sections":{"quickAdd":"Quick add","filtersSorting":"Filters and sorting","bulkActions":"Bulk actions","reactiveList":"Reactive list","overview":"Overview","debugLog":"store:change log"},"fields":{"colorScheme":"Color scheme","theme":"Theme","language":"Language","search":"Search","status":"Status","category":"Category","priority":"Priority","sortBy":"Sort by","direction":"Direction","title":"Title","notes":"Notes","dueDate":"Due date","name":"Name"},"labels":{"select":"Select","done":"Done","pauseLog":"Pause log"},"stats":{"total":"Total","open":"Open","done":"Done","visible":"Visible","selected":"Selected"},"placeholders":{"search":"Search title, notes, category...","todoTitle":"What needs to happen?","categoryName":"Research"},"modal":{"eyebrow":"Store driven dialog","title":"New category","description":"Add it once and every category dropdown updates on the next render cycle.","help":"Use a unique label so filters and editors stay aligned.","todoEyebrow":"Draft driven dialog","todoTitle":"New todo","todoDescription":"Create a new todo from the shared draft state without leaving the current workspace.","todoHelp":"A title is required before the todo can be created."},"messages":{"visibleSummary":"{count} visible item(s), sorted by {sortBy}"},"errors":{"emptyCategory":"Enter a category name.","emptyTodoTitle":"Enter a todo title.","duplicateCategory":"That category already exists.","missingMount":"Missing application mount node."},"options":{"colorScheme":{"system":"System","light":"Light","dark":"Dark"},"theme":{"studio":"Studio","atelier":"Atelier","cabinet":"Cabinet","grove":"Grove","signal":"Signal","nocturne":"Nocturne"},"priority":{"all":"All priorities","low":"Low","medium":"Medium","high":"High"},"status":{"all":"All","open":"Open","done":"Done"},"direction":{"asc":"Ascending","desc":"Descending"},"sortBy":{"createdAt":"Created date","title":"Title","priority":"Priority","dueDate":"Due date","category":"Category"},"category":{"all":"All categories"}}}');var R={};R=JSON.parse('{"app":{"eyebrow":"Estado HTML, senales, proxy store","title":"Vanilla Todo List","subcopyPrimary":"Una demo todo vanilla donde los formularios escriben directamente en un store basado en proxy.","subcopySecondary":"La lista, los filtros, los contadores y el log de depuracion se actualizan con signals y DOM parts."},"buttons":{"resetDemo":"Reiniciar demo","newTodo":"Nuevo todo","newCategory":"Nueva categoria","addTodo":"Anadir todo","cancel":"Cancelar","createCategory":"Crear categoria","selectVisible":"Seleccionar visibles","clearSelection":"Limpiar seleccion","completeSelected":"Completar seleccionadas","reopenSelected":"Reabrir seleccionadas","deleteSelected":"Eliminar seleccionadas","deleteCompleted":"Eliminar completadas","delete":"Eliminar"},"sections":{"quickAdd":"Alta rapida","filtersSorting":"Filtros y orden","bulkActions":"Acciones masivas","reactiveList":"Lista reactiva","overview":"Resumen","debugLog":"Log store:change"},"fields":{"colorScheme":"Esquema de color","theme":"Tema","language":"Idioma","search":"Buscar","status":"Estado","category":"Categoria","priority":"Prioridad","sortBy":"Ordenar por","direction":"Direccion","title":"Titulo","notes":"Notas","dueDate":"Fecha limite","name":"Nombre"},"labels":{"select":"Seleccionar","done":"Hecho","pauseLog":"Pausar log"},"stats":{"total":"Total","open":"Abiertas","done":"Hechas","visible":"Visibles","selected":"Seleccionadas"},"placeholders":{"search":"Buscar por titulo, notas, categoria...","todoTitle":"Que tiene que pasar?","categoryName":"Investigacion"},"modal":{"eyebrow":"Dialogo guiado por el store","title":"Nueva categoria","description":"Anadela una vez y cada menu de categoria se actualizara en el siguiente ciclo de render.","help":"Usa una etiqueta unica para mantener alineados filtros y editores.","todoEyebrow":"Dialogo guiado por el draft","todoTitle":"Nuevo todo","todoDescription":"Crea un nuevo todo desde el estado compartido del draft sin salir del espacio de trabajo actual.","todoHelp":"Ingresa un titulo antes de crear el todo."},"messages":{"visibleSummary":"{count} elemento(s) visibles, ordenados por {sortBy}"},"errors":{"emptyCategory":"Introduce un nombre de categoria.","emptyTodoTitle":"Introduce un titulo para el todo.","duplicateCategory":"Esa categoria ya existe.","missingMount":"Falta el nodo de montaje de la aplicacion."},"options":{"colorScheme":{"system":"Sistema","light":"Claro","dark":"Oscuro"},"theme":{"studio":"Studio","atelier":"Atelier","cabinet":"Cabinet","grove":"Grove","signal":"Signal","nocturne":"Nocturne"},"priority":{"all":"Todas las prioridades","low":"Baja","medium":"Media","high":"Alta"},"status":{"all":"Todas","open":"Abiertas","done":"Hechas"},"direction":{"asc":"Ascendente","desc":"Descendente"},"sortBy":{"createdAt":"Fecha de creacion","title":"Titulo","priority":"Prioridad","dueDate":"Fecha limite","category":"Categoria"},"category":{"all":"Todas las categorias"}}}');var O={};O=JSON.parse('{"app":{"eyebrow":"Etat HTML, signaux, proxy store","title":"Vanilla Todo List","subcopyPrimary":"Une demo todo vanilla ou les formulaires ecrivent directement dans un store base sur proxy.","subcopySecondary":"La liste, les filtres, les compteurs et le journal de debug se mettent a jour avec signals et DOM parts."},"buttons":{"resetDemo":"Reinitialiser la demo","newTodo":"Nouveau todo","newCategory":"Nouvelle categorie","addTodo":"Ajouter le todo","cancel":"Annuler","createCategory":"Creer la categorie","selectVisible":"Selectionner les visibles","clearSelection":"Effacer la selection","completeSelected":"Terminer la selection","reopenSelected":"Reouvrir la selection","deleteSelected":"Supprimer la selection","deleteCompleted":"Supprimer les termines","delete":"Supprimer"},"sections":{"quickAdd":"Ajout rapide","filtersSorting":"Filtres et tri","bulkActions":"Actions de groupe","reactiveList":"Liste reactive","overview":"Vue d\'ensemble","debugLog":"Journal store:change"},"fields":{"colorScheme":"Schema de couleurs","theme":"Theme","language":"Langue","search":"Recherche","status":"Statut","category":"Categorie","priority":"Priorite","sortBy":"Trier par","direction":"Direction","title":"Titre","notes":"Notes","dueDate":"Date limite","name":"Nom"},"labels":{"select":"Selectionner","done":"Fait","pauseLog":"Mettre le journal en pause"},"stats":{"total":"Total","open":"Ouverts","done":"Faits","visible":"Visibles","selected":"Selectionnes"},"placeholders":{"search":"Rechercher dans le titre, les notes, la categorie...","todoTitle":"Que faut-il faire ?","categoryName":"Recherche"},"modal":{"eyebrow":"Dialogue pilote par le store","title":"Nouvelle categorie","description":"Ajoutez-la une fois et chaque menu de categorie se met a jour au prochain cycle de rendu.","help":"Utilisez un libelle unique pour garder filtres et editeurs alignes.","todoEyebrow":"Dialogue pilote par le draft","todoTitle":"Nouveau todo","todoDescription":"Creez un nouveau todo depuis l\'etat partage du draft sans quitter l\'espace de travail courant.","todoHelp":"Saisissez un titre avant de creer le todo."},"messages":{"visibleSummary":"{count} element(s) visibles, tries par {sortBy}"},"errors":{"emptyCategory":"Saisissez un nom de categorie.","emptyTodoTitle":"Saisissez un titre pour le todo.","duplicateCategory":"Cette categorie existe deja.","missingMount":"Le noeud de montage de l\'application est introuvable."},"options":{"colorScheme":{"system":"Systeme","light":"Clair","dark":"Sombre"},"theme":{"studio":"Studio","atelier":"Atelier","cabinet":"Cabinet","grove":"Grove","signal":"Signal","nocturne":"Nocturne"},"priority":{"all":"Toutes les priorites","low":"Basse","medium":"Moyenne","high":"Haute"},"status":{"all":"Tous","open":"Ouverts","done":"Faits"},"direction":{"asc":"Croissant","desc":"Decroissant"},"sortBy":{"createdAt":"Date de creation","title":"Titre","priority":"Priorite","dueDate":"Date limite","category":"Categorie"},"category":{"all":"Toutes les categories"}}}');var _={};_=JSON.parse('{"app":{"eyebrow":"Stato HTML, segnali, proxy store","title":"Vanilla Todo List","subcopyPrimary":"Una demo todo vanilla in cui i form scrivono direttamente in uno store basato su proxy.","subcopySecondary":"Lista, filtri, contatori e log di debug si aggiornano con signals e DOM parts."},"buttons":{"resetDemo":"Reimposta demo","newTodo":"Nuovo todo","newCategory":"Nuova categoria","addTodo":"Aggiungi todo","cancel":"Annulla","createCategory":"Crea categoria","selectVisible":"Seleziona visibili","clearSelection":"Azzera selezione","completeSelected":"Completa selezionate","reopenSelected":"Riapri selezionate","deleteSelected":"Elimina selezionate","deleteCompleted":"Elimina completate","delete":"Elimina"},"sections":{"quickAdd":"Aggiunta rapida","filtersSorting":"Filtri e ordinamento","bulkActions":"Azioni di gruppo","reactiveList":"Lista reattiva","overview":"Panoramica","debugLog":"Log store:change"},"fields":{"colorScheme":"Schema colore","theme":"Tema","language":"Lingua","search":"Cerca","status":"Stato","category":"Categoria","priority":"Priorita","sortBy":"Ordina per","direction":"Direzione","title":"Titolo","notes":"Note","dueDate":"Scadenza","name":"Nome"},"labels":{"select":"Seleziona","done":"Fatto","pauseLog":"Metti in pausa il log"},"stats":{"total":"Totali","open":"Aperte","done":"Fatte","visible":"Visibili","selected":"Selezionate"},"placeholders":{"search":"Cerca per titolo, note, categoria...","todoTitle":"Cosa deve succedere?","categoryName":"Ricerca"},"modal":{"eyebrow":"Dialog guidato dallo store","title":"Nuova categoria","description":"Aggiungila una volta e ogni menu categoria si aggiorna al ciclo di render successivo.","help":"Usa un\'etichetta unica per mantenere allineati filtri ed editor.","todoEyebrow":"Dialog guidato dal draft","todoTitle":"Nuovo todo","todoDescription":"Crea un nuovo todo dallo stato condiviso del draft senza lasciare il workspace corrente.","todoHelp":"Inserisci un titolo prima di creare il todo."},"messages":{"visibleSummary":"{count} elementi visibili, ordinati per {sortBy}"},"errors":{"emptyCategory":"Inserisci un nome categoria.","emptyTodoTitle":"Inserisci un titolo per il todo.","duplicateCategory":"Questa categoria esiste gia.","missingMount":"Manca il nodo di mount dell\'applicazione."},"options":{"colorScheme":{"system":"Sistema","light":"Chiaro","dark":"Scuro"},"theme":{"studio":"Studio","atelier":"Atelier","cabinet":"Cabinet","grove":"Grove","signal":"Signal","nocturne":"Nocturne"},"priority":{"all":"Tutte le priorita","low":"Bassa","medium":"Media","high":"Alta"},"status":{"all":"Tutte","open":"Aperte","done":"Fatte"},"direction":{"asc":"Crescente","desc":"Decrescente"},"sortBy":{"createdAt":"Data di creazione","title":"Titolo","priority":"Priorita","dueDate":"Scadenza","category":"Categoria"},"category":{"all":"Tutte le categorie"}}}');let z={en:"en-GB",it:"it-IT",fr:"fr-FR",de:"de-DE",es:"es-ES"},V={en:t(P),it:t(_),fr:t(O),de:t(B),es:t(R)},F=new Map;function q(e,t){let a=t.split("."),o=e;for(let e of a){if("object"!=typeof o||null===o)return;o=o?.[e]}return"string"==typeof o?o:void 0}function H(e,t,a={}){var o;return o=q(V[e]??V.en,t)??q(V.en,t)??t,o.replace(/\{(\w+)\}/g,(e,t)=>String(a[t]??""))}function j(e,t,a){return H(e,`options.${t}.${a}`)}function U(){let e=Date.now();return{todos:[{id:crypto.randomUUID(),title:"Prepare the talk intro",notes:"Open with the comparison between expensive frameworks and DOM-first",category:"Talk",priority:"high",dueDate:new Date(e+864e5).toISOString().slice(0,10),completed:!1,selected:!1,createdAt:e-8e5},{id:crypto.randomUUID(),title:"Refine the keyed repeat engine",notes:"Verify node movement and cleanup of removed blocks",category:"Engine",priority:"medium",dueDate:new Date(e+1728e5).toISOString().slice(0,10),completed:!1,selected:!0,createdAt:e-6e5},{id:crypto.randomUUID(),title:"Record demo screenshot",notes:"Show the store:change event panel",category:"Assets",priority:"low",dueDate:new Date(e+2592e5).toISOString().slice(0,10),completed:!0,selected:!1,createdAt:e-4e5}],categories:["Inbox","Talk","Engine","Assets","Research"],draft:{title:"",notes:"",category:"Inbox",priority:"medium",dueDate:new Date(e+864e5).toISOString().slice(0,10)},filters:{search:"",category:"all",status:"all",priority:"all",sortBy:"createdAt",sortDir:"desc"},debug:{paused:!1,logs:[]},preferences:{colorScheme:"system",theme:"studio",language:"en"},ui:{categoryModal:{open:!1,value:"",error:""},todoModal:{open:!1,error:""}}}}let W={low:0,medium:1,high:2},K=new Map,G="reactive-apps-without-frameworks-demo-state-v1",J=new Set(["studio","atelier","cabinet","grove","signal","nocturne"]),Q={amber:"studio",cyberpunk:"signal",wood:"cabinet",sage:"grove",rose:"atelier"};function Z(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}let X=function(){let e=localStorage.getItem(G);if(!e)return U();try{return function(e){let t=U();if(!Z(e))return t;let a=Z(e.draft)?e.draft:{},o=Z(e.filters)?e.filters:{},i=Z(e.debug)?e.debug:{},{colorTheme:r,...n}=Z(e.preferences)?e.preferences:{},s=function(e,t){if("string"!=typeof e)return t;let a=Q[e]??e;return J.has(a)?a:t}(n.theme??r,t.preferences.theme);return{...t,...e,todos:Array.isArray(e.todos)?e.todos:t.todos,categories:Array.isArray(e.categories)?e.categories:t.categories,draft:{...t.draft,...a},filters:{...t.filters,...o},debug:{...t.debug,...i,logs:Array.isArray(i.logs)?i.logs:t.debug.logs},preferences:{...t.preferences,...n,theme:s},ui:t.ui}}(JSON.parse(e))}catch{return U()}}(),Y=new class{constructor(e={},t={}){this.events=t.eventsTarget??window,this.target=g(e),this.proxyCache=new WeakMap,this.state=this.createProxy(this.target,[])}createProxy(e,t){if(!p(e))return e;if(this.proxyCache.has(e))return this.proxyCache.get(e);let a=new Proxy(e,{get:(e,a,o)=>{if("__raw"===a)return e;if("__path"===a)return t;let i=Reflect.get(e,a,o);return p(i)?this.createProxy(i,[...t,a]):i},set:(e,a,o,i)=>{let r=[...t,a],n=e[a],s=g(o),l=Reflect.set(e,a,s,i);return n!==s&&this.emitChange(r,n,s),l},deleteProperty:(e,a)=>{if(!(a in e))return!0;let o=[...t,a],i=e[a],r=Reflect.deleteProperty(e,a);return this.emitChange(o,i,void 0),r}});return this.proxyCache.set(e,a),a}emitChange(e,t,a){let o=new CustomEvent("store:change",{detail:{path:m(e).join("."),oldValue:g(t),newValue:g(a)}});this.events.dispatchEvent(o)}get(e){let t=m(e),a=this.state;for(let e of t)a=a?.[e];return a}set(e,t){let a=m(e);if(!a.length)throw Error("Path is required");let o=a.pop(),i=this.state;for(let e of a)p(i[e])||(i[e]={}),i=i[e];return i[o]=t,t}update(e,t){let a=this.get(e);return this.set(e,t(a))}replace(e){let t=g(this.target);this.target=g(e),this.proxyCache=new WeakMap,this.state=this.createProxy(this.target,[]),this.emitChange([],t,this.target)}snapshot(){return g(this.target)}}(X);localStorage.setItem(G,JSON.stringify(X));let ee=new l(0,{equals:()=>!1}),et=!1;window.addEventListener("store:change",function(e){if(!et){let a;if(!Y.state.debug.paused&&"debug.logs"!==e.detail.path){et=!0;try{var t;let a;t=e.detail,a=[{id:crypto.randomUUID(),timestamp:function(e,t=new Date){let a=z[e]??z.en,o=F.get(a);return o||(o=new Intl.DateTimeFormat(a,{hour:"2-digit",minute:"2-digit",second:"2-digit"}),F.set(a,o)),o.format(t)}(Y.state.preferences.language),...t},...Y.state.debug.logs].slice(0,30),Y.state.debug.logs=a}finally{et=!1}}a=Y.snapshot(),localStorage.setItem(G,JSON.stringify(a)),ee.set(performance.now())}});let ea=function(e=document.body){if("string"==typeof e){let t=document.querySelector(e);if(t instanceof HTMLElement)return t;throw Error(H(Y.state.preferences.language,"errors.missingMount"))}if(e instanceof HTMLElement)return e;throw Error(H(Y.state.preferences.language,"errors.missingMount"))}(document.body);function eo(e){Y.state.todos=Y.state.todos.map(t=>t.selected?{...t,completed:e}:t)}function ei(){Y.state.todos=Y.state.todos.filter(e=>!e.completed)}function er(){Y.state.todos=Y.state.todos.filter(e=>!e.selected)}function en(){Y.state.todos=Y.state.todos.map(e=>({...e,selected:!1}))}function es(e){Y.state.ui.categoryModal={...Y.state.ui.categoryModal,...e}}function el(e){Y.state.ui.todoModal={...Y.state.ui.todoModal,...e}}function ed(){Y.state.ui.categoryModal={open:!0,value:"",error:""}}function ec(){Y.state.ui.categoryModal={open:!1,value:"",error:""}}function eu(){el({open:!0,error:""})}function ep(){el({open:!1,error:""})}function eg(){let{preferences:e}=Y.snapshot();Y.replace({...U(),preferences:{...e}}),ee.set(performance.now())}let em=new d(()=>{var e,t,a,o,i,r;let n,s,l,d,c;ee.get();return e=Y.state.todos,t=Y.state.filters,a=Y.state.preferences.language,o=function*(e,t){if("all"===t)return void(yield*e);for(let a of e)a.priority===t&&(yield a)}(function*(e,t){if("all"===t)return void(yield*e);for(let a of e){let e="done"===t&&a.completed,o="open"===t&&!a.completed;(e||o)&&(yield a)}}(function*(e,t){if("all"===t)return void(yield*e);for(let a of e)a.category===t&&(yield a)}(function*(e,t,a){let o=t.trim().toLowerCase();if(!o)return void(yield*e);for(let t of e){let e=j(a,"priority",t.priority);`${t.title} ${t.notes} ${t.category} ${t.priority} ${e}`.toLowerCase().includes(o)&&(yield t)}}(function*(e){for(let t of e)yield t}(e),t.search,a),t.category),t.status),t.priority),i=t.sortBy,r=t.sortDir,n="asc"===r?1:-1,s=[...o],d=z[a]??z.en,(c=K.get(d))||(c=new Intl.Collator(d,{sensitivity:"base"}),K.set(d,c)),l=c,s.sort((e,t)=>{let a=e[i],o=t[i];return("priority"===i&&(a=W[a],o=W[o]),"title"===i||"category"===i)?n*l.compare(String(a),String(o)):a===o?0:a>o?n:-n}),s}),eh=new d(()=>{ee.get();let e=Y.state.todos,t=0,a=0,o=0;for(let i of e)t+=1,i.completed&&(a+=1),i.selected&&(o+=1);return{total:t,completed:a,open:t-a,selected:o,visible:em.get().length}}),ef=new d(()=>(ee.get(),Y.state.categories));new d(()=>["all",...ef.get()]);let ey=new d(()=>eh.get().total),eb=new d(()=>eh.get().open),ev=new d(()=>eh.get().completed),eS=new d(()=>eh.get().visible),e$=new d(()=>eh.get().selected),ew=new d(()=>{var e;return e=Y.state.preferences.language,H(e,"messages.visibleSummary",{count:eh.get().visible,sortBy:j(e,"sortBy",Y.state.filters.sortBy)})}),eT=new d(()=>(ee.get(),Y.state.debug.logs)),eD=["system","light","dark"],eC=["studio","atelier","cabinet","grove","signal","nocturne"],ek=["low","medium","high"],eA=["all","open","done"],eN=["asc","desc"],eM=["createdAt","title","priority","dueDate","category"],eE=[{value:"it",label:"🇮🇹 Italiano"},{value:"en",label:"🇬🇧 English"},{value:"fr",label:"🇫🇷 Français"},{value:"de",label:"🇩🇪 Deutsch"},{value:"es",label:"🇪🇸 Español"}];function ex(e){return S`${D(e,e=>e.value,e=>S`<option value=${e.value}>${e.label}</option>`)}`}function eL(){return D(ef,e=>e,e=>S`<option value=${e}>${e}</option>`)}function eI(){return Y.state.preferences.language}function eB(e,t){return e.map(e=>({value:e,label:t(e)}))}function eP(e,t={}){return T({signal:ee,get:()=>Y.get(e),set:t=>Y.set(e,t),...t})}function eR(e,t,a={}){return T({signal:ee,get:()=>Y.state.todos.find(t=>t.id===e)?.[t]??("checked"!==a.prop&&""),set:a=>(function(e,t){let a=Y.state.todos.findIndex(t=>t.id===e);if(a<0)return;let o=Y.state.todos[a];Y.state.todos[a]={...o,...t}})(e,{[t]:a}),...a})}function eO(){let e=eI();return ex(eB(ek,t=>j(e,"priority",t)))}function e_(e,t={}){return S`
    <select disabled=${t.disabled} model=${e}>
      ${eL()}
    </select>
  `}function ez(e,t){return S`
    <li>
      <article data-component="stat-card" data-surface="card">
        <strong>${e}</strong>
        <span>${t}</span>
      </article>
    </li>
  `}function eV(e){e.preventDefault(),function(e=Y.state.ui.categoryModal.value){let t=e.trim(),a=Y.state.preferences.language;t?Y.state.categories.some(e=>e.toLowerCase()===t.toLowerCase())?es({open:!0,error:H(a,"errors.duplicateCategory")}):(Y.state.categories=[...Y.state.categories,t],ec()):es({open:!0,error:H(a,"errors.emptyCategory")})}()}function eF(e){e.preventDefault(),ec()}function eq(e){e.target===e.currentTarget&&ec()}function eH(e){let t=JSON.stringify({oldValue:e.oldValue,newValue:e.newValue},null,2);return S`
    <li>
      <article data-component="debug-log-entry">
        <header data-slot="entry-header">
          <strong>${e.path||"(root)"}</strong>
          <time>${e.timestamp}</time>
        </header>
        <pre>${t}</pre>
      </article>
    </li>
  `}function ej(e){e.preventDefault()}function eU(e){let t=Y.state.preferences.language,a=e.completed;return S`
    <li data-component="todo-entry">
      <article data-component="todo-item" data-priority=${e.priority} data-state=${a?"done":"open"}>
        <header data-slot="header">
          <label data-control-group="checkline" data-slot="selection-toggle">
            <input
              model=${eR(e.id,"selected",{prop:"checked",event:"change"})}
              type="checkbox"
            />
            <span>${H(t,"labels.select")}</span>
          </label>
          <label data-control-group="checkline" data-slot="completion-toggle">
            <input
              model=${eR(e.id,"completed",{prop:"checked",event:"change"})}
              type="checkbox"
            />
            <span>${H(t,"labels.done")}</span>
          </label>
          <input aria-label=${H(t,"fields.title")} aria-readonly=${String(a)} data-slot="title" model=${eR(e.id,"title")} readonly=${a} />
        </header>

        <section data-slot="meta">
          <label data-field>
            <span>${H(t,"fields.category")}</span>
            ${e_(eR(e.id,"category",{event:"change"}),{disabled:a})}
          </label>
          <label data-field>
            <span>${H(t,"fields.priority")}</span>
            <select aria-disabled=${String(a)} disabled=${a} model=${eR(e.id,"priority",{event:"change"})}>
              ${eO()}
            </select>
          </label>
          <label data-field>
            <span>${H(t,"fields.dueDate")}</span>
            <input aria-disabled=${String(a)} disabled=${a} model=${eR(e.id,"dueDate",{event:"change"})} type="date" />
          </label>
        </section>

        <label data-field data-slot="notes">
          <span>${H(t,"fields.notes")}</span>
          <textarea aria-readonly=${String(a)} model=${eR(e.id,"notes")} readonly=${a} rows="2"></textarea>
        </label>

        <footer data-slot="footer">
          <span data-component="priority-chip" data-priority=${e.priority}> ${j(t,"priority",e.priority)} </span>
          <button @click=${()=>{var t;return t=e.id,void(Y.state.todos=Y.state.todos.filter(e=>e.id!==t))}} data-variant="danger">${H(t,"buttons.delete")}</button>
        </footer>
      </article>
    </li>
  `}function eW(e){let t,a;e.preventDefault(),t=Y.state.draft,a=Y.state.preferences.language,t.title.trim()?(Y.state.todos=[{id:crypto.randomUUID(),title:t.title.trim(),notes:t.notes.trim(),category:t.category,priority:t.priority,dueDate:t.dueDate,completed:!1,selected:!1,createdAt:Date.now()},...Y.state.todos],Y.state.draft={...Y.state.draft,title:"",notes:"",category:Y.state.categories[0]??"Inbox",priority:"medium",dueDate:new Date(Date.now()+864e5).toISOString().slice(0,10)},ep()):Y.state.ui.todoModal={...Y.state.ui.todoModal,open:!0,error:H(a,"errors.emptyTodoTitle")}}function eK(e){e.preventDefault(),ep()}function eG(e){e.target===e.currentTarget&&ep()}ea.dataset.appRoot="true";let eJ=null,eQ=new ResizeObserver(()=>{eZ()});function eZ(){let e=ea.querySelector('[data-component="app-shell"]');e instanceof HTMLElement?(eJ!==e&&(eJ instanceof HTMLElement&&eQ.unobserve(eJ),eJ=e,eQ.observe(e)),ea.style.setProperty("--app-main-block-size",`${Math.ceil(e.getBoundingClientRect().height)}px`)):ea.style.removeProperty("--app-main-block-size")}u(()=>{ee.get(),function(){let{colorScheme:e,theme:t,language:a}=Y.state.preferences;document.documentElement.dataset.colorScheme=e,document.documentElement.dataset.theme=t,document.documentElement.dataset.language=a,document.documentElement.lang=a}()}),u(()=>{let e,t,a,o,i,r,n,s,l,d,c,u,p;ee.get(),!function(e,t){let a=t.__rootPart;if(!a){let e=document.createComment("root:start"),o=document.createComment("root:end");t.textContent="",t.append(e,o),t.__rootPart=a=new k(e,o)}a.setValue(e)}(S`
    ${(e=Y.state.preferences.language,S`
    <header data-component="header" data-surface="card">
      <section data-slot="copy">
        <p data-text="eyebrow">${H(e,"app.eyebrow")}</p>
        <h1>${H(e,"app.title")}</h1>
        <p data-text="subcopy">${H(e,"app.subcopyPrimary")}</p>
        <p data-text="subcopy">${H(e,"app.subcopySecondary")}</p>
      </section>

      <section data-slot="toolbar">
        <menu data-list-reset data-slot="actions">
          <li>
            <button data-variant="warning" @click=${eg}>${H(e,"buttons.resetDemo")}</button>
          </li>
          <li>
            <button @click=${eu}>${H(e,"buttons.newTodo")}</button>
          </li>
          <li>
            <button data-variant="secondary" @click=${ed}>${H(e,"buttons.newCategory")}</button>
          </li>
        </menu>

        <section data-slot="preferences">
          <label data-field>
            <span>${H(e,"fields.colorScheme")}</span>
            <select
              model=${eP("preferences.colorScheme",{event:"change"})}
            >
              ${t=eI(),ex(eB(eD,e=>j(t,"colorScheme",e)))}
            </select>
          </label>

          <label data-field>
            <span>${H(e,"fields.theme")}</span>
            <select model=${eP("preferences.theme",{event:"change"})}>
              ${a=eI(),ex(eB(eC,e=>j(a,"theme",e)))}
            </select>
          </label>

          <label data-field>
            <span>${H(e,"fields.language")}</span>
            <select model=${eP("preferences.language",{event:"change"})}>
              ${ex(eE)}
            </select>
          </label>
        </section>
      </section>
    </header>
  `)}
    <main data-component="app-shell">${(o=Y.state.preferences.language,S`
    <section aria-label=${H(o,"sections.overview")} data-component="stats-row">
      <ul data-list-reset data-slot="items">
        ${ez(ey,H(o,"stats.total"))} ${ez(eb,H(o,"stats.open"))} ${ez(ev,H(o,"stats.done"))}
        ${ez(eS,H(o,"stats.visible"))} ${ez(e$,H(o,"stats.selected"))}
      </ul>
    </section>
  `)} ${(i=Y.state.preferences.language,S`
    <section data-component="todo-list">
      <header data-slot="header">
        <h2>${H(i,"sections.reactiveList")}</h2>
        <p data-slot="summary">${ew}</p>
      </header>
      <ol data-list-reset data-slot="items">
        ${D(em,e=>`${e.id}:${i}`,eU)}
      </ol>
    </section>
  `)}</main>
    <aside data-slot="controls">${(r=Y.state.preferences.language,S`
    <section data-component="filters" data-panel="filters" data-surface="card">
      <h2>${H(r,"sections.filtersSorting")}</h2>
      <form data-slot="form" @submit=${ej}>
        <label data-field>
          <span>${H(r,"fields.search")}</span>
          <input model=${eP("filters.search")} placeholder=${H(r,"placeholders.search")} />
        </label>
        <section data-layout="pair-grid" data-slot="primary-filters">
          <label data-field>
            <span>${H(r,"fields.status")}</span>
            <select model=${eP("filters.status",{event:"change"})}>
              ${n=eI(),ex(eB(eA,e=>j(n,"status",e)))}
            </select>
          </label>
          <label data-field>
            <span>${H(r,"fields.category")}</span>
            <select model=${eP("filters.category",{event:"change"})}>
              ${s=eI(),S`
    <option value="all">${H(s,"options.category.all")}</option>
    ${eL()}
  `}
            </select>
          </label>
        </section>
        <section data-layout="pair-grid" data-slot="secondary-filters">
          <label data-field>
            <span>${H(r,"fields.priority")}</span>
            <select model=${eP("filters.priority",{event:"change"})}>
              ${l=eI(),ex(eB(["all",...ek],e=>j(l,"priority",e)))}
            </select>
          </label>
          <label data-field>
            <span>${H(r,"fields.sortBy")}</span>
            <select model=${eP("filters.sortBy",{event:"change"})}>
              ${d=eI(),ex(eB(eM,e=>j(d,"sortBy",e)))}
            </select>
          </label>
        </section>
        <label data-field>
          <span>${H(r,"fields.direction")}</span>
          <select model=${eP("filters.sortDir",{event:"change"})}>
            ${c=eI(),ex(eB(eN,e=>j(c,"direction",e)))}
          </select>
        </label>
      </form>
    </section>
  `)} ${(u=Y.state.preferences.language,S`
    <section data-component="bulk-actions" data-panel="bulk-actions" data-surface="card">
      <h2>${H(u,"sections.bulkActions")}</h2>
      <menu data-list-reset data-slot="actions-grid">
        <li>
          <button @click=${()=>{let e;return e=new Set(em.peek().map(e=>e.id)),void(Y.state.todos=Y.state.todos.map(t=>({...t,selected:e.has(t.id)||t.selected})))}}>${H(u,"buttons.selectVisible")}</button>
        </li>
        <li>
          <button data-variant="secondary" @click=${en}>${H(u,"buttons.clearSelection")}</button>
        </li>
        <li>
          <button @click=${()=>eo(!0)}>${H(u,"buttons.completeSelected")}</button>
        </li>
        <li>
          <button data-variant="secondary" @click=${()=>eo(!1)}>${H(u,"buttons.reopenSelected")}</button>
        </li>
        <li>
          <button data-variant="danger" @click=${er}>${H(u,"buttons.deleteSelected")}</button>
        </li>
        <li>
          <button data-variant="danger" @click=${ei}>${H(u,"buttons.deleteCompleted")}</button>
        </li>
      </menu>
    </section>
  `)}</aside>
    <aside data-slot="debug-sidebar">${(p=Y.state.preferences.language,S`
    <section data-component="debug-panel" data-panel="debug-log" data-surface="card">
      <header data-slot="header">
        <h2>${H(p,"sections.debugLog")}</h2>
        <label data-control-group="checkline" data-density="compact">
          <input
            model=${eP("debug.paused",{prop:"checked",event:"change"})}
            type="checkbox"
          />
          <span>${H(p,"labels.pauseLog")}</span>
        </label>
      </header>
      <ol data-list-reset data-slot="entries">
        ${D(eT,e=>e.id,eH)}
      </ol>
    </section>
  `)}</aside>
    ${function(){let e=Y.state.ui.todoModal,t=Y.state.preferences.language;if(!e.open)return"";let a=e.error?"new-todo-error":"new-todo-help",o=e.error?"error":"idle";return S`
    <dialog aria-describedby=${a} aria-labelledby="new-todo-title" data-component="todo-modal" @cancel=${eK} @click=${eG} open>
      <article data-slot="surface" data-surface="card">
        <header data-slot="header">
          <section data-slot="copy">
            <p data-text="eyebrow">${H(t,"modal.todoEyebrow")}</p>
            <h2 id="new-todo-title">${H(t,"modal.todoTitle")}</h2>
            <p data-text="subcopy">${H(t,"modal.todoDescription")}</p>
          </section>
        </header>

        <form data-slot="form" @submit=${eW}>
          <label data-field>
            <span>${H(t,"fields.title")}</span>
            <input aria-describedby=${a} aria-invalid=${String(!!e.error)} autofocus model=${eP("draft.title")} placeholder=${H(t,"placeholders.todoTitle")} />
          </label>

          <label data-field>
            <span>${H(t,"fields.notes")}</span>
            <textarea model=${eP("draft.notes")} rows="4"></textarea>
          </label>

          <section data-layout="pair-grid" data-slot="meta">
            <label data-field>
              <span>${H(t,"fields.category")}</span>
              ${e_(eP("draft.category",{event:"change"}))}
            </label>
            <label data-field>
              <span>${H(t,"fields.priority")}</span>
              <select model=${eP("draft.priority",{event:"change"})}>
                ${eO()}
              </select>
            </label>
          </section>

          <label data-field>
            <span>${H(t,"fields.dueDate")}</span>
            <input model=${eP("draft.dueDate",{event:"change"})} type="date" />
          </label>

          <p data-slot="feedback" data-state=${o} id=${a}>${e.error||H(t,"modal.todoHelp")}</p>

          <footer data-layout="action-grid" data-slot="actions">
            <button data-variant="secondary" type="button" @click=${ep}>${H(t,"buttons.cancel")}</button>
            <button type="submit">${H(t,"buttons.addTodo")}</button>
          </footer>
        </form>
      </article>
    </dialog>
  `}()} ${function(){let e=Y.state.ui.categoryModal,t=Y.state.preferences.language;if(!e.open)return"";let a=e.error?"new-category-error":"new-category-help",o=e.error?"error":"idle";return S`
    <dialog aria-describedby=${a} aria-labelledby="new-category-title" data-component="category-modal" @cancel=${eF} @click=${eq} open>
      <article data-slot="surface" data-surface="card">
        <header data-slot="copy">
          <p data-text="eyebrow">${H(t,"modal.eyebrow")}</p>
          <h2 id="new-category-title">${H(t,"modal.title")}</h2>
          <p data-text="subcopy">${H(t,"modal.description")}</p>
        </header>

        <form data-slot="form" @submit=${eV}>
          <label data-field>
            <span>${H(t,"fields.name")}</span>
            <input
              aria-describedby=${a}
              aria-invalid=${String(!!e.error)}
              autofocus
              model=${eP("ui.categoryModal.value")}
              placeholder=${H(t,"placeholders.categoryName")}
            />
          </label>

          <p data-slot="feedback" data-state=${o} id=${a}>${e.error||H(t,"modal.help")}</p>

          <footer data-layout="action-grid" data-slot="actions">
            <button data-variant="secondary" type="button" @click=${ec}>${H(t,"buttons.cancel")}</button>
            <button type="submit">${H(t,"buttons.createCategory")}</button>
          </footer>
        </form>
      </article>
    </dialog>
  `}()}
  `,ea),requestAnimationFrame(()=>{eZ()})}),ee.set(performance.now());