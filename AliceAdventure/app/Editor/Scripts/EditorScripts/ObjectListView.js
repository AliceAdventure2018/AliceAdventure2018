'use strict';

const {Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
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
	  	projectLoaded: false, 
	    sceneList: null, 
	    objectList: null, 
	  }, 
	  methods: {
	  	onObjectSelect: (obj)=>{View.Selection.selectObject(obj);}, 
	  	onSceneSelect: (scn)=>{View.Selection.selectScene(scn);}, 
	  	deleteObject: (obj)=>{View.Selection.deSelect();obj.DeleteThis();},
	  	deleteScene: (scn)=>{View.Selection.deSelect();scn.DeleteThis();},
	  }
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

ObjectListView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method

	if (GameProperties.instance == null){
		this.vModel.projectLoaded = false;
		this.vModel.sceneList = null;
		this.vModel.objectList = null;
	} else {
	  	this.vModel.projectLoaded = true; 
	    this.vModel.sceneList = GameProperties.instance.sceneList; 
	    this.vModel.objectList = GameProperties.instance.objectList; 
	}
};

module.exports = ObjectListView;