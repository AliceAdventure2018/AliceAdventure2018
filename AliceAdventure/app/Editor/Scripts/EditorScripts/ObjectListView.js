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
	this.VModel = null;
};
ObjectListView.prototype = new View();

// functions
ObjectListView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.VModel = new Vue({
	  el: '#object-list-view',
	  data: {
	    sceneList: GameProperties.instance.sceneList, 
	    objectList: GameProperties.instance.sceneObjectList, 
	    selectedObjects: SceneObject.Selection.objects
	  }, 
	  methods: {
	  	onSelect: function(_obj){
	  		_obj.SelectOn();
	  	}
	  }
	});
};

ObjectListView.prototype.SetBindObject = function(_sceneObj = null){
	this.BindObject = _sceneObj;
	if (this.BindObject == null){ // null case
		this.VModel.showProperty = false;
	} else { 
		this.VModel.showProperty = true;
		this.VModel.bindObj = this.BindObject;
	}
}
module.exports = ObjectListView;