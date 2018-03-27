'use strict';

const GameProperties = require('./GameProperties');
const Event = require('./Event');
//const Scene = require('./Scene');
//const SceneObject = require('./SceneObject');
const Interaction = require('./Interaction');
const View = require('./View');

// class
var InteractionView;

// variables
InteractionView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "InteractionView", _height, _width, _bindElementID);

	this.vModel = null;
};
InteractionView.prototype = new View();

// static
InteractionView.NewView = function(_elementID){
	var view = new InteractionView(_elementID);
	view.InitView();
	return view;
};

// functions
InteractionView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// Init data binding
	this.vModel = new Vue({
		el: '#' + this.bindElementID,
		data: {
			viewEnabled: false, 
			interactions: null
		}, 
		methods: {
			addInteraction: ()=>{this.AddNewInteraction();}, 
			deleteInteraction: (ntra)=>{ntra.DeleteThis();}, 
			removeCondition: (state, ntra)=>{ntra.RemoveCondition(state);}, 
			deleteReaction: (react, ntra)=>{ntra.DeleteIReaction(react);}
		}
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

InteractionView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method

	if (GameProperties.ProjectLoaded()){
		this.vModel.viewEnabled = true;
		this.vModel.interactions = GameProperties.instance.interactionList;
	} else {
		this.vModel.viewEnabled = false;
		this.vModel.interactions = null;
	}
};

InteractionView.prototype.AddNewInteraction = function(){
	if (this.vModel.viewEnabled) {
		Interaction.NewInteraction();
	}
};

module.exports = InteractionView;