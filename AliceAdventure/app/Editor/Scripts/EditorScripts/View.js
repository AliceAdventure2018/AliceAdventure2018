'use strict';

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
	GalleryPicture: 4,
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
	}
}

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