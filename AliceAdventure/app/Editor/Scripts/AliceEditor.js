'use strict';

const View = require('./EditorScripts/View');
const SceneView = require('./EditorScripts/SceneView');
const PropertyView = require('./EditorScripts/PropertyView');
const SceneObject = require('./EditorScripts/SceneObject');
const Debug = require('./EditorScripts/Debug');
const GameProperties = require('./EditorScripts/GameProperties');

var AliceEditor;

AliceEditor = (function(){
	return {
		GameProperties: GameProperties, 
		View: View,
		SceneView: SceneView,
		PropertyView: PropertyView,
		SceneObject: SceneObject,
		Debug: Debug
	};
})();

module.exports = AliceEditor;