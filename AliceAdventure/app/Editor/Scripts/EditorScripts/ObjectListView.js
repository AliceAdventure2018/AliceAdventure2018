'use strict';

const GameProperties = require('./GameProperties');
const Event = require('./Event');
const SceneObject = require('./SceneObject');
const View = require('./View');

// class
var ObjectListView;

// variables
ObjectListView = function(_height = -1, _width = -1){
	View.call(this, "ObjectListView", _height, _width);	
	this.vModel = null;
};
ObjectListView.prototype = new View();

// functions
ObjectListView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
	  el: '#object-list-view',
	  data: {
	  	showObjectList: false, 
	    sceneList: null, 
	    objectList: null, 
	    selectedObjects: null
	  }, 
	  methods: {
	  	onSelect: function(_obj){
	  		_obj.SelectOn();
	  	}
	  }
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

ObjectListView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method

	if (GameProperties.instance == null){
		this.vModel.showObjectList = false;
		this.vModel.sceneList = null;
		this.vModel.objectList = null;
		this.vModel.selectedObjects = null;
	} else {
	  	this.vModel.showObjectList = true; 
	    this.vModel.sceneList = GameProperties.instance.sceneList; 
	    this.vModel.objectList = GameProperties.instance.objectList; 
	    this.vModel.selectedObjects = SceneObject.Selection.objects;
	}
};

module.exports = ObjectListView;