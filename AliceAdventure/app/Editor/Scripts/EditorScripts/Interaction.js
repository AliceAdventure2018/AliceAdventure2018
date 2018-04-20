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

Interaction.prototype.AddExistIReaction = function(_iReact) {
    this.reactionList.push(_iReact);
    return this.reactionList.length - 1;
}

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

Interaction.prototype.popElemToTopInList = function(_index, _list) {
    var selectElem = _list[_index];
    _list.splice(_index, 1);
    _list.splice(0, 0, selectElem);
}

Interaction.prototype.moveElemAfterElemInList = function(_indexA, _indexB, _list) {
    
    if(_indexB == -1) {
        console.log()
        this.popElemToTopInList(_indexA, _list);
        return;
    }
    
    if(_indexA == _indexB || _indexA == _indexB + 1 ) return;
    
    var movedElem = _list[_indexA];
    console.log("before:" + movedElem.type);
    console.log("la " + _indexA + "-" + _indexB)
    
    if(_indexA < _indexB) {
        console.log("<")
        _list.splice(_indexB + 1, 0, movedElem);
        _list.splice(_indexA, 1);
    } else {
        //console.log(">")
        _list.splice(_indexA, 1);
        
        //console.log("after:" + movedElem.type);
       
        _list.splice(_indexB + 1, 0, movedElem);
    }
    
    

}

module.exports = Interaction;