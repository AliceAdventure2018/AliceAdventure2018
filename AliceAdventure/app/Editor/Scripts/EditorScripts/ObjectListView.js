'use strict';

const {Event} = require('./Utilities/Utilities');
const GameProperties = require('./GameProperties');
const View = require('./View');

// class
var ObjectListView;

// variables
ObjectListView = function(_bindElementID, _height = -1, _width = -1){
	View.call(this, "ObjectListView", _height, _width, _bindElementID);	
	this.vModel = null;
};
ObjectListView.prototype = new View();

// static
ObjectListView.NewView = function(_elementID){
	var view = new ObjectListView(_elementID);
	view.InitView();
	return view;
};

// functions
ObjectListView.prototype.InitView = function(){
	View.prototype.InitView.apply(this); // call super method
	// init data binding
	this.vModel = new Vue({
	  el: '#' + this.bindElementID,
	  data: {
	  	projectLoaded: false, 
	    sceneList: null, 
	    objectList: null,
      }, 
	  methods: {
        objectDragStart: (ev, d)=>{View.HandleDragstart(ev, View.DragInfo.ListedObject, d);},
        objectDragover: (ev)=>{View.HandleDragover(ev, View.DragInfo.ListedObject, ()=>{});},
        objectDrop: (ev, scene, object)=>{View.HandleDrop(ev, View.DragInfo.ListedObject, (dragObj)=>{
            ObjectListView.prototype.updateOrder(dragObj, scene, object);
        });}, 
	  	onObjectSelect: (obj)=>{View.Selection.selectObject(obj);}, 
	  	onSceneSelect: (scn)=>{View.Selection.selectScene(scn);}, 
	  	deleteObject: (obj)=>{View.Selection.deSelect();obj.DeleteThis();},
	  	deleteScene: (scn)=>{View.Selection.deSelect();scn.DeleteThis();},
	  }
	});

	// events
	Event.AddListener("reload-project", ()=>{this.ReloadView();});
};

ObjectListView.prototype.ReloadView = function(){
	View.prototype.ReloadView.apply(this); // call super method

	if (GameProperties.instance == null){
		this.vModel.projectLoaded = false;
		this.vModel.sceneList = null;
		this.vModel.objectList = null;
	} else {
	  	this.vModel.projectLoaded = true; 
	    this.vModel.sceneList = GameProperties.instance.sceneList; 
	    this.vModel.objectList = GameProperties.instance.objectList; 
	}
};

ObjectListView.prototype.updateOrder = function(dragedObj, toScene, aboveObj) {

    if(!aboveObj) {
        toScene.container.addChildAt(dragedObj.sprite, 0);
    }else {
        if(dragedObj.id == aboveObj.id) return;
        let indexA = -1;
        let indexB = -1;
        for(var i = 0; i<toScene.container.children.length; i++) {
            if(toScene.container.children[i].id == aboveObj.id) {
                indexB = i;
                continue;
            }
            if(toScene.container.children[i].id == dragedObj.id) {
                indexA = i;
                continue;
            }

            if(indexA != -1 && indexB!=-1) {
                break;
            }
        }

        if(indexA == indexB + 1) {
            return;
        }

        if(indexA == -1) {
            toScene.container.addChildAt(dragedObj.sprite,indexB+1);
        } else if(indexA > indexB) {
            var index = indexB+1
            toScene.container.addChildAt(dragedObj.sprite,index);
        } else {
            toScene.container.addChildAt(dragedObj.sprite,indexB);
        }
    }
    
    dragedObj.bindScene = toScene;
    GameProperties.updateOrderByScene(toScene);
    View.Selection.selectObject(dragedObj)
}



module.exports = ObjectListView;