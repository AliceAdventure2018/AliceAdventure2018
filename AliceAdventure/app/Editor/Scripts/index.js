'use strict';

const IPC = require('electron').ipcRenderer;
//const AliceEngine = require('../../Engine/AliceEngine');

let AliceEditor = require('../Scripts/AliceEditor');
// = (function(){
//	let e = require('../Scripts/AliceEditor');
//	console.log(ipcRenderer.sendSync('get-editor', e));
//	return ipcRenderer.sendSync('get-editor', e);
//})();

IPC.on('set-editor', (event, data)=>{
	AliceEditor = data;
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
}

// tutorial page
function InitTutorialPage(){
	var tutorialView = AliceEditor.TutorialView.NewView('tutorial-view');
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