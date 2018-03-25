'use strict';

const GameProperties = require('./GameProperties');
const Event = require('./Event');
const SceneObject = require('./SceneObject');
const View = require('./View');

// class
var ObjectListView;

// variables
ObjectListView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "ObjectListView", _height, _width, _bindElementID);	
	this.vModel = null;
};
ObjectListView.prototype = new View();

// static
ObjectListView.NewView = function(_elementID){
	var view = new ObjectListView(_elementID);
	view.InitView();
	return view;
};

// functions
ObjectListView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
	  el: '#' + this.bindElementID,
	  data: {
	  	showObjectList: false, 
	    sceneList: null, 
	    objectList: null, 
	    selectedObjects: null
	  }, 
	  methods: {
	  	onSelect: function(_thing){
	  		_thing.SelectOn(); // work both for obj and scene
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