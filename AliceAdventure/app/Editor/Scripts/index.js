'use strict';

const electron = require('electron').remote;
//const AliceEngine = require('../../Engine/AliceEngine');
const AliceEditor = require('../Scripts/AliceEditor');

// utilities
function isNumberOr(_value, _default){
	return (typeof _value == "number" ? _value : _default);
}

function isBooleanOr(_value, _default){
	return (typeof _value == "boolean" ? _value : _default);
}

function isStringOr(_value, _default){
	return (typeof _value == "string" ? _value : _default);
}

// variables
var sceneView, propertyView, objectListView;

function InitAllViews(){
	//AliceEditor.File.New('testFile');
	InitSceneView();
	InitPropertyView();
	InitObjectListView();
}

function InitSceneView(){
    sceneView = AliceEditor.SceneView.NewView('scene-view');
}

function InitPropertyView(){
	propertyView = new AliceEditor.PropertyView();
	propertyView.InitView();
}

function InitObjectListView(){
	objectListView = new AliceEditor.ObjectListView();
	objectListView.InitView();
}

function NewFile(){
	AliceEditor.File.NewProject();
}

function SaveFile(){
	AliceEditor.File.SaveProject();
}

function LoadFile(){
	AliceEditor.File.OpenProject();
}

function CloseFile(){
	AliceEditor.File.CloseProject();
}