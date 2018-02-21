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
		for (var i in Event.Events[_event]){
			try{
				Event.Events[_event][i].instance[Event.Events[_event][i].function](_parameters);
			} catch(e){
				Debug.LogError("Error in event \"" + _event + "\" function: " + e);
				//console.log(Event.Events[_event][f]);
			}
		}
	}
}

Event.AddListener = function(_event, _instance, _function){ // TODO: function can not reference like this
	if (Event.Events[_event] == undefined){
		Event.Events[_event] = [];
	}

	if (typeof _instance[_function] == 'function')
		Event.Events[_event].push({instance: _instance, function: _function});
	else
		Debug.LogError("Parameter added to event \"" + _event + "\" is not a function. ");
}

module.exports = Event;