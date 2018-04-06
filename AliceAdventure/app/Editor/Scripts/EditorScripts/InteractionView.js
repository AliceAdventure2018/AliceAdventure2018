'use strict';

const {Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
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
			interactions: null,
            objects: null,
            states: null,
            scenes: null,
            sounds: null
		}, 
		methods: {
			eventDragover: (ev)=>{View.HandleDragover(ev, View.DragInfo.IEvent);},
			eventDrop: (ev, ntra)=>{View.HandleDrop(ev, View.DragInfo.IEvent, (data)=>{ntra.SetIEvent(data);});}, 
			stateDragover: (ev)=>{View.HandleDragover(ev, View.DragInfo.State);},
			stateDrop: (ev, ntra)=>{View.HandleDrop(ev, View.DragInfo.State, (data)=>{ntra.AddCondition(data);});}, 
			reactionDragover: (ev)=>{View.HandleDragover(ev, View.DragInfo.IReaction);},
			reactionDrop: (ev, ntra)=>{View.HandleDrop(ev, View.DragInfo.IReaction, (data)=>{ntra.AddIReaction(data);});}, 
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
        this.vModel.objects = GameProperties.instance.objectList;
        this.vModel.states = GameProperties.instance.stateList;
        this.vModel.scenes = GameProperties.instance.sceneList;
        this.vModel.sounds = GameProperties.instance.soundList;
	} else {
		this.vModel.viewEnabled = false;
		this.vModel.interactions = null;
        this.vModel.objects = null;
        this.vModel.states = null;
        this.vModel.scenes = null;
        this.vModel.sounds = null;
	}
};

InteractionView.prototype.AddNewInteraction = function(){
	if (this.vModel.viewEnabled) {
		Interaction.NewInteraction();
	}
};

module.exports = InteractionView;