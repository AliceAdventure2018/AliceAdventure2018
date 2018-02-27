'use strict';

const Event = require('./Event');
const SceneObject = require('./SceneObject');
const View = require('./View');

// class
var PropertyView;

// variables
PropertyView = function(_height = -1, _width = -1){
	View.call(this, "PropertyView", _height, _width);

	this.BindObject = null;
	this.VModel = null;
	
};
PropertyView.prototype = new View();

// functions
PropertyView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.VModel = new Vue({
	  el: '#property-view',
	  data: {
	  	showProperty: false,
	  	propertyName: "",
	    bindObj: this.BindObject
	  }, 
	  methods:{
	  	addProperty: function(){
	  		this.$data.bindObj.AddUserProperty(this.$data.propertyName);
	  	}
	  }
	});
	Event.AddListener("update-selected-object", this, "UpdateSelectedObject");
	console.log("Init PropertyView finished");
};

PropertyView.prototype.SetBindObject = function(_sceneObj = null){
	this.BindObject = _sceneObj;
	if (this.BindObject == null){ // null case
		this.VModel.showProperty = false;
	} else { 
		this.VModel.showProperty = true;
		this.VModel.bindObj = this.BindObject;
	}
}

PropertyView.prototype.UpdateSelectedObject = function(){
	this.SetBindObject(SceneObject.Selection.objects[0]);
}

module.exports = PropertyView;