'use strict';

const Debug = require('./Debug');
const ID = require('./ID');
const GameProperties = require('./GameProperties');

// class
var IEvent;

// variables
IEvent = function(_model, args = []){
	this.model = _model;
	this.args = [];
};

// static
IEvent.Library = [
	{
		index: 0,
		name: "Click in scene",
		inputObjNum: 1, 
		template: "# is clicked"
	}, 
	{
		index: 1,
		name: "Use in scene",
		inputObjNum: 2, 
		template: "# is used on #"
	}, 
	{
		index: 2,
		name: "Observe in inventory",
		inputObjNum: 1, 
		template: "# is observed"
	}, 
	{
		index: 3,
		name: "Combine in inventory",
		inputObjNum: 2, 
		template: "# is combined with #"
	}, 
];

// functions

module.exports = IEvent;