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
		template: "<select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> is clicked"
	}, 
	{
		type: 1,
		name: "Use A on B",
		inputObjNum: 2, 
		template: "<select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> is used on <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select>"
	}, 
	{
		type: 2,
		name: "Observe A",
		inputObjNum: 1, 
		template: "<select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> is observed"
	}, 
	{
		type: 3,
		name: "Combine A with B",
		inputObjNum: 2, 
		template: "<select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> is combined with <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select>"
	}, 
];

// functions

module.exports = IEvent;