'use strict';

// class
var IReaction;

// variables
IReaction = function(_model){
	this.model = _model;

	this.inputs = [];
};

// static
IReaction.InputModel = {
	Object: {}, 
	Scene: {}, 
	State: {}, 
	Checkbox: {}, 
	Textbox: {}, 
	Audio: {}, 
	Animation: {}, 

};

IReaction.Library = [
	{
		type: 0,
		name: "Set state", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.State, IReaction.InputModel.Checkbox]
	}, 
	{
		type: 1,
		name: "Transit to scene", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Scene]
	}, 
	{
		type: 2,
		name: "Store in inventory", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Object]
	}, 
	{
		type: 3,
		name: "Remove out of inventory", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Object]
	}, 
	{
		type: 4,
		name: "Set active", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox]
	}, 
	{
		type: 5,
		name: "Set interactive", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox]
	}, 
	{
		type: 6,
		name: "Play audio", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Audio]
	}, 
	{
		type: 7,
		name: "Play animation", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Animation]
	}, 
	{
		type: 8,
		name: "Show textbox", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Textbox]
	}
];

// functions

module.exports = IReaction;