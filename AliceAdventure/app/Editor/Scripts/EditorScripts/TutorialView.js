'use strict';

const {IPC} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const File = require('./File');
const View = require('./View');

// class
var TutorialView; // working on this

// variables
TutorialView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "TutorialView", _height, _width, _bindElementID);
	this.vModel = null;
};
TutorialView.prototype = new View();

// static
TutorialView.NewView = function(_elementID){
	var view = new TutorialView(_elementID);
	view.InitView();
	return view;
};

// functions
TutorialView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
		el: '#' + this.bindElementID,
		data: {
			sceneList: null,
			objectList: null,
		}, 
		methods: {
			addScene: ()=>{},
			addObject: ()=>{}, 

			newProj: ()=>{File.NewEmptyProject(()=>{/*IPC.send('new-proj');*/});}, 
			openProj: ()=>{File.OpenProject(()=>{IPC.send('open-proj');});}, 
			exit: ()=>{IPC.send('exit');}
		}
	});
};

TutorialView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
	if ()
};

module.exports = TutorialView;