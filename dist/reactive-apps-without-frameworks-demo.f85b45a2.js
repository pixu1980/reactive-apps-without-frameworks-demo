let e;let t=[];function a(e,a){t.push(e);try{return a()}finally{t.pop()}}class i{constructor(){this.subscribers=new Set,this.__isSignal=!0}subscribe(e){return this.subscribers.add(e),()=>this.subscribers.delete(e)}track(){let e=t[t.length-1];e&&e.addDependency(this)}notify(){for(let e of[...this.subscribers])e()}}let o=new Set,r=!1;class s{constructor(e){this.callback=e,this.dependencies=new Map,this.active=!0,this.run=this.run.bind(this),this.run()}addDependency(e){if(this.dependencies.has(e))return;let t=e.subscribe(()=>{o.add(this),!r&&(r=!0,queueMicrotask(()=>{try{for(;o.size>0;){let e=[...o];for(let t of(o.clear(),e))t.run()}}finally{r=!1}}))});this.dependencies.set(e,t)}cleanup(){for(let e of this.dependencies.values())e();this.dependencies.clear()}run(){this.active&&(this.cleanup(),a(this,()=>{this.callback()}))}stop(){this.active=!1,this.cleanup()}}let n=class extends i{constructor(e,t={}){super(),this.value=e,this.equals=t.equals??Object.is}get(){return this.track(),this.value}peek(){return this.value}set(e){return this.equals(this.value,e)||(this.value=e,this.notify()),this.value}},l=class extends i{constructor(e,t={}){super(),this.compute=e,this.equals=t.equals??Object.is,this.dependencies=new Map,this.cached=void 0,this.dirty=!0,this.recomputing=!1,this.boundInvalidate=this.invalidate.bind(this)}addDependency(e){if(this.dependencies.has(e))return;let t=e.subscribe(this.boundInvalidate);this.dependencies.set(e,t)}cleanupDependencies(){for(let e of this.dependencies.values())e();this.dependencies.clear()}invalidate(){this.dirty||(this.dirty=!0,this.notify())}evaluate(){if(!this.dirty||this.recomputing)return this.cached;this.recomputing=!0,this.cleanupDependencies();try{let e=a(this,()=>this.compute());return(this.dirty||!this.equals(this.cached,e))&&(this.cached=e),this.dirty=!1,this.cached}finally{this.recomputing=!1}}get(){return this.track(),this.evaluate()}peek(){return this.evaluate()}};function c(e){return!!(e&&"function"==typeof e.get&&e.__isSignal)}function d(e){let t=new s(e);return()=>t.stop()}function u(e){return null!==e&&"object"==typeof e}function p(e,t=new WeakMap){let a=u(e)?e.__raw??e:e;if(!u(a))return a;if(t.has(a))return t.get(a);if(a instanceof Date)return new Date(a.getTime());if(a instanceof RegExp)return new RegExp(a.source,a.flags);if(a instanceof Map){let e=new Map;for(let[i,o]of(t.set(a,e),a.entries()))e.set(p(i,t),p(o,t));return e}if(a instanceof Set){let e=new Set;for(let i of(t.set(a,e),a.values()))e.add(p(i,t));return e}if(Array.isArray(a)){let e=[];for(let i of(t.set(a,e),a))e.push(p(i,t));return e}let i={};for(let e of(t.set(a,i),Reflect.ownKeys(a))){let o=Object.getOwnPropertyDescriptor(a,e);o?.enumerable&&(i[e]=p(a[e],t))}return i}function m(e){return Array.isArray(e)?e:null==e||""===e?[]:String(e).split(".").filter(Boolean)}class g{constructor(){this.value=void 0,this.signalCleanup=null}bindSignal(e,t){this.disposeSignal(),this.signalCleanup=e.subscribe(()=>t(e.get())),t(e.get())}disposeSignal(){this.signalCleanup&&this.signalCleanup(),this.signalCleanup=null}}function h(e,t){let a=e.nextSibling;for(;a&&a!==t;){let e=a.nextSibling;a.remove(),a=e}}function f(e){return e instanceof Node?e:document.createTextNode(null==e?"":String(e))}function y(e){return e&&"string"!=typeof e&&"function"==typeof e[Symbol.iterator]}let b=Symbol("directive");function v(e,...t){return{kind:"template-result",strings:e,values:t}}function S(e,t){return{[b]:!0,name:e,payload:t}}function w(e,t){return!!(e?.[b]&&(!t||e.name===t))}function $(e){return S("model",e)}function k(e,t,a){return S("repeat",{items:e,key:t,renderItem:a})}class C extends g{constructor(e,t){super(),this.element=e,this.name=t,this.modelCleanup=null,this._modelBinding=null}disposeModel(){this.modelCleanup&&this.modelCleanup(),this.modelCleanup=null}setValue(e){if("model"===this.name&&w(e,"model")){this.commitModel(e.payload),this.value=e;return}if(c(e)){this.disposeModel(),this.bindSignal(e,e=>this.commit(e));return}this.disposeModel(),this.disposeSignal(),this.commit(e)}commit(e){null==e||!1===e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,!0===e?"":String(e))}commitModel(e){var t;let a=e.event??"input",i=e.prop??((t=this.element)instanceof HTMLInputElement&&"checkbox"===t.type?"checked":"value");if(this._modelBinding&&this._modelBinding.eventName===a&&this._modelBinding.property===i&&this._modelBinding.signal===e.signal){this._modelBinding.config=e,this._modelBinding.sync();return}this.disposeSignal(),this.disposeModel();let o={config:e,eventName:a,property:i,signal:e.signal},r=()=>{let e=o.config.get();if("checked"===i){let t=!!e;this.element.checked!==t&&(this.element.checked=t)}else{let t=e??"";if(this.element[i]===t)return;let a=document.activeElement===this.element,o="number"==typeof this.element.selectionStart&&"number"==typeof this.element.selectionEnd,r=o?this.element.selectionStart:null,s=o?this.element.selectionEnd:null;if(this.element[i]=t,a&&o&&null!==r&&null!==s){let e="string"==typeof t?t:String(t),a=Math.min(r,e.length),i=Math.min(s,e.length);this.element.setSelectionRange(a,i)}}},s=()=>{r(),this.element instanceof HTMLSelectElement&&queueMicrotask(()=>{this._modelBinding===o&&this.element.isConnected&&r()})};o.sync=r,this._modelBinding=o;let n=e=>{let t=e.currentTarget,a="checked"===i?t.checked:t[i];o.config.set(a)};(this.element.addEventListener(a,n),this.modelCleanup=()=>{this.element.removeEventListener(a,n),this._modelBinding=null},e.signal&&c(e.signal))?this.bindSignal(e.signal,s):s()}}class D extends g{constructor(e,t){super(),this.start=e,this.end=t,this.currentNode=null,this.currentTemplateInstance=null,this.repeatState=null,this.repeatPayload=null,this.repeatItemsSignal=null,this.repeatItemsCleanup=null}setValue(e){c(e)?this.bindSignal(e,e=>this.commit(e)):(this.disposeSignal(),this.commit(e))}commit(e){if(w(e,"repeat")){this.commitRepeat(e.payload),this.value=e;return}if(this.disposeRepeatItemsSignal(),this.repeatPayload=null,this.repeatState=null,e?.kind==="template-result"){this.commitTemplate(e),this.value=e;return}if(y(e)){this.currentTemplateInstance=null;let t=document.createDocumentFragment();for(let a of e)t.append(f(a));this.commitNode(t),this.value=e;return}this.currentTemplateInstance=null,this.commitNode(f(e)),this.value=e}commitNode(e){h(this.start,this.end),this.currentNode=e,this.start.parentNode.insertBefore(e,this.end)}commitTemplate(t){let a=t.strings;if(this.currentTemplateInstance?.strings===a)return void this.currentTemplateInstance.update(t.values);h(this.start,this.end);let i=new(function(){if(!e)throw Error("TemplateInstance class not registered.");return e}())(a);this.currentTemplateInstance=i,i.update(t.values),this.start.parentNode.insertBefore(i.fragment,this.end)}bindRepeatItemsSignal(e){this.repeatItemsSignal===e&&this.repeatItemsCleanup||(this.disposeRepeatItemsSignal(),this.repeatItemsSignal=e,this.repeatItemsCleanup=e.subscribe(()=>{this.start.isConnected&&this.end.isConnected?this.repeatPayload&&this.commitRepeat(this.repeatPayload):this.disposeRepeatItemsSignal()}))}disposeRepeatItemsSignal(){this.repeatItemsCleanup&&this.repeatItemsCleanup(),this.repeatItemsCleanup=null,this.repeatItemsSignal=null}commitRepeat({items:e,key:t,renderItem:a}){this.repeatPayload={items:e,key:t,renderItem:a},c(e)?this.bindRepeatItemsSignal(e):this.disposeRepeatItemsSignal();let i=c(e)?e.get():e,o=Array.isArray(i)?i:y(i)?[...i]:[],r=this.repeatState??{blocks:new Map},s=new Map,n=new Set,l=this.end;for(let e=o.length-1;e>=0;e-=1){let i=o[e],c=t(i);if(n.has(c))throw Error(`repeat() keys must be unique. Duplicate key: ${String(c)}`);n.add(c);let d=r.blocks.get(c);d?(!function(e,t,a){let i=e;for(;i&&i!==a;){if(i===t)return i.nextSibling===a;i=i.nextSibling}return!1}(d.start,d.end,l)&&function(e,t,a){let i=document.createDocumentFragment(),o=e;for(;o;){let e=o.nextSibling;if(i.append(o),o===t)break;o=e}a.parentNode.insertBefore(i,a)}(d.start,d.end,l),d.item!==i&&(d.part.setValue(a(i)),d.item=i)):((d=function(e,t){let a=document.createComment(`repeat-start:${e}`),i=document.createComment(`repeat-end:${e}`);return t.parentNode.insertBefore(a,t),t.parentNode.insertBefore(i,t),{key:e,start:a,end:i,part:new D(a,i)}}(c,l)).part.setValue(a(i)),d.item=i),s.set(c,d),l=d.start}for(let[e,t]of r.blocks.entries())s.has(e)||(h(t.start,t.end),t.start.remove(),t.end.remove());r.blocks=s,this.repeatState=r,this.currentTemplateInstance=null}}class T{constructor(e,t){this.element=e,this.name=t,this.listener=null}setValue(e){this.listener&&(this.element.removeEventListener(this.name,this.listener),this.listener=null),"function"==typeof e&&(this.listener=e,this.element.addEventListener(this.name,this.listener))}}class A extends g{constructor(e,t){super(),this.element=e,this.name=t}setValue(e){c(e)?this.bindSignal(e,e=>this.commit(e)):(this.disposeSignal(),this.commit(e))}commit(e){this.element[this.name]=e}}let M=/([.@]?[-\w:]+)\s*=\s*(?:"|'|)?$/,N=/^part:(\d+)$/,x=/^__part_(\d+)__$/,L=new WeakMap;function E(e,t){let a=[],i=e;for(;i&&i!==t;){let e=i.parentNode;if(!e)break;a.unshift(function(e){let t=0,a=e;for(;a.previousSibling;)a=a.previousSibling,t+=1;return t}(i)),i=e}return a}e=class{constructor(e){this.strings=e;let t=function(e){let t=L.get(e);if(t)return t;let a="";for(let t=0;t<e.length-1;t+=1){let i=e[t];a+=i,i.match(M)?a+=`__part_${t}__`:a+=`<!--part:${t}-->`}a+=e[e.length-1];let i=document.createElement("template");i.innerHTML=a;let o=[],r=document.createTreeWalker(i.content,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_COMMENT),s=r.nextNode();for(;s;){if(s.nodeType===Node.COMMENT_NODE){let e=s.data.match(N);e&&o.push({type:"child",index:Number(e[1]),path:E(s,i.content)}),s=r.nextNode();continue}if(s.nodeType===Node.ELEMENT_NODE)for(let e of[...s.attributes]){let t=e.value.match(x);if(!t)continue;let a=e.name,r="attribute",n=a;a.startsWith(".")?(r="property",n=a.slice(1)):a.startsWith("@")&&(r="event",n=a.slice(1)),o.push({type:r,index:Number(t[1]),name:n,rawName:a,path:E(s,i.content)})}s=r.nextNode()}return t={template:i,descriptors:o},L.set(e,t),t}(e);for(let{descriptor:e,node:a}of(this.fragment=t.template.content.cloneNode(!0),this.parts=new Map,t.descriptors.map(e=>({descriptor:e,node:function(e,t){let a=e;for(let e of t)a=a.childNodes[e];return a}(this.fragment,e.path)})))){let t;if("child"===e.type){let i=document.createComment(`start:${e.index}`),o=document.createComment(`end:${e.index}`);a.replaceWith(i,o),t=new D(i,o)}else"attribute"===e.type?(a.removeAttribute(e.rawName),t=new C(a,e.name)):"property"===e.type?(a.removeAttribute(e.rawName),t=new A(a,e.name)):"event"===e.type&&(a.removeAttribute(e.rawName),t=new T(a,e.name));t&&this.parts.set(e.index,t)}}update(e){for(let t=0;t<e.length;t+=1){let a=this.parts.get(t);a&&a.setValue(e[t])}}};let I={en:"en-GB",it:"it-IT",fr:"fr-FR",de:"de-DE",es:"es-ES"},B={en:{app:{eyebrow:"HTML state, signals, proxy store",title:"Vanilla Todo List",subcopyPrimary:"A vanilla todo demo where forms write directly into a proxy backed store.",subcopySecondary:"List updates, filters, counters, and the debug log rerender through signals and DOM parts."},buttons:{resetDemo:"Reset demo",newCategory:"New category",addTodo:"Add todo",cancel:"Cancel",createCategory:"Create category",selectVisible:"Select visible",clearSelection:"Clear selection",completeSelected:"Complete selected",reopenSelected:"Reopen selected",deleteSelected:"Delete selected",deleteCompleted:"Delete completed",delete:"Delete"},sections:{quickAdd:"Quick add",filtersSorting:"Filters and sorting",bulkActions:"Bulk actions",reactiveList:"Reactive list",overview:"Overview",debugLog:"store:change log"},fields:{colorScheme:"Color scheme",colorTheme:"Color theme",language:"Language",search:"Search",status:"Status",category:"Category",priority:"Priority",sortBy:"Sort by",direction:"Direction",title:"Title",notes:"Notes",dueDate:"Due date",name:"Name"},labels:{select:"Select",done:"Done",pauseLog:"Pause log"},stats:{total:"Total",open:"Open",done:"Done",visible:"Visible",selected:"Selected"},placeholders:{search:"Search title, notes, category...",todoTitle:"What needs to happen?",categoryName:"Research"},modal:{eyebrow:"Store driven dialog",title:"New category",description:"Add it once and every category dropdown updates on the next render cycle.",help:"Use a unique label so filters and editors stay aligned."},messages:{visibleSummary:"{count} visible item(s), sorted by {sortBy}"},errors:{emptyCategory:"Enter a category name.",duplicateCategory:"That category already exists.",missingMount:"Missing application mount node."},options:{colorScheme:{system:"System",light:"Light",dark:"Dark"},colorTheme:{amber:"Amber",cyberpunk:"Cyberpunk",wood:"Wood",sage:"Sage",rose:"Rose"},priority:{all:"All priorities",low:"Low",medium:"Medium",high:"High"},status:{all:"All",open:"Open",done:"Done"},direction:{asc:"Ascending",desc:"Descending"},sortBy:{createdAt:"Created date",title:"Title",priority:"Priority",dueDate:"Due date",category:"Category"},category:{all:"All categories"}}},it:{app:{eyebrow:"Stato HTML, segnali, proxy store",title:"Vanilla Todo List",subcopyPrimary:"Una demo todo vanilla in cui i form scrivono direttamente in uno store basato su proxy.",subcopySecondary:"Lista, filtri, contatori e log di debug si aggiornano con signals e DOM parts."},buttons:{resetDemo:"Reimposta demo",newCategory:"Nuova categoria",addTodo:"Aggiungi todo",cancel:"Annulla",createCategory:"Crea categoria",selectVisible:"Seleziona visibili",clearSelection:"Azzera selezione",completeSelected:"Completa selezionate",reopenSelected:"Riapri selezionate",deleteSelected:"Elimina selezionate",deleteCompleted:"Elimina completate",delete:"Elimina"},sections:{quickAdd:"Aggiunta rapida",filtersSorting:"Filtri e ordinamento",bulkActions:"Azioni di gruppo",reactiveList:"Lista reattiva",overview:"Panoramica",debugLog:"Log store:change"},fields:{colorScheme:"Schema colore",colorTheme:"Tema colore",language:"Lingua",search:"Cerca",status:"Stato",category:"Categoria",priority:"Priorita",sortBy:"Ordina per",direction:"Direzione",title:"Titolo",notes:"Note",dueDate:"Scadenza",name:"Nome"},labels:{select:"Seleziona",done:"Fatto",pauseLog:"Metti in pausa il log"},stats:{total:"Totali",open:"Aperte",done:"Fatte",visible:"Visibili",selected:"Selezionate"},placeholders:{search:"Cerca per titolo, note, categoria...",todoTitle:"Cosa deve succedere?",categoryName:"Ricerca"},modal:{eyebrow:"Dialog guidato dallo store",title:"Nuova categoria",description:"Aggiungila una volta e ogni menu categoria si aggiorna al ciclo di render successivo.",help:"Usa un'etichetta unica per mantenere allineati filtri ed editor."},messages:{visibleSummary:"{count} elementi visibili, ordinati per {sortBy}"},errors:{emptyCategory:"Inserisci un nome categoria.",duplicateCategory:"Questa categoria esiste gia.",missingMount:"Manca il nodo di mount dell'applicazione."},options:{colorScheme:{system:"Sistema",light:"Chiaro",dark:"Scuro"},colorTheme:{amber:"Ambra",cyberpunk:"Cyberpunk",wood:"Legno",sage:"Salvia",rose:"Rosa"},priority:{all:"Tutte le priorita",low:"Bassa",medium:"Media",high:"Alta"},status:{all:"Tutte",open:"Aperte",done:"Fatte"},direction:{asc:"Crescente",desc:"Decrescente"},sortBy:{createdAt:"Data di creazione",title:"Titolo",priority:"Priorita",dueDate:"Scadenza",category:"Categoria"},category:{all:"Tutte le categorie"}}},fr:{app:{eyebrow:"Etat HTML, signaux, proxy store",title:"Vanilla Todo List",subcopyPrimary:"Une demo todo vanilla ou les formulaires ecrivent directement dans un store base sur proxy.",subcopySecondary:"La liste, les filtres, les compteurs et le journal de debug se mettent a jour avec signals et DOM parts."},buttons:{resetDemo:"Reinitialiser la demo",newCategory:"Nouvelle categorie",addTodo:"Ajouter le todo",cancel:"Annuler",createCategory:"Creer la categorie",selectVisible:"Selectionner les visibles",clearSelection:"Effacer la selection",completeSelected:"Terminer la selection",reopenSelected:"Reouvrir la selection",deleteSelected:"Supprimer la selection",deleteCompleted:"Supprimer les termines",delete:"Supprimer"},sections:{quickAdd:"Ajout rapide",filtersSorting:"Filtres et tri",bulkActions:"Actions de groupe",reactiveList:"Liste reactive",overview:"Vue d'ensemble",debugLog:"Journal store:change"},fields:{colorScheme:"Schema de couleurs",colorTheme:"Theme couleur",language:"Langue",search:"Recherche",status:"Statut",category:"Categorie",priority:"Priorite",sortBy:"Trier par",direction:"Direction",title:"Titre",notes:"Notes",dueDate:"Date limite",name:"Nom"},labels:{select:"Selectionner",done:"Fait",pauseLog:"Mettre le journal en pause"},stats:{total:"Total",open:"Ouverts",done:"Faits",visible:"Visibles",selected:"Selectionnes"},placeholders:{search:"Rechercher dans le titre, les notes, la categorie...",todoTitle:"Que faut-il faire ?",categoryName:"Recherche"},modal:{eyebrow:"Dialogue pilote par le store",title:"Nouvelle categorie",description:"Ajoutez-la une fois et chaque menu de categorie se met a jour au prochain cycle de rendu.",help:"Utilisez un libelle unique pour garder filtres et editeurs alignes."},messages:{visibleSummary:"{count} element(s) visibles, tries par {sortBy}"},errors:{emptyCategory:"Saisissez un nom de categorie.",duplicateCategory:"Cette categorie existe deja.",missingMount:"Le noeud de montage de l'application est introuvable."},options:{colorScheme:{system:"Systeme",light:"Clair",dark:"Sombre"},colorTheme:{amber:"Ambre",cyberpunk:"Cyberpunk",wood:"Bois",sage:"Sauge",rose:"Rose"},priority:{all:"Toutes les priorites",low:"Basse",medium:"Moyenne",high:"Haute"},status:{all:"Tous",open:"Ouverts",done:"Faits"},direction:{asc:"Croissant",desc:"Decroissant"},sortBy:{createdAt:"Date de creation",title:"Titre",priority:"Priorite",dueDate:"Date limite",category:"Categorie"},category:{all:"Toutes les categories"}}},de:{app:{eyebrow:"HTML Zustand, Signale, Proxy Store",title:"Vanilla Todo List",subcopyPrimary:"Eine Vanilla Todo Demo, in der Formulare direkt in einen Proxy Store schreiben.",subcopySecondary:"Liste, Filter, Zaehler und Debug Log werden mit Signals und DOM Parts neu gerendert."},buttons:{resetDemo:"Demo zuruecksetzen",newCategory:"Neue Kategorie",addTodo:"Todo hinzufuegen",cancel:"Abbrechen",createCategory:"Kategorie erstellen",selectVisible:"Sichtbare auswaehlen",clearSelection:"Auswahl aufheben",completeSelected:"Auswahl abschliessen",reopenSelected:"Auswahl wieder oeffnen",deleteSelected:"Auswahl loeschen",deleteCompleted:"Erledigte loeschen",delete:"Loeschen"},sections:{quickAdd:"Schnell erfassen",filtersSorting:"Filter und Sortierung",bulkActions:"Sammelaktionen",reactiveList:"Reaktive Liste",overview:"Ueberblick",debugLog:"store:change Protokoll"},fields:{colorScheme:"Farbschema",colorTheme:"Farbthema",language:"Sprache",search:"Suche",status:"Status",category:"Kategorie",priority:"Prioritaet",sortBy:"Sortieren nach",direction:"Richtung",title:"Titel",notes:"Notizen",dueDate:"Faelligkeit",name:"Name"},labels:{select:"Auswaehlen",done:"Erledigt",pauseLog:"Protokoll pausieren"},stats:{total:"Gesamt",open:"Offen",done:"Erledigt",visible:"Sichtbar",selected:"Ausgewaehlt"},placeholders:{search:"Titel, Notizen, Kategorie durchsuchen...",todoTitle:"Was muss passieren?",categoryName:"Recherche"},modal:{eyebrow:"Store gesteuerter Dialog",title:"Neue Kategorie",description:"Einmal hinzufuegen und jedes Kategorie Menue aktualisiert sich im naechsten Render Zyklus.",help:"Verwende eine eindeutige Bezeichnung, damit Filter und Editoren synchron bleiben."},messages:{visibleSummary:"{count} sichtbare Eintraege, sortiert nach {sortBy}"},errors:{emptyCategory:"Gib einen Kategorienamen ein.",duplicateCategory:"Diese Kategorie existiert bereits.",missingMount:"Der Mount Knoten der Anwendung fehlt."},options:{colorScheme:{system:"System",light:"Hell",dark:"Dunkel"},colorTheme:{amber:"Bernstein",cyberpunk:"Cyberpunk",wood:"Holz",sage:"Salbei",rose:"Rosa"},priority:{all:"Alle Prioritaeten",low:"Niedrig",medium:"Mittel",high:"Hoch"},status:{all:"Alle",open:"Offen",done:"Erledigt"},direction:{asc:"Aufsteigend",desc:"Absteigend"},sortBy:{createdAt:"Erstellt am",title:"Titel",priority:"Prioritaet",dueDate:"Faelligkeit",category:"Kategorie"},category:{all:"Alle Kategorien"}}},es:{app:{eyebrow:"Estado HTML, senales, proxy store",title:"Vanilla Todo List",subcopyPrimary:"Una demo todo vanilla donde los formularios escriben directamente en un store basado en proxy.",subcopySecondary:"La lista, los filtros, los contadores y el log de depuracion se actualizan con signals y DOM parts."},buttons:{resetDemo:"Reiniciar demo",newCategory:"Nueva categoria",addTodo:"Anadir todo",cancel:"Cancelar",createCategory:"Crear categoria",selectVisible:"Seleccionar visibles",clearSelection:"Limpiar seleccion",completeSelected:"Completar seleccionadas",reopenSelected:"Reabrir seleccionadas",deleteSelected:"Eliminar seleccionadas",deleteCompleted:"Eliminar completadas",delete:"Eliminar"},sections:{quickAdd:"Alta rapida",filtersSorting:"Filtros y orden",bulkActions:"Acciones masivas",reactiveList:"Lista reactiva",overview:"Resumen",debugLog:"Log store:change"},fields:{colorScheme:"Esquema de color",colorTheme:"Tema de color",language:"Idioma",search:"Buscar",status:"Estado",category:"Categoria",priority:"Prioridad",sortBy:"Ordenar por",direction:"Direccion",title:"Titulo",notes:"Notas",dueDate:"Fecha limite",name:"Nombre"},labels:{select:"Seleccionar",done:"Hecho",pauseLog:"Pausar log"},stats:{total:"Total",open:"Abiertas",done:"Hechas",visible:"Visibles",selected:"Seleccionadas"},placeholders:{search:"Buscar por titulo, notas, categoria...",todoTitle:"Que tiene que pasar?",categoryName:"Investigacion"},modal:{eyebrow:"Dialogo guiado por el store",title:"Nueva categoria",description:"Anadela una vez y cada menu de categoria se actualizara en el siguiente ciclo de render.",help:"Usa una etiqueta unica para mantener alineados filtros y editores."},messages:{visibleSummary:"{count} elemento(s) visibles, ordenados por {sortBy}"},errors:{emptyCategory:"Introduce un nombre de categoria.",duplicateCategory:"Esa categoria ya existe.",missingMount:"Falta el nodo de montaje de la aplicacion."},options:{colorScheme:{system:"Sistema",light:"Claro",dark:"Oscuro"},colorTheme:{amber:"Ambar",cyberpunk:"Cyberpunk",wood:"Madera",sage:"Salvia",rose:"Rosa"},priority:{all:"Todas las prioridades",low:"Baja",medium:"Media",high:"Alta"},status:{all:"Todas",open:"Abiertas",done:"Hechas"},direction:{asc:"Ascendente",desc:"Descendente"},sortBy:{createdAt:"Fecha de creacion",title:"Titulo",priority:"Prioridad",dueDate:"Fecha limite",category:"Categoria"},category:{all:"Todas las categorias"}}}},R=new Map;function P(e,t){let a=t.split("."),i=e;for(let e of a){if("object"!=typeof i||null===i)return;i=i[e]}return"string"==typeof i?i:void 0}function _(e,t,a={}){var i;return i=P(B[e]??B.en,t)??P(B.en,t)??t,i.replace(/\{(\w+)\}/g,(e,t)=>String(a[t]??""))}function O(e,t,a){return _(e,`options.${t}.${a}`)}function V(){let e=Date.now();return{todos:[{id:crypto.randomUUID(),title:"Prepare the talk intro",notes:"Open with the comparison between expensive frameworks and DOM-first",category:"Talk",priority:"high",dueDate:new Date(e+864e5).toISOString().slice(0,10),completed:!1,selected:!1,createdAt:e-8e5},{id:crypto.randomUUID(),title:"Refine the keyed repeat engine",notes:"Verify node movement and cleanup of removed blocks",category:"Engine",priority:"medium",dueDate:new Date(e+1728e5).toISOString().slice(0,10),completed:!1,selected:!0,createdAt:e-6e5},{id:crypto.randomUUID(),title:"Record demo screenshot",notes:"Show the store:change event panel",category:"Assets",priority:"low",dueDate:new Date(e+2592e5).toISOString().slice(0,10),completed:!0,selected:!1,createdAt:e-4e5}],categories:["Inbox","Talk","Engine","Assets","Research"],draft:{title:"",notes:"",category:"Inbox",priority:"medium",dueDate:new Date(e+864e5).toISOString().slice(0,10)},filters:{search:"",category:"all",status:"all",priority:"all",sortBy:"createdAt",sortDir:"desc"},debug:{paused:!1,logs:[]},preferences:{colorScheme:"system",colorTheme:"amber",language:"en"},ui:{categoryModal:{open:!1,value:"",error:""}}}}let z={low:0,medium:1,high:2},F=new Map,q="reactive-apps-without-frameworks-demo-state-v1";function H(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}let U=new class{constructor(e={},t={}){this.events=t.eventsTarget??window,this.target=p(e),this.proxyCache=new WeakMap,this.state=this.createProxy(this.target,[])}createProxy(e,t){if(!u(e))return e;if(this.proxyCache.has(e))return this.proxyCache.get(e);let a=new Proxy(e,{get:(e,a,i)=>{if("__raw"===a)return e;if("__path"===a)return t;let o=Reflect.get(e,a,i);return u(o)?this.createProxy(o,[...t,a]):o},set:(e,a,i,o)=>{let r=[...t,a],s=e[a],n=p(i),l=Reflect.set(e,a,n,o);return s!==n&&this.emitChange(r,s,n),l},deleteProperty:(e,a)=>{if(!(a in e))return!0;let i=[...t,a],o=e[a],r=Reflect.deleteProperty(e,a);return this.emitChange(i,o,void 0),r}});return this.proxyCache.set(e,a),a}emitChange(e,t,a){let i=new CustomEvent("store:change",{detail:{path:m(e).join("."),oldValue:p(t),newValue:p(a)}});this.events.dispatchEvent(i)}get(e){let t=m(e),a=this.state;for(let e of t)a=a?.[e];return a}set(e,t){let a=m(e);if(!a.length)throw Error("Path is required");let i=a.pop(),o=this.state;for(let e of a)u(o[e])||(o[e]={}),o=o[e];return o[i]=t,t}update(e,t){let a=this.get(e);return this.set(e,t(a))}replace(e){let t=p(this.target);this.target=p(e),this.proxyCache=new WeakMap,this.state=this.createProxy(this.target,[]),this.emitChange([],t,this.target)}snapshot(){return p(this.target)}}(function(){let e=localStorage.getItem(q);if(!e)return V();try{return function(e){let t=V();if(!H(e))return t;let a=H(e.draft)?e.draft:{},i=H(e.filters)?e.filters:{},o=H(e.debug)?e.debug:{},r=H(e.preferences)?e.preferences:{};return{...t,...e,todos:Array.isArray(e.todos)?e.todos:t.todos,categories:Array.isArray(e.categories)?e.categories:t.categories,draft:{...t.draft,...a},filters:{...t.filters,...i},debug:{...t.debug,...o,logs:Array.isArray(o.logs)?o.logs:t.debug.logs},preferences:{...t.preferences,...r},ui:t.ui}}(JSON.parse(e))}catch{return V()}}()),j=new n(0,{equals:()=>!1}),W=!1;window.addEventListener("store:change",function(e){if(!W){let a;if(!U.state.debug.paused&&"debug.logs"!==e.detail.path){W=!0;try{var t;let a;t=e.detail,a=[{id:crypto.randomUUID(),timestamp:function(e,t=new Date){let a=I[e]??I.en,i=R.get(a);return i||(i=new Intl.DateTimeFormat(a,{hour:"2-digit",minute:"2-digit",second:"2-digit"}),R.set(a,i)),i.format(t)}(U.state.preferences.language),...t},...U.state.debug.logs].slice(0,30),U.state.debug.logs=a}finally{W=!1}}a=U.snapshot(),localStorage.setItem(q,JSON.stringify(a)),j.set(performance.now())}});let K=function(e=document.body){if("string"==typeof e){let t=document.querySelector(e);if(t instanceof HTMLElement)return t;throw Error(_(U.state.preferences.language,"errors.missingMount"))}if(e instanceof HTMLElement)return e;throw Error(_(U.state.preferences.language,"errors.missingMount"))}(document.body),J="1"===new URLSearchParams(window.location.search).get("embed");function Q(e){U.state.todos=U.state.todos.map(t=>t.selected?{...t,completed:e}:t)}function G(){U.state.todos=U.state.todos.filter(e=>!e.completed)}function Z(){U.state.todos=U.state.todos.filter(e=>!e.selected)}function X(){U.state.todos=U.state.todos.map(e=>({...e,selected:!1}))}function Y(e){U.state.ui.categoryModal={...U.state.ui.categoryModal,...e}}function ee(){U.state.ui.categoryModal={open:!0,value:"",error:""}}function et(){U.state.ui.categoryModal={open:!1,value:"",error:""}}function ea(){let{preferences:e}=U.snapshot();U.replace({...V(),preferences:{...e}}),j.set(performance.now())}let ei=new l(()=>{var e,t,a,i,o,r;let s,n,l,c,d;j.get();return e=U.state.todos,t=U.state.filters,a=U.state.preferences.language,i=function*(e,t){if("all"===t)return void(yield*e);for(let a of e)a.priority===t&&(yield a)}(function*(e,t){if("all"===t)return void(yield*e);for(let a of e)"done"===t&&a.completed&&(yield a),"open"!==t||a.completed||(yield a)}(function*(e,t){if("all"===t)return void(yield*e);for(let a of e)a.category===t&&(yield a)}(function*(e,t,a){let i=t.trim().toLowerCase();if(!i)return void(yield*e);for(let t of e){let e=O(a,"priority",t.priority);`${t.title} ${t.notes} ${t.category} ${t.priority} ${e}`.toLowerCase().includes(i)&&(yield t)}}(function*(e){for(let t of e)yield t}(e),t.search,a),t.category),t.status),t.priority),o=t.sortBy,r=t.sortDir,s="asc"===r?1:-1,n=[...i],c=I[a]??I.en,(d=F.get(c))||(d=new Intl.Collator(c,{sensitivity:"base"}),F.set(c,d)),l=d,n.sort((e,t)=>{let a=e[o],i=t[o];return("priority"===o&&(a=z[a],i=z[i]),"title"===o||"category"===o)?s*l.compare(String(a),String(i)):a===i?0:a>i?s:-s}),n}),eo=new l(()=>{j.get();let e=U.state.todos,t=0,a=0,i=0;for(let o of e)t+=1,o.completed&&(a+=1),o.selected&&(i+=1);return{total:t,completed:a,open:t-a,selected:i,visible:ei.get().length}}),er=new l(()=>(j.get(),U.state.categories));new l(()=>["all",...er.get()]);let es=new l(()=>eo.get().total),en=new l(()=>eo.get().open),el=new l(()=>eo.get().completed),ec=new l(()=>eo.get().visible),ed=new l(()=>eo.get().selected),eu=new l(()=>{var e;return e=U.state.preferences.language,_(e,"messages.visibleSummary",{count:eo.get().visible,sortBy:O(e,"sortBy",U.state.filters.sortBy)})}),ep=new l(()=>(j.get(),U.state.debug.logs)),em=["system","light","dark"],eg=["amber","cyberpunk","wood","sage","rose"],eh=["low","medium","high"],ef=["all","open","done"],ey=["asc","desc"],eb=["createdAt","title","priority","dueDate","category"],ev=[{value:"it",label:"🇮🇹 Italiano"},{value:"en",label:"🇬🇧 English"},{value:"fr",label:"🇫🇷 Français"},{value:"de",label:"🇩🇪 Deutsch"},{value:"es",label:"🇪🇸 Español"}];function eS(e){return v`${k(e,e=>e.value,e=>v`<option value=${e.value}>${e.label}</option>`)}`}function ew(){return U.state.preferences.language}function e$(e,t){return e.map(e=>({value:e,label:t(e)}))}function ek(e,t={}){return $({signal:j,get:()=>U.get(e),set:t=>U.set(e,t),...t})}function eC(e,t,a={}){return $({signal:j,get:()=>U.state.todos.find(t=>t.id===e)?.[t]??("checked"!==a.prop&&""),set:a=>(function(e,t){let a=U.state.todos.findIndex(t=>t.id===e);if(a<0)return;let i=U.state.todos[a];U.state.todos[a]={...i,...t}})(e,{[t]:a}),...a})}function eD(){let e=ew();return eS(e$(eh,t=>O(e,"priority",t)))}function eT(e){let t=er.get().map(e=>({value:e,label:e}));return v`
    <select model=${e}>
      ${eS(t)}
    </select>
  `}function eA(e,t){return v`
    <li>
      <article data-component="stat-card" data-surface="card">
        <strong>${e}</strong>
        <span>${t}</span>
      </article>
    </li>
  `}function eM(e){e.preventDefault(),function(e=U.state.ui.categoryModal.value){let t=e.trim(),a=U.state.preferences.language;t?U.state.categories.some(e=>e.toLowerCase()===t.toLowerCase())?Y({open:!0,error:_(a,"errors.duplicateCategory")}):(U.state.categories=[...U.state.categories,t],et()):Y({open:!0,error:_(a,"errors.emptyCategory")})}()}function eN(e){e.preventDefault(),et()}function ex(e){e.target===e.currentTarget&&et()}function eL(e){let t=JSON.stringify({oldValue:e.oldValue,newValue:e.newValue},null,2);return v`
    <li>
      <article data-component="debug-log-entry">
        <header data-slot="entry-header">
          <strong>${e.path||"(root)"}</strong>
          <time>${e.timestamp}</time>
        </header>
        <pre>${t}</pre>
      </article>
    </li>
  `}function eE(e){e.preventDefault()}function eI(e){let t;e.preventDefault(),(t=U.state.draft).title.trim()&&(U.state.todos=[{id:crypto.randomUUID(),title:t.title.trim(),notes:t.notes.trim(),category:t.category,priority:t.priority,dueDate:t.dueDate,completed:!1,selected:!1,createdAt:Date.now()},...U.state.todos],U.state.draft={...U.state.draft,title:"",notes:"",category:U.state.categories[0]??"Inbox",priority:"medium",dueDate:new Date(Date.now()+864e5).toISOString().slice(0,10)})}function eB(e){let t=U.state.preferences.language;return v`
    <li data-component="todo-entry">
      <article
        data-component="todo-item"
        data-priority=${e.priority}
        data-state=${e.completed?"done":"open"}
      >
        <header data-slot="header">
          <label data-control-group="checkline" data-slot="selection-toggle">
            <input
              model=${eC(e.id,"selected",{prop:"checked",event:"change"})}
              type="checkbox"
            />
            <span>${_(t,"labels.select")}</span>
          </label>
          <label data-control-group="checkline" data-slot="completion-toggle">
            <input
              model=${eC(e.id,"completed",{prop:"checked",event:"change"})}
              type="checkbox"
            />
            <span>${_(t,"labels.done")}</span>
          </label>
          <input
            aria-label=${_(t,"fields.title")}
            data-slot="title"
            model=${eC(e.id,"title")}
          />
        </header>

        <section data-slot="meta">
          <label data-field>
            <span>${_(t,"fields.category")}</span>
            ${eT(eC(e.id,"category",{event:"change"}))}
          </label>
          <label data-field>
            <span>${_(t,"fields.priority")}</span>
            <select
              model=${eC(e.id,"priority",{event:"change"})}
            >
              ${eD()}
            </select>
          </label>
          <label data-field>
            <span>${_(t,"fields.dueDate")}</span>
            <input
              model=${eC(e.id,"dueDate",{event:"change"})}
              type="date"
            />
          </label>
        </section>

        <label data-field data-slot="notes">
          <span>${_(t,"fields.notes")}</span>
          <textarea model=${eC(e.id,"notes")} rows="2"></textarea>
        </label>

        <footer data-slot="footer">
          <span data-component="priority-chip" data-priority=${e.priority}>
            ${O(t,"priority",e.priority)}
          </span>
          <button @click=${()=>{var t;return t=e.id,void(U.state.todos=U.state.todos.filter(e=>e.id!==t))}} data-variant="danger">
            ${_(t,"buttons.delete")}
          </button>
        </footer>
      </article>
    </li>
  `}document.documentElement.dataset.embed=String(J),K.dataset.appRoot="true",d(()=>{j.get(),function(){let{colorScheme:e,colorTheme:t,language:a}=U.state.preferences;document.documentElement.dataset.colorScheme=e,document.documentElement.dataset.colorTheme=t,document.documentElement.dataset.language=a,document.documentElement.lang=a}()}),d(()=>{let e,t,a,i,o,r,s,n,l,c,d,u,p;j.get(),!function(e,t){let a=t.__rootPart;if(!a){let e=document.createComment("root:start"),i=document.createComment("root:end");t.textContent="",t.append(e,i),t.__rootPart=a=new D(e,i)}a.setValue(e)}(v`
    ${(e=U.state.preferences.language,v`
    <header data-component="app-header" data-surface="card">
      <section data-slot="copy">
        <p data-text="eyebrow">${_(e,"app.eyebrow")}</p>
        <h1>${_(e,"app.title")}</h1>
        <p data-text="subcopy">${_(e,"app.subcopyPrimary")}</p>
        <p data-text="subcopy">${_(e,"app.subcopySecondary")}</p>
      </section>

      <section data-slot="toolbar">
        <menu data-list-reset data-slot="actions">
          <li>
            <button data-variant="warning" @click=${ea}>
              ${_(e,"buttons.resetDemo")}
            </button>
          </li>
          <li>
            <button data-variant="secondary" @click=${ee}>
              ${_(e,"buttons.newCategory")}
            </button>
          </li>
        </menu>

        <section data-slot="preferences">
          <label data-field>
            <span>${_(e,"fields.colorScheme")}</span>
            <select
              model=${ek("preferences.colorScheme",{event:"change"})}
            >
              ${t=ew(),eS(e$(em,e=>O(t,"colorScheme",e)))}
            </select>
          </label>

          <label data-field>
            <span>${_(e,"fields.colorTheme")}</span>
            <select
              model=${ek("preferences.colorTheme",{event:"change"})}
            >
              ${a=ew(),eS(e$(eg,e=>O(a,"colorTheme",e)))}
            </select>
          </label>

          <label data-field>
            <span>${_(e,"fields.language")}</span>
            <select
              model=${ek("preferences.language",{event:"change"})}
            >
              ${eS(ev)}
            </select>
          </label>
        </section>
      </section>
    </header>
  `)}
    <main data-component="app-shell">${(i=U.state.preferences.language,v`
    <section
      aria-label=${_(i,"sections.overview")}
      data-component="stats-row"
    >
      <ul data-list-reset data-slot="items">
        ${eA(es,_(i,"stats.total"))}
        ${eA(en,_(i,"stats.open"))}
        ${eA(el,_(i,"stats.done"))}
        ${eA(ec,_(i,"stats.visible"))}
        ${eA(ed,_(i,"stats.selected"))}
      </ul>
    </section>
  `)} ${(o=U.state.preferences.language,v`
    <section data-component="todo-list-panel">
      <header data-slot="header">
        <h2>${_(o,"sections.reactiveList")}</h2>
        <p data-slot="summary">${eu}</p>
      </header>
      <ol data-list-reset data-slot="items">
        ${k(ei,e=>`${e.id}:${o}`,eB)}
      </ol>
    </section>
  `)}</main>
    <aside data-slot="controls">
      ${(r=U.state.preferences.language,v`
    <section
      data-component="quick-add-panel"
      data-panel="quick-add"
      data-surface="card"
    >
      <h2>${_(r,"sections.quickAdd")}</h2>
      <form data-slot="form" @submit=${eI}>
        <label data-field>
          <span>${_(r,"fields.title")}</span>
          <input
            model=${ek("draft.title")}
            placeholder=${_(r,"placeholders.todoTitle")}
          />
        </label>
        <label data-field>
          <span>${_(r,"fields.notes")}</span>
          <textarea model=${ek("draft.notes")} rows="3"></textarea>
        </label>
        <section data-layout="pair-grid" data-slot="draft-meta">
          <label data-field>
            <span>${_(r,"fields.category")}</span>
            ${eT(ek("draft.category",{event:"change"}))}
          </label>
          <label data-field>
            <span>${_(r,"fields.priority")}</span>
            <select model=${ek("draft.priority",{event:"change"})}>
              ${eD()}
            </select>
          </label>
        </section>
        <label data-field>
          <span>${_(r,"fields.dueDate")}</span>
          <input
            model=${ek("draft.dueDate",{event:"change"})}
            type="date"
          />
        </label>
        <button type="submit">${_(r,"buttons.addTodo")}</button>
      </form>
    </section>
  `)} ${(s=U.state.preferences.language,v`
    <section
      data-component="filters-panel"
      data-panel="filters"
      data-surface="card"
    >
      <h2>${_(s,"sections.filtersSorting")}</h2>
      <form data-slot="form" @submit=${eE}>
        <label data-field>
          <span>${_(s,"fields.search")}</span>
          <input
            model=${ek("filters.search")}
            placeholder=${_(s,"placeholders.search")}
          />
        </label>
        <section data-layout="pair-grid" data-slot="primary-filters">
          <label data-field>
            <span>${_(s,"fields.status")}</span>
            <select model=${ek("filters.status",{event:"change"})}>
              ${n=ew(),eS(e$(ef,e=>O(n,"status",e)))}
            </select>
          </label>
          <label data-field>
            <span>${_(s,"fields.category")}</span>
            <select
              model=${ek("filters.category",{event:"change"})}
            >
              ${eS([{value:"all",label:_(ew(),"options.category.all")},...er.get().map(e=>({value:e,label:e}))])}
            </select>
          </label>
        </section>
        <section data-layout="pair-grid" data-slot="secondary-filters">
          <label data-field>
            <span>${_(s,"fields.priority")}</span>
            <select
              model=${ek("filters.priority",{event:"change"})}
            >
              ${l=ew(),eS(e$(["all",...eh],e=>O(l,"priority",e)))}
            </select>
          </label>
          <label data-field>
            <span>${_(s,"fields.sortBy")}</span>
            <select model=${ek("filters.sortBy",{event:"change"})}>
              ${c=ew(),eS(e$(eb,e=>O(c,"sortBy",e)))}
            </select>
          </label>
        </section>
        <label data-field>
          <span>${_(s,"fields.direction")}</span>
          <select model=${ek("filters.sortDir",{event:"change"})}>
            ${d=ew(),eS(e$(ey,e=>O(d,"direction",e)))}
          </select>
        </label>
      </form>
    </section>
  `)} ${(u=U.state.preferences.language,v`
    <section
      data-component="bulk-actions-panel"
      data-panel="bulk-actions"
      data-surface="card"
    >
      <h2>${_(u,"sections.bulkActions")}</h2>
      <menu data-layout="action-grid" data-list-reset data-slot="actions-grid">
        <li>
          <button @click=${()=>{let e;return e=new Set(ei.peek().map(e=>e.id)),void(U.state.todos=U.state.todos.map(t=>({...t,selected:!!e.has(t.id)||t.selected})))}}>
            ${_(u,"buttons.selectVisible")}
          </button>
        </li>
        <li>
          <button data-variant="secondary" @click=${X}>
            ${_(u,"buttons.clearSelection")}
          </button>
        </li>
        <li>
          <button @click=${()=>Q(!0)}>
            ${_(u,"buttons.completeSelected")}
          </button>
        </li>
        <li>
          <button
            data-variant="secondary"
            @click=${()=>Q(!1)}
          >
            ${_(u,"buttons.reopenSelected")}
          </button>
        </li>
        <li>
          <button data-variant="danger" @click=${Z}>
            ${_(u,"buttons.deleteSelected")}
          </button>
        </li>
        <li>
          <button data-variant="danger" @click=${G}>
            ${_(u,"buttons.deleteCompleted")}
          </button>
        </li>
      </menu>
    </section>
  `)}
    </aside>
    <aside data-slot="debug-sidebar">${(p=U.state.preferences.language,v`
    <section
      data-component="debug-panel"
      data-panel="debug-log"
      data-surface="card"
    >
      <header data-slot="header">
        <h2>${_(p,"sections.debugLog")}</h2>
        <label data-control-group="checkline" data-density="compact">
          <input
            model=${ek("debug.paused",{prop:"checked",event:"change"})}
            type="checkbox"
          />
          <span>${_(p,"labels.pauseLog")}</span>
        </label>
      </header>
      <ol data-list-reset data-slot="entries">
        ${k(ep,e=>e.id,eL)}
      </ol>
    </section>
  `)}</aside>
    ${function(){let e=U.state.ui.categoryModal,t=U.state.preferences.language;if(!e.open)return"";let a=e.error?"new-category-error":"new-category-help",i=e.error?"error":"idle";return v`
    <dialog
      aria-describedby=${a}
      aria-labelledby="new-category-title"
      data-component="category-modal"
      @cancel=${eN}
      @click=${ex}
      open
    >
      <article data-slot="surface" data-surface="card">
        <header data-slot="copy">
          <p data-text="eyebrow">${_(t,"modal.eyebrow")}</p>
          <h2 id="new-category-title">${_(t,"modal.title")}</h2>
          <p data-text="subcopy">${_(t,"modal.description")}</p>
        </header>

        <form data-slot="form" @submit=${eM}>
          <label data-field>
            <span>${_(t,"fields.name")}</span>
            <input
              aria-describedby=${a}
              aria-invalid=${String(!!e.error)}
              autofocus
              model=${ek("ui.categoryModal.value")}
              placeholder=${_(t,"placeholders.categoryName")}
            />
          </label>

          <p data-slot="feedback" data-state=${i} id=${a}>
            ${e.error||_(t,"modal.help")}
          </p>

          <footer data-layout="action-grid" data-slot="actions">
            <button
              data-variant="secondary"
              type="button"
              @click=${et}
            >
              ${_(t,"buttons.cancel")}
            </button>
            <button type="submit">
              ${_(t,"buttons.createCategory")}
            </button>
          </footer>
        </form>
      </article>
    </dialog>
  `}()}
  `,K)}),j.set(performance.now());
//# sourceMappingURL=reactive-apps-without-frameworks-demo.f85b45a2.js.map
