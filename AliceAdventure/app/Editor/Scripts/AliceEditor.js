'use strict';

const Debug = require('./EditorScripts/Debug');
const GameProperties = require('./EditorScripts/GameProperties');
const Event = require('./EditorScripts/Event');
const Scene = require('./EditorScripts/Scene');
const SceneObject = require('./EditorScripts/SceneObject');
const View = require('./EditorScripts/View');
const RunView = require('./EditorScripts/RunView');
const GalleryView = require('./EditorScripts/GalleryView');
const SceneView = require('./EditorScripts/SceneView');
const PropertyView = require('./EditorScripts/PropertyView');
const ObjectListView = require('./EditorScripts/ObjectListView');
const File = require('./EditorScripts/File');
const Menu = require('./EditorScripts/Menu');

var AliceEditor;

AliceEditor = (function(){
	return {
		get Debug() {return Debug;}, 
		get GameProperties() {return GameProperties;}, 
		get Event() {return Event;},
		get Scene() {return Scene;},
		get SceneObject() {return SceneObject;},
		get View() {return View;},
		get RunView() {return RunView;},
		get GalleryView() {return GalleryView;}, 
		get SceneView (){return SceneView;},
		get PropertyView() {return PropertyView;},
		get ObjectListView() {return ObjectListView;}, 
		get File() {return File;}, 
		get Menu() {return Menu;}
	};
})();

module.exports = AliceEditor;