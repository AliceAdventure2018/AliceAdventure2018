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
		inputTypes: [IReaction.InputModel.State, IReaction.InputModel.Checkbox], 
		template: "Set state <select><option selected>win</option></select> to <input type='checkbox' value='true'>"
	}, 
	{
		type: 1,
		name: "Transit to scene", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Scene],
		template: "Transit to scene <select><option selected>Kitchen</option><option>Living room</option><option>Win scene</option></select>"
	}, 
	{
		type: 2,
		name: "Put into inventory", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Object],
		template: "Put <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> into inventory"
	}, 
	{
		type: 3,
		name: "Remove out of inventory", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Object],
		template: "Remove out of inventory"
	}, 
	{
		type: 4,
		name: "Make visible", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> visible"
	}, 
	{
		type: 4.5,
		name: "Make invisible", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> invisible"
	}, 
	{
		type: 5,
		name: "Make interactive", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make interactive"
	}, 
	{
		type: 5.5,
		name: "Make non-interactive", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make non-interactive"
	}, 
	/*{
		type: 6,
		name: "Play audio", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Audio],
		template: "Play audio"
	}, 
	{
		type: 7,
		name: "Play animation", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Animation],
		template: "Play animation"
	}, */
	{
		type: 8,
		name: "Show textbox", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Textbox],
		template: "Show textbox: <input type='textbox'>"
	}
];

// functions

module.exports = IReaction;