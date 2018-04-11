'use strict';

const {Event} = require('./Utilities/Utilities');

// class
var View;

// variables
View = function(_tag = "Untagged", _height = -1, _width = -1, _bindElementID = null){
	this.tag = _tag;
	this.height = _height;
	this.width = _width;
	this.bindElementID = _bindElementID;
};

// static
var dragData = {}; // private

View.DragInfo = {
	IEvent: 0, 
	State: 1, 
	IReaction: 3, 
	GalleryImage: 4,
	GallerySound: 5
};

View.HandleDragstart = function(ev, infoType, data){
	dragData = {type: infoType, data: data};
	//ev.dataTransfer.setData("text/plain", JSON.stringify({type: infoType, data: data}));
 	ev.dropEffect = "all";
};

View.HandleDragover = function(ev, infoType, operation){
	if (infoType == null || infoType == dragData.type){
		ev.preventDefault();
		if (typeof operation == "function"){
			operation(dragData.data);
		}
	}
};

View.HandleDrop = function(ev, infoType, operation){
	//var info = JSON.parse(ev.dataTransfer.getData("text"));
	if (infoType == dragData.type){
		ev.preventDefault();
		if (typeof operation == "function"){
			operation(dragData.data);
		}
		dragData = {};
	}
}

View.Selection = (function(){ // WORKING ON: MOVE TO GLOBAL
	var _obj = null, _scn = null;
	var _objOff = function(){
		if (_obj != null) {
			_obj.SelectOff();
			_obj = null;
		}
	};
	var _scnOff = function(){
		if (_scn != null) {
			_scn.SelectOff();
			_scn = null;
		}
	};
	var _objOn = function(obj){
		_objOff();
		_obj = obj;
		obj.SelectOn();
	};
	var _scnOn = function(scn){
		_scnOff();
		_scn = scn;
		scn.SelectOn();
	};
	return {
		object: _obj,
		scene: _scn,
		showScene: false,
		showObject: false,
		deSelect: function(){
			_objOff(); 
			_scnOff();
			this.showObject = false;
			this.showScene = false;
			Event.Broadcast("update-selection");
		},
		selectObject: function(obj){
			_objOn(obj);
			if (obj.bindScene != null) _scnOn(obj.bindScene);
			this.showObject = true;
			this.showScene = false;
			Event.Broadcast("update-selection");
		},
		selectScene: function(scn){
			_scnOn(scn);
			_objOff();
			this.showObject = false;
			this.showScene = true;
			Event.Broadcast("update-selection");
		},
	};
})();

// functions
View.prototype.InitView = function(){
	// TODO
	//console.log('Init view: ' + this.tag);
	return;
};

View.prototype.ReloadView = function(){
	// TODO
	//console.log('Reload view: ' + this.tag);
	return;
};

module.exports = View;