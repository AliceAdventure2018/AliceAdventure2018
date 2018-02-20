'use strict';

const Debug = require('./Debug');

// class
var Event;

// variables
Event = function(){};

Event.Events = {};

// functions
Event.Broadcast = function(_event, _parameters){
	if (Event.Events[_event] == undefined){
		Debug.LogWarning("Event \"" + _event + "\" is not defined. ");
	}
	else {
		for (var f in Event.Events[_event]){
			try{
				Event.Events[_event][f](_parameters);
			} catch(e){
				Debug.LogError("Error in event \"" + _event + "\" function: " + e);
				//console.log(Event.Events[_event][f]);
			}
		}
	}
}

Event.AddListener = function(_event, _function){ // TODO: function can not reference like this
	if (Event.Events[_event] == undefined){
		Event.Events[_event] = [];
	}

	if (typeof _function == 'function')
		Event.Events[_event].push(_function);
	else
		Debug.LogError("Parameter added to event \"" + _event + "\" is not a function. ");
}

module.exports = Event;