'use strict';

const AliceEngine = require('../../Engine/AliceEngine');
const AliceEditor = require('../Scripts/AliceEditor');

var sceneView;

function InitSceneView(){
	sceneView = new AliceEditor.SceneView();
    sceneView.InitView(document.getElementById('scene-view'));
}

function LoadAsset(){ // test
	if (sceneView == null) return;
	sceneView.AddObject();
}