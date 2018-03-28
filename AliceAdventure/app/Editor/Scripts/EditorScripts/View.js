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
View.DragInfo = {
	IEvent: 0, 
	State: 1, 
	IReaction: 3
};

View.HandleDragstart = function(ev, infoType, data){
	ev.dataTransfer.setData("text/plain", JSON.stringify({type: infoType, data: data}));
 	ev.dropEffect = "all";
};

View.HandleDragover = function(ev){
	ev.preventDefault();
};

View.HandleDrop = function(ev, infoType, operation){
	var info = JSON.parse(ev.dataTransfer.getData("text"));
	if (info.type == infoType){
		ev.preventDefault();
		if (typeof operation == "function"){
			operation(info.data);
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