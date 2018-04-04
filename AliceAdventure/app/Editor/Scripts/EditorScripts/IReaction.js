'use strict';

const GameProperties = require('./GameProperties');
// class
var IReaction;



// variables
IReaction = function(_model, _type = 0, _args = []){
	this.model = _model;

	//this.inputs = [];
    
    //Miao Edit
    this.args = _args;
    this.type = _type;
    
};

// static
IReaction.InputModel = {
	Object: {}, 
	Scene: {}, 
	State: {}, 
	Checkbox: {}, 
	Textbox: {}, 
	Audio: {}, 
	Animation: {}, 

};

IReaction.prototype.toJSONObject = function() {
    let obj = {};
    obj.type = this.type;
    
    let args = [];
    switch(obj.type) {
        case 0:
            args[0] = this.args[0].id;
            args[1] = this.args[1];
            break;
        case 1:
            args[0] = this.args[0].id;
            break;
        case 2:
            args[0] = this.args[0].id;
            break;
        case 3:
            args[0] = this.args[0].id;
            break;
        case 4:
            args[0] = this.args[0].id;
            break;
            
        case 5:
            args[0] = this.args[0].id;
            break;
            
        case 6:
            args[0] = this.args[0].id;
            break;
            
        case 7:
            args[0] = this.args[0].id;
            break;
        case 8:
            args[0] = this.args[0];
            break;
        default:
            args = [];
            break;
    }
    
    obj.args = args;
    
    return obj;
}

IReaction.prototype.fromJSONObject = function(data) {
    let args = [];
    switch(data.type) {
        case 0:
            args[0] = GameProperties.GetStateById(data.args[0])
            args[1] = data.args[1];
            break;
        case 1:
            args[0] = GameProperties.GetSceneById(data.args[0]);
            break;
        case 2:
            args[0] = GameProperties.GetObjectById(data.args[0]);
            break;
        case 3:
            args[0] = GameProperties.GetObjectById(data.args[0]);
            break;
        case 4:
            args[0] = GameProperties.GetObjectById(data.args[0]);
            break;
        case 5:
            args[0] = GameProperties.GetObjectById(data.args[0]);
            break;
        case 6:
            args[0] = GameProperties.GetObjectById(data.args[0]);
            break;
        case 7:
            args[0] = GameProperties.GetObjectById(data.args[0]);
            break;
        case 8:
            args[0] = data.args[0];;
            break;
        default:
            args = [];
            break;
    }
    
    return new IReaction(null,data.type,args);
    
}

IReaction.Library = [
	{
		type: 0,
		name: "Set state", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.State, IReaction.InputModel.Checkbox], 
		template: "Set state <select><option selected>win</option></select> to <input type='checkbox' value='true'>"
	}, 
	{
		type: 1,
		name: "Transit to scene", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Scene],
		template: "Transit to scene <select><option selected>Kitchen</option><option>Living room</option><option>Win scene</option></select>"
	}, 
	{
		type: 2,
		name: "Put into inventory", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Object],
		template: "Put <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> into inventory"
	}, 
	{
		type: 3,
		name: "Remove out of inventory", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Object],
		template: "Remove out of inventory"
	}, 
	{
		type: 4,
		name: "Make visible", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> visible"
	}, 
	{
		type: 5,
		name: "Make invisible", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make <select><option selected>Knife</option><option>Jam</option><option>Knife with jam</option><option>Bread with jam</option><option>Bread</option><option>Cat</option><option>Door</option></select> invisible"
	}, 
	{
		type: 6,
		name: "Make interactive", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make interactive"
	}, 
	{
		type: 7,
		name: "Make non-interactive", 
		inputLength: 2, 
		inputTypes: [IReaction.InputModel.Object, IReaction.InputModel.Checkbox],
		template: "Make non-interactive"
	}, 
	/*{
		type: 6,
		name: "Play audio", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Audio],
		template: "Play audio"
	}, 
	{
		type: 7,
		name: "Play animation", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Animation],
		template: "Play animation"
	}, */
	{
		type: 8,
		name: "Show textbox", 
		inputLength: 1, 
		inputTypes: [IReaction.InputModel.Textbox],
		template: "Show textbox: <input type='textbox'>"
	}
];

// functions

module.exports = IReaction;