'use strict';

//const GameProperties = require('./GameProperties');
const Event = require('./Event');
const SceneObject = require('./SceneObject');
const View = require('./View');

// class
var GalleryView;

// variables
GalleryView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "GalleryView", _height, _width, _bindElementID);	
	this.vModel = null;
	this.objSelected = null;
};
GalleryView.prototype = new View();

GalleryView.GalleryObjects = [
	{
		index: 0, 
		src: "../../Assets/room_basic.png", 
		name: "Room"
	}, 
	{
		index: 1,
		src: "../../Assets/door.png", 
		name: "Door"
	}, 
	{
		index: 2, 
		src: "../../Assets/key.png", 
		name: "Key"
	}
];

GalleryView.NewView = function(_elementID){
	let view = new GalleryView(_elementID);
	view.InitView();
	return view;
}

// functions
GalleryView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
	  el: '#gallery-view',
	  data: {
	  	objects: GalleryView.GalleryObjects
	  }, 
	  methods: {
	  	chooseObj: (_obj)=>{
	  		this.objSelected = _obj;
	  		Event.Broadcast('add-gallery-object', this.objSelected);
	  	}
	  }
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

GalleryView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
};

module.exports = GalleryView;