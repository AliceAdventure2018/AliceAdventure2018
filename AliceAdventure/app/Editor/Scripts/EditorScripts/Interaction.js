'use strict';

const {ID} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const IEvent = require('./IEvent');
const IReaction = require('./IReaction');
// class
var Interaction;

// variables
Interaction = function(_id, _event = null, _conditionList = [], _reactionList = []){
	if (_id == null) _id = ID.newID; // NEVER MODIFY THIS
	this.id = _id;

	this.event = _event;
	this.conditionList = _conditionList;
	this.reactionList = _reactionList;

	//GameProperties.AddInteraction(this);
};

// static
Interaction.NewInteraction = function(){
	let interaction = new Interaction(null);
    GameProperties.AddInteraction(interaction);
	return interaction;
};

Interaction.LoadInteraction = function(_data){    
    let eve = IEvent.prototype.fromJsonObject(_data.event);    
    let reactionList = [];
    for(let i in _data.reactionList) {
        let react = IReaction.prototype.fromJsonObject(_data.reactionList[i]);
        reactionList.push(react);
    }    
    GameProperties.AddInteraction(new Interaction(_data.id, eve, _data.conditionList, reactionList));
};

// functions
Interaction.prototype.SetIEvent = function(_eventType){
	//this.event = new IEvent(_eventModel);
    this.event = new IEvent(_eventType);
}

Interaction.prototype.AddCondition = function(_state){

    this.conditionList.push({
        id:_state.id,
        name:_state.name,
        value: true
    });
    //this.conditionList.push(_state);
	
    return true;
};

Interaction.prototype.RemoveCondition = function(_state){
	let i = this.conditionList.indexOf(_state);
	if (i >= 0) { // exist
		this.conditionList.splice(i, 1);
	}
};

Interaction.prototype.AddIReaction = function(_reactType, _index = null){
    let iReact = new IReaction(_reactType);
	if (_index == null || _index >= this.reactionList.length) { // push back
        this.reactionList.push(iReact);
	} else if (_index <= 0){
		this.reactionList.unshift(iReact); // push front
	} else { // insert
		this.reactionList.splice(_index, 0, iReact);
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

Interaction.prototype.toJsonObject = function() {
    let obj = {};
    
    obj.id = this.id;    
    obj.event = this.event.toJsonObject();    
    obj.conditionList = this.conditionList;        
    obj.reactionList = [];
    this.reactionList.forEach(function(react) {
        //console.log(react);
        obj.reactionList.push(react.toJsonObject())
    })
    
    return obj;
};

module.exports = Interaction;