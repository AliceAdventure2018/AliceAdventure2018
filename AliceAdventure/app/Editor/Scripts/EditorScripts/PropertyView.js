'use strict';

const {Event} = require('./Utilities/Utilities');
const SceneObject = require('./SceneObject');
const View = require('./View');

// class
var PropertyView;

// variables
PropertyView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "PropertyView", _height, _width, _bindElementID);

	this.bindObject = null;
	this.vModel = null;
	
};
PropertyView.prototype = new View();

// static
PropertyView.NewView = function(_elementID){
	var view = new PropertyView(_elementID);
	view.InitView();
	return view;
};

// functions
PropertyView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
	  el: '#' + this.bindElementID,
	  data: {
	  	showProperty: false,
	  	propertyKey: "",
	  	propertyType: "",
	  	propertyValue: "", 
	    bindObj: this.bindObject 
	  }, 
	  methods:{
	  	addProperty: ()=>{ this.bindObject.AddUserProperty(this.vModel.propertyKey, this.vModel.propertyType, this.vModel.propertyValue); }
	  }
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
	Event.AddListener("update-selected-object", ()=>{this.UpdateSelectedObject();});
};

PropertyView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method

	this.SetBindObject(null);
}

PropertyView.prototype.SetBindObject = function(_sceneObj = null){
	this.bindObject = _sceneObj;
	if (this.bindObject == null){ // null case
		this.vModel.showProperty = false;
	} else { 
		this.vModel.showProperty = true;
		this.vModel.bindObj = this.bindObject;
	}
}

PropertyView.prototype.UpdateSelectedObject = function(){
	this.SetBindObject(SceneObject.Selection.objects[0]);
}

module.exports = PropertyView;