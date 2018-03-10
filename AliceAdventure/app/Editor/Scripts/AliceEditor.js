'use strict';

const Debug = require('./EditorScripts/Debug');
const GameProperties = require('./EditorScripts/GameProperties');
const Event = require('./EditorScripts/Event');
const SceneObject = require('./EditorScripts/SceneObject');
const Scene = require('./EditorScripts/Scene');
const View = require('./EditorScripts/View');
const GalleryView = require('./EditorScripts/GalleryView');
const SceneView = require('./EditorScripts/SceneView');
const PropertyView = require('./EditorScripts/PropertyView');
const ObjectListView = require('./EditorScripts/ObjectListView');
const File = require('./EditorScripts/File');

var AliceEditor;

AliceEditor = (function(){
	return {
		get Debug() {return Debug;}, 
		get GameProperties() {return GameProperties;}, 
		get Event() {return Event;},
		get SceneObject() {return SceneObject;},
		get Scene() {return Scene;},
		get View() {return View;},
		get GalleryView() {return GalleryView;}, 
		get SceneView (){return SceneView;},
		get PropertyView() {return PropertyView;},
		get ObjectListView() {return ObjectListView;}, 
		get File() {return File;}
	};
})();

module.exports = AliceEditor;