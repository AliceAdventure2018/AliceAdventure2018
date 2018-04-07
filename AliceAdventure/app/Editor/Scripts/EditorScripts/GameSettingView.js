'use strict';

const {Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const View = require('./View');

// class
var GameSettingView;

// variables
GameSettingView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "GameSettingView", _height, _width, _bindElementID);

	this.vModel = null;
	
};
GameSettingView.prototype = new View();

// static
GameSettingView.NewView = function(_elementID){
	var view = new GameSettingView(_elementID);
	view.InitView();
	return view;
};

// functions
GameSettingView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
		el: '#' + this.bindElementID,
		data: {
			resolutionOptions: ['640 x 360'], 
			resolution: null,
			sceneOptions: null,
			sceneID: null,
			gridNumOptions: [0, 1, 2, 3, 4, 5],
			gridNum: null, 
		}, 
		methods:{
			
		}
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

GameSettingView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
	if (GameProperties.instance == null){
		this.vModel.resolution = null;
		this.vModel.sceneOptions = null;
		this.vModel.sceneID = null;
		this.vModel.gridNum = null;
	} else {
		this.vModel.resolution = null; // TODO
		this.vModel.sceneOptions = GameProperties.instance.sceneList;
		this.vModel.sceneID = GameProperties.instance.settings.startScene;
		this.vModel.gridNum = GameProperties.instance.settings.inventoryGridNum;
	}
}

module.exports = GameSettingView;