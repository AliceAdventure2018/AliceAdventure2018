'use strict';

const AliceEngine = require('../../Engine/AliceEngine');
const AliceEditor = require('../Scripts/AliceEditor');

var sceneView, propertyView, objectListView;

function InitAllViews(){
	InitSceneView();
	InitPropertyView();
	InitObjectListView();
}

function InitSceneView(){
	sceneView = new AliceEditor.SceneView();
    sceneView.InitView(document.getElementById('scene-view'));
}

function InitPropertyView(){
	propertyView = new AliceEditor.PropertyView();
	propertyView.InitView();
}

function InitObjectListView(){
	objectListView = new AliceEditor.ObjectListView();
	objectListView.InitView();
}

function LoadAsset(){ // test
	if (sceneView == null) return;
	sceneView.TestAddObject();
}
