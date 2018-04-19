'use strict';

const {Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
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

GalleryView.ImageLibrary = [
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
	/*{
		index: 0, 
		src: "Assets/door.wav", 
		name: "Door"
	}, */
];

GalleryView.ImportedImages = [];

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
			images: GalleryView.ImageLibrary,
			sounds: GalleryView.SoundLibrary,
			importedImages: null,
			importedSounds: null,
		}, 
		methods: {
			imageDragstart: (ev, d)=>{View.HandleDragstart(ev, View.DragInfo.GalleryImage, d);},
			soundDragstart: (ev, d)=>{View.HandleDragstart(ev, View.DragInfo.GallerySound, d);},
			chooseObj: (_obj)=>{ this.ChooseObj(_obj); },
			setImage: (img)=>{this.SetImage(img);}
		}
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

GalleryView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method

	if (GameProperties.instance == null){
		this.vModel.importedImages = null;
		this.vModel.importedSounds = null;
	} else {
		this.vModel.importedImages = GameProperties.instance.imageList;
		this.vModel.importedSounds = GameProperties.instance.soundList;
	}
};

GalleryView.prototype.ChooseObj = function(_obj){
	this.objSelected = _obj;
	Event.Broadcast('add-gallery-object', this.objSelected);
};

GalleryView.prototype.SetImage = function(img){
	let obj = View.Selection.object;
	console.log(obj);
	if (obj == null) return;
	obj.SetSprite('../../' + img.src);
	View.Selection.selectObject(obj);
}

module.exports = GalleryView;