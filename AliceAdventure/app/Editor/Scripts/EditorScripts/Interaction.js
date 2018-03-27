'use strict';

const ID = require('./ID');
const GameProperties = require('./GameProperties');
const IEvent = require('./IEvent');

// class
var Interaction;

// variables
Interaction = function(_id){
	if (_id == null) _id = ID.newID; // NEVER MODIFY THIS
	this.id = _id;

	this.event = null;
	this.conditionList = [];
	this.reactionList = [];

	GameProperties.AddInteraction(this);
};

// static
Interaction.NewInteraction = function(){
	let interaction = new Interaction(null);
	return interaction;
};

Interaction.LoadInteraction = function(_data){
	// TODO
	console.log("function not implemented");
	//let Interaction = new Interaction(_data.id);
	//Interaction.conditionList = [];
	//Interaction.reactionList = [];
	//return Interaction;
};

// functions
Interaction.prototype.SetIEvent = function(_eventModel){
	this.event = new IEvent(_eventModel);
}

Interaction.prototype.AddCondition = function(_state){
	if (this.conditionList.indexOf(_state) >= 0) {return false;} // Already contains this event
	this.conditionList.push(_state);
	return true;
};

Interaction.prototype.RemoveCondition = function(_state){
	let i = this.conditionList.indexOf(_state);
	if (i >= 0) { // exist
		this.conditionList.splice(i, 1);
	}
};

Interaction.prototype.AddIReaction = function(_iReact, _index = null){
	//this.reactionList.push(new InteractionReaction(type, obj1, obj2))
	if (_index == null || _index >= this.reactionList.length) { // push back
		this.reactionList.push(_iReact);
	} else if (_index <= 0){
		this.reactionList.unshift(_iReact); // push front
	} else { // insert
		this.reactionList.splice(_index, 0, _iReact);
	}
};

Interaction.prototype.DeleteIReaction = function(_iReact){
	let i = this.reactionList.indexOf(_iReact);
	if (i >= 0) { // exist
		this.reactionList.splice(i, 1);
	}
};

Interaction.prototype.DeleteThis = function(){
	GameProperties.DeleteInteraction(this);
};

module.exports = Interaction;