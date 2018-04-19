'use strict';

const IPC = require('electron').ipcRenderer;
//const AliceEngine = require('../../Engine/AliceEngine');

let AliceEditor = require('../Scripts/AliceEditor');

IPC.on('load-file', (event, data)=>{
	AliceEditor.File.OpenFromPath(data);
});

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

// welcome page
function InitWelcomePage(){
	var welcomeView = AliceEditor.WelcomeView.NewView('welcome-view');
	return welcomeView;
}

// tutorial page
var transit; // temp
function InitTutorialPage(){
	let views = {
		tutorialView: AliceEditor.TutorialView.NewView('step_1'),
    	sceneView: AliceEditor.SceneView.NewView('design-editor'),
		galleryView: AliceEditor.GalleryView.NewView('gallery'),
		objectListView: AliceEditor.ObjectListView.NewView('object-list'),
		interactionView: AliceEditor.InteractionView.NewView('interaction-editor'),
		iLibraryView: AliceEditor.ILibraryView.NewView('interaction-library'),
	};
	transit = {
		back: ()=>{views.tutorialView.vModel.back()},
		next: ()=>{views.tutorialView.vModel.next()},
		skip: ()=>{views.tutorialView.vModel.skip()},
		finish: ()=>{views.tutorialView.vModel.finish()},
		exit: ()=>{views.tutorialView.vModel.exit()}
	}
	return views;
}

// variables
var sceneView, 
	propertyView, 
	objectListView, 
	galleryView, 
	runView, 
	interactionView, 
	iLibraryView, 
	gameSettingView;

function InitAllViews(){
	//AliceEditor.Menu.Init();
	//AliceEditor.Menu.Update();
	InitSceneView();
	InitPropertyView();
	InitObjectListView();
	InitGalleryView();
	InitRunView();
	InitInteractionView();
	InitILibraryView();
	InitGameSettingView();
}

function InitSceneView(){
    sceneView = AliceEditor.SceneView.NewView('design-editor');
}

function InitPropertyView(){
	propertyView = AliceEditor.PropertyView.NewView('design-property');
}

function InitObjectListView(){
	objectListView = AliceEditor.ObjectListView.NewView('object-list');
}

function InitGalleryView(){
	galleryView = AliceEditor.GalleryView.NewView('gallery');
}

function InitRunView(){
	runView = AliceEditor.RunView.NewView('run-view');
}

function InitInteractionView(){
  interactionView = AliceEditor.InteractionView.NewView('second-column');
}

function InitILibraryView(){
  iLibraryView = AliceEditor.ILibraryView.NewView('interaction-library');
}

function InitGameSettingView(){
	gameSettingView = AliceEditor.GameSettingView.NewView('game-setting');
}