'use strict';

//const ID = require('./ID');
//const GameProperties = require('./GameProperties');

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
};

IReaction.Library = [
	{
		index: 0,
		name: "Change state", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.State, IReaction.InputModel.Checkbox]
	}, 
	{
		index: 1,
		name: "Transit scene", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Scene]
	}
];

// functions

module.exports = IReaction;