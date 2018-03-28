'use strict';

const {Debug, ID} = require('./Utilities/Utilities');
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
		type: 0,
		name: "Click on A",
		inputObjNum: 1, 
		template: "# is clicked"
	}, 
	{
		type: 1,
		name: "Use A on B",
		inputObjNum: 2, 
		template: "# is used on #"
	}, 
	{
		type: 2,
		name: "Observe A",
		inputObjNum: 1, 
		template: "# is observed"
	}, 
	{
		type: 3,
		name: "Combine A with B",
		inputObjNum: 2, 
		template: "# is combined with #"
	}, 
];

// functions

module.exports = IEvent;