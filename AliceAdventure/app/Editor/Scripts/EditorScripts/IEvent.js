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
    obj.type = this.type;
    
    //switch
    let args = [];
    switch(obj.type) {
        case 0:
            args[0] = this.args[0].id;
            break;
        case 1:
            args[0] = this.args[0].id;
            args[1] = this.args[1].id;
            break;
        case 2:
            args[0] = this.args[0].id;
            break;
        case 3:
            args[0] = this.args[0].id;
            args[1] = this.args[1].id;
            break;
        default:
            break;
    }
    
    obj.args = args;
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