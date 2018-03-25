'use strict';

var AliceEditor;

AliceEditor = (function(){
	var getModule = function(name) {return require('./EditorScripts/' + name);}
	return {
		get Debug() {return getModule('Debug');}, 
		get GameProperties() {return getModule('GameProperties');}, 
		get Event() {return getModule('Event');},
		get Scene() {return getModule('Scene');},
		get SceneObject() {return getModule('SceneObject');},
		get Interaction() {return getModule('Interaction');},
		get View() {return getModule('View');},
		get RunView() {return getModule('RunView');},
		get GalleryView() {return getModule('GalleryView');}, 
		get SceneView (){return getModule('SceneView');},
		get PropertyView() {return getModule('PropertyView');},
		get ObjectListView() {return getModule('ObjectListView');},
		get InteractionView() {return getModule('InteractionView');}, 
		get File() {return getModule('File');}, 
		get Menu() {return getModule('Menu');}
	};
})();

module.exports = AliceEditor;