'use strict';

const {Debug, ID} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');

// class
var IEvent;

// variables
IEvent = function(_type, _args = []){
    this.type = _type;
    this.args = _args;
};

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
		template: ''
	}, 
    {
        type: 4,
        name: "State A change to V",
        inputObjNum: 2, 
        template: ''
    }, 
    {
        type: 5,
        name: "Enter scene A",
        inputObjNum: 1, 
        template: ''
    }, 
];

IEvent.GetModel = function(type){
    IEvent.Library.foreach()
};

// functions
IEvent.prototype.toJsonObject = function() {
    var obj = {};
    obj.type = this.type;
    
    //switch
    let args = [];
    switch(obj.type) {
        case 0://click
            args[0] = this.args[0].id;
            break;
        case 1://use a on b
            args[0] = this.args[0].id;
            args[1] = this.args[1].id;
            break;
        case 2://observe a
            args[0] = this.args[0].id;
            break;
        case 3://combine a and b
            args[0] = this.args[0].id;
            args[1] = this.args[1].id;
            break;
        default:
            break;
    }
    
    obj.args = args;
    return obj;
}


IEvent.prototype.fromJsonObject = function(_event) {    
    let args = [];

    switch(_event.type) {
        case 0://click
            args[0] = GameProperties.GetObjectById(_event.args[0]);
            break;
        case 1://use a on b
            args[0] = GameProperties.GetObjectById(_event.args[0]);
            args[1] = GameProperties.GetObjectById(_event.args[1]);
            break;
        case 2://observe a
            args[0] = GameProperties.GetObjectById(_event.args[0]);
            break;
        case 3://combine a and b
            args[0] = GameProperties.GetObjectById(_event.args[0]);
            args[1] = GameProperties.GetObjectById(_event.args[1]);
            break;
        default:
            break;
    }

    return new IEvent(_event.type, args);
    
}
module.exports = IEvent;