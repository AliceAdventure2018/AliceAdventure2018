'use strict';

const AliceEngine = require('../../Engine/AliceEngine');
const AliceEditor = require('../Scripts/AliceEditor');

var sceneView, propertyView;

function InitAllViews(){
	InitSceneView();
	InitPropertyView();
}

function InitSceneView(){
	sceneView = new AliceEditor.SceneView();
    sceneView.InitView(document.getElementById('scene-view'));
}

function InitPropertyView(){
	propertyView = new AliceEditor.PropertyView();
	propertyView.InitView();
}

function LoadAsset(){ // test
	if (sceneView == null) return;
	sceneView.AddObject();
}
