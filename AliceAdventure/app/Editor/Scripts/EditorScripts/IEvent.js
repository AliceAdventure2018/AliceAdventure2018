'use strict';

const {Debug, ID} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');

// class
var IEvent;

// variables
IEvent = function(_model, _type, _args = []){
	this.model = _model;
    this.type = _type;
    this.args = _args;
};


IEvent.prototype.toJSONObject = function() {
    var obj = {};
    obj.args = this.args;
    obj.type = this.type;
    return obj;
}


// static
IEvent.Library = [
	{
		type: 0,
		name: "Click on A",
		inputObjNum: 1, 
        template: '<select v-model="ntra.event.args[0]"><option v-for="obj in objects" v-html="obj.name" v-bind:value="obj.id"></option></select> is clicked'
	}, 
	{
		type: 1,
		name: "Use A on B",
		inputObjNum: 2, 
		template: '<select v-model="ntra.event.args[0]"><option v-for="obj in objects" v-html="obj.name" v-bind:value="obj.id"></option></select> is used on <select v-model="ntra.event.args[1]"><option v-for="obj in objects" v-html="obj.name" v-bind:value="obj.id"></option></select>'
	}, 
	{
		type: 2,
		name: "Observe A",
		inputObjNum: 1, 
		template: '<select v-model="ntra.event.args[0]"><option v-for="obj in objects" v-html="obj.name" v-bind:value="obj.id"></option></select> is observed'
	}, 
	{
		type: 3,
		name: "Combine A with B",
		inputObjNum: 2, 
		template: '<select v-model="ntra.event.args[0]"><option v-for="obj in objects" v-html="obj.name" v-bind:value="obj.id"></option></select> is combined with <select v-model="ntra.event.args[1]"><option v-for="obj in objects" v-html="obj.name" v-bind:value="obj.id"></option></select>'
	}, 
];

// functions

module.exports = IEvent;