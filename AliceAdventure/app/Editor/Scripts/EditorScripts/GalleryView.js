'use strict';

const {Event} = require('./Utilities/Utilities');
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

GalleryView.PictureLibrary = [
	{
		index: 0, 
		src: "Assets/kitchen.png", 
		name: "Kitchen"
	}, 
	{
		index: 1, 
		src: "Assets/door.png", 
		name: "Door"
	}, 
	{
		index: 2,
		src: "Assets/knife.png", 
		name: "Knife"
	}, 
	{
		index: 3, 
		src: "Assets/jam.png", 
		name: "Jam"
	}, 
	{
		index: 4, 
		src: "Assets/knifewithjam.png", 
		name: "Knife with jam"
	}, 
	{
		index: 5, 
		src: "Assets/bread.png", 
		name: "Bread"
	}, 
	{
		index: 6, 
		src: "Assets/breadwithjam.png", 
		name: "Bread with jam"
	}, 
	{
		index: 7, 
		src: "Assets/cat.png", 
		name: "Cat"
	}, 
	{
		index: 8, 
		src: "Assets/room_basic.png", 
		name: "Living room"
	},
    {
		index: 9, 
		src: "Assets/win.png", 
		name: "Win"
	}
    
];

GalleryView.SoundLibrary = [
	{
		index: 0, 
		src: "Assets/door.wav", 
		name: "Door"
	}, 
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
		el: '#' + this.bindElementID,
		data: {
			pictures: GalleryView.PictureLibrary,
			sounds: GalleryView.SoundLibrary
		}, 
		methods: {
			pictureDragstart: (ev, d)=>{View.HandleDragstart(ev, View.DragInfo.GalleryPicture, d);},
			soundDragstart: (ev, d)=>{View.HandleDragstart(ev, View.DragInfo.SoundPicture, d);},
			chooseObj: (_obj)=>{ this.ChooseObj(_obj); },
		}
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

GalleryView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
};

GalleryView.prototype.ChooseObj = function(_obj){
	this.objSelected = _obj;
	Event.Broadcast('add-gallery-object', this.objSelected);
}

module.exports = GalleryView;