'use strict';

const Debug = require('./EditorScripts/Debug');
const GameProperties = require('./EditorScripts/GameProperties');
const Event = require('./EditorScripts/Event');
const SceneObject = require('./EditorScripts/SceneObject');
const View = require('./EditorScripts/View');
const SceneView = require('./EditorScripts/SceneView');
const PropertyView = require('./EditorScripts/PropertyView');
const ObjectListView = require('./EditorScripts/ObjectListView');

var AliceEditor;

AliceEditor = (function(){
	return {
		Debug: Debug, 
		GameProperties: GameProperties, 
		Event: Event,
		SceneObject: SceneObject,
		View: View,
		SceneView: SceneView,
		PropertyView: PropertyView,
		ObjectListView: ObjectListView
	};
})();

module.exports = AliceEditor;