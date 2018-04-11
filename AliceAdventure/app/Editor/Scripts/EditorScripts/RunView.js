'use strict';

const {FS, Evnet} = require('./Utilities/Utilities');
const View = require('./View');

// class
var RunView;

// variables
RunView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "RunView", _height, _width, _bindElemetnID);
	this.vModel = null;
};
RunView.prototype = new View();

// static
RunView.NewView = function(_elementID){
	var view = new RunView(_elementID);
	view.InitView();
	return view;
};

// functions
RunView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
		el: '#' + this.bindElementID,
		data: {
			showRunView: false, 
			src: null
		}, 
		methods: {
			stop: ()=>{this.Terminate();}
		}
	});

	Event.AddListener('run-in-editor', (_path)=>{this.StartGame(_path);});
};

RunView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method
};

RunView.prototype.Start = function(_path){
	if (FS.existsSync(_path)){
		this.showRunView = true;
		this.vModel.src = _path;
	}
};

RunView.prototype.Terminate = function(){
	this.showRunView = false;
};



module.exports = RunView;