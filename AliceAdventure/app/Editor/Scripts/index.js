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
var sceneView, 
	propertyView, 
	objectListView, 
	galleryView, 
	runView, 
	interactionView, 
	iLibraryView;

function InitAllViews(){
	AliceEditor.Menu.Init();
	AliceEditor.Menu.Update();
	InitSceneView();
	InitPropertyView();
	InitObjectListView();
	InitGalleryView();
	InitRunView();
	InitInteractionView();
	InitILibraryView();
}

function InitSceneView(){
    sceneView = AliceEditor.SceneView.NewView('design-editor');
}

function InitPropertyView(){
	propertyView = AliceEditor.PropertyView.NewView('design-property');
}

function InitObjectListView(){
	objectListView = AliceEditor.ObjectListView.NewView('design-object-list');
}

function InitGalleryView(){
	galleryView = AliceEditor.GalleryView.NewView('gallery');
}

function InitRunView(){
	//runView = AliceEditor.RunView.NewView('run-view');
}

function InitInteractionView(){
  interactionView = AliceEditor.InteractionView.NewView('interaction-editor');
}

function InitILibraryView(){
  iLibraryView = AliceEditor.ILibraryView.NewView('interaction-library');
}