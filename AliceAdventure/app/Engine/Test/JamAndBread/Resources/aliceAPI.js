
var Alice = {
    Application : PIXI.Application,
    Object : PIXI.Sprite,
    Container : PIXI.Container,
    Texture: PIXI.Texture,
    Scene: PIXI.Container,
    Ticker: PIXI.ticker.Ticker,
    Text: PIXI.Text,
    AnimatedObject: PIXI.extras.AnimatedSprite,
    Sound: PIXI.sound
}


var baseURL = {
    requireAssets: './Resources/Assets/require/',
    nomalAssets: './Resources/Assets/'
}



function StateManager(_states, _eventSys) {
    this.states = _states;
    this.eventSystem = _eventSys;
    
    this.setState = function(_state_name, _value) {
        if(this.states[_state_name] != _value) {
            var message = _state_name + this.eventSystem.template.state + _value;
            this.states[_state_name] = _value;
            
            this.eventSystem.callEvent(message);
        }
    }

}

function AliceReactionSystem(_game) {
    
    this.game = _game;
    
    this.setState = function(_stateName, _value) {
        this.game.stateManager.setState(_stateName, _value);
    }
    
    this.transitToScene = function(_sceneIndex) {
        this.game.sceneManager.jumpToScene(_sceneIndex);
    }
    
    this.addToInventory = function(_obj) {
        this.game.inventory.add(_obj);
    }
    
    this.removeFromInventory = function(_obj) {
        this.game.inventory.remove(_obj);
    }
    
    this.makeObjVisible = function(_obj) {
        _obj.visible = true;
    }
    
    this.makeObjInvisible = function(_obj) {
        _obj.visible = false;
    }
    
    this.makeInteractive = function(_obj) {
        _obj.interactive = true;
    }
    
    this.makeNonInteractive = function(_obj) {
        _obj.interactive = false;
    }
    
    this.playAudio = function(_audio) {
        this.game.sound.play(_audio);
    }
    
    this.showInventory = function() {
        this.game.showInventory();
    }
    
    this.hideInventory = function() {
        this.game.hideInventory();
    }
    
    this.moveObjectToScene= function(_obj, _scene_index, x = null , y = null) {
        this.game.moveObjectToScene(_obj,_scene_index,x,y);
    }
    
}

function AliceEventSystem() {
    
    this.template = {
        use: " is used on ",
        combine: " is combined with ",
        observe: " is observed ",
        state: " is changed to ",
        transit: "transit to "
    }
    
    this.emptySprite = new Alice.Object;
    this.eventMessageList = {};
    
    this.addUsedEvent = function(objA, objB, func) {
        var eventMessage = objA.name + this.template.use + objB.name;
        console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true; 
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.addCombineEvent = function(objA, objB, func) {
        var eventMessage = objA.name + this.template.combine + objB.name;
        console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true; 
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
        
        eventMessage = objB.name + this.template.combine + objA.name;
        console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true; 
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.addObserveEvent = function(obj, func) {
        var eventMessage = obj.name + this.template.observe;
        console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true;
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.addStateEvent = function(_state, _toBe, func) {
        var eventMessage = _state + this.template.state + _toBe;
        this.eventMessageList[eventMessage] = true;
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.addSceneTransitEvent = function(_scene, func) {
        var eventMessage = this.template.transit + _scene;
        //console.log("add scene transit: " + eventMessage)
        this.eventMessageList[eventMessage] = true;
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.checkEventExist = function(message) {
        if(this.eventMessageList[message] == undefined || this.eventMessageList[message] == false) {
            //console.log("not valid");
            return false;
        }
        return true;
    }
    
    this.callEvent = function(message) {
        this.emptySprite.emit(message);
    }
    
}


function Inventory(game) { //always on the top
    //tools container
    this.game = game;
    this.inventory_w = game.inventoryWidth;
    this.inventory_size = game.inventorySize;
    this.magic_scale = 0.8;
    
    this.objectList = [];
    this.baseX= game.screenWidth + this.inventory_w / 2;
    this.baseY = game.screenHeight / this.inventory_size / 2;
    
    //init//
    this.inventoryContainer = new PIXI.Container();
    this.inventoryBackgroundGrp = new PIXI.Container();
    for(var i = 0; i < this.inventory_size; i++) {
        var inventBack = Alice.Object.fromImage( baseURL.requireAssets+'inventory.png');
        
        //scale
        var background_scale = this.inventory_w/144;
        inventBack.scale.set(background_scale);
        inventBack.x = game.screenWidth;
        inventBack.y = i*this.inventory_w;
        this.inventoryBackgroundGrp.addChild(inventBack); 
    }
    

    //sound
    game.sound.add('add', baseURL.requireAssets + 'sound/add.wav');
    game.sound.add('good', baseURL.requireAssets + 'sound/use_good.wav');
    game.sound.add('bad', baseURL.requireAssets + 'sound/use_bad.wav');
    
    ////////functions//////////
    this.scaleDown = function(tool) {
        tool.scale.set(1);
        tool.scale.set((this.inventory_w/tool.width) * this.magic_scale);
        
    }
    
    
    this.add = function(tool) {
        
        //this.soundList.add.play();
        game.sound.play('add');
        //remove tool from the original scene and add to inventory container
        this.inventoryContainer.addChild(tool); //[INTERESTING: remove it from the original container]
        
        //scale down
        this.scaleDown(tool);
        
        tool.interactive = true;
        tool.buttonMode = true;
        
        tool.off('pointerdown', tool.onClick);
        tool.on('rightclick', function(){myGame.inventory.inventoryObserved(tool)});
        
        //enable drag and drop
        tool
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointermove', onDragMove);

        this.update();
    }
    
    this.remove = function(tool) {
        this.inventoryContainer.removeChild(tool);
        this.update();
    }
    
    this.update = function() {
        var len  = this.inventoryContainer.children.length;
        //console.log("invent len = " + len);
        for(var i = 0; i < len ; i++) {
            var child = this.inventoryContainer.getChildAt(i);
            child.x = this.baseX;
            child.y = this.baseY + i * this.inventory_w;
            child.inventPos = {x:child.x, y:child.y}
        }
    }
    
    
    this.inventoryObserved = function(tool) {
        var message = tool.name + " is observed";
        if(this.interactionSystem.checkEventExist(message))
            this.interactionSystem.callEvent(message);
        
    }
    
    
    this.inventoryUse = function(tool) {

        var res = this.getCollisionMap(tool);
        var sceneCollider = res.scene;
        var inventoryCollider = res.inventory;
        
        if(inventoryCollider.length > 0) {
            var message = tool.name + this.game.eventSystem.template.combine + inventoryCollider.pop().name;
            if(this.game.eventSystem.checkEventExist(message)){
                game.sound.play('good');
                this.game.eventSystem.callEvent(message);
                return;
            }
        }
        
        if(sceneCollider.length > 0) {
            var message = tool.name + this.game.eventSystem.template.use + sceneCollider.pop().name;
            //console.log(message);
            if(this.game.eventSystem.checkEventExist(message)){
                game.sound.play('good');
                this.game.eventSystem.callEvent(message);
                return;
            }
        }
        
        game.sound.play('bad');
        tool.x = tool.inventPos.x;
        tool.y = tool.inventPos.y;
         
    }
    
    this.clearUp= function() {
        this.inventoryContainer.removeChildren();
    }
    
    this.popUp = function(tool) {
        this.inventoryContainer.removeChild(tool);
        this.inventoryContainer.addChild(tool);
    }
    
    this.getCollisionMap = function(tool) {
        var SceneCollideList = [];
        var objectsInCurrentScene = this.game.sceneManager.getCurrentScene().children;
        //console.log(objectsInCurrentScene)
        objectsInCurrentScene.forEach(function(obj) {
            if(obj.visible && hitTestRectangle(tool,obj)) {
                console.log(obj.name);
                SceneCollideList.push(obj);
            }
        });
        
        var InventoryCollideList = [];
        var objectsInInventory = this.inventoryContainer.children;
        //console.log(objectsInInventory);
        objectsInInventory.forEach(function(obj) {
            if(obj.name!=tool.name && obj.visible && hitTestRectangle(tool,obj)) {
                //console.log(obj.name);
                InventoryCollideList.push(obj);
            }
        });
        var sceneObjName = [];
        SceneCollideList.forEach(function(obj){
            sceneObjName.push(obj.name);
        })
        
        var invObjName = [];
        InventoryCollideList.forEach(function(obj){
            invObjName.push(obj.name);
        })
//        console.log("sceneObjName:");
//        console.log(sceneObjName);
//        console.log("invObjName:");
//        console.log(invObjName);
        
        return {scene:SceneCollideList,inventory:InventoryCollideList};
    }
    
}


function onDragStart(event) {
    myGame.inventory.popUp(this);
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    
    if(myGame.inventory) {
        myGame.inventory.inventoryUse(this);
    }  
}


function SceneManager(game) {
    this.currentScene;

    this.game = game;
    this.sceneContainer = new PIXI.Container();
    
    this.getCurrentScene = function() {
        return this.currentScene;
    }
    
    this.getSceneByIndex = function(index) {
        return this.sceneContainer.getChildAt(index);
    }
    
    this.createScenes = function(num) {
        for(var i = 0; i < num; i++) {
            var scene = new Alice.Scene();
            this.addScene(scene);
        }
    }
    
    this.addScene = function(scene) {
        this.sceneContainer.addChild(scene);
        scene.visible = false;
    }
    
    this.nextScene = function() {
        var currentSceneIndex = this.sceneContainer.getChildIndex(this.currentScene);
        this.currentScene.visible = false;
        currentSceneIndex ++;
        
        if(currentSceneIndex >= this.sceneContainer.children.length)
            return;
        
        this.currentScene =  this.sceneContainer.getChildAt(currentSceneIndex);
        this.currentScene.visible = true; 
    }
    
    
    this.previousScene = function() {
        var currentSceneIndex = this.sceneContainer.getChildIndex(this.currentScene);
        this.currentScene.visible = false;
        
        if(currentSceneIndex-1 < 0)
            return;
        
        currentSceneIndex --;
        
        this.currentScene =  this.sceneContainer.getChildAt(currentSceneIndex);
        this.currentScene.visible = true; 
    }
    
    //transit to scene index
    this.jumpToScene = function(scene) {
        var message = this.game.eventSystem.template.transit + scene;
        this.game.eventSystem.callEvent(message);
        
        var toScene = this.sceneContainer.getChildAt(scene);
        this.currentScene.visible = false;
        toScene.visible = true;
        this.currentScene = toScene;
    }
    
    this.start = function(index) {
        console.log("width: " + window.screen.width);
        console.log("height: " + window.screen.height);

        this.currentScene = this.sceneContainer.getChildAt(index);
        this.currentScene.visible = true;
    }
    
}



function GameManager() {
    
    //game
    this.screenWidth;
    this.screenHeight;
    this.inventorySize;
    this.inventoryWidth;
    
    this.app;
    this.inventory;
    this.sceneManager;
    this.messageBox;
    this.stateManager;
    this.eventSystem;
    this.reactionSystem;
    
    //sound
    this.sound = PIXI.sound;
    
    this.init = function(width,height,invent_size = 5) {
        if(invent_size < 5)
            invent_size = 5;
        
        this.screenWidth = width;
        this.screenHeight = height;

        this.inventorySize = invent_size;
        this.inventoryWidth = height/invent_size
        
        this.app = new Alice.Application(this.screenWidth + this.inventoryWidth, height, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
               
        this.sceneManager = new SceneManager(this);
        this.inventory = new Inventory(this);
        this.messageBox = new MessageBox({w:width,
                                          h:height,
                                          scale:1, 
                                          url: baseURL.requireAssets+'textbox.png',
                                          a:1},
                                         false, 
                                         this);
        
        this.eventSystem = new AliceEventSystem();
        this.reactionSystem = new AliceReactionSystem(this);
        
        this.app.stage.addChild(this.sceneManager.sceneContainer);
        this.app.stage.addChild(this.inventory.inventoryBackgroundGrp); 
        this.app.stage.addChild(this.inventory.inventoryContainer);
        this.app.stage.addChild(this.messageBox.holder);
 
    
    }
    
    
    this.initStateManager = function(_states) {
        this.stateManager = new StateManager(_states, this.eventSystem);
    }
    
    this.moveObjectToScene= function(_obj, _scene_index, x = null , y = null) {
        this.scene(_scene_index).addChild(_obj);
        if(x)
            _obj.x = x;
        if(y)
            _obj.y = y;
    }
    
    
    this.showInventory = function() {
        this.app.renderer.resize(this.screenWidth + this.inventoryWidth,this.screenHeight);
    }
    
    this.hideInventory = function() {
        this.app.renderer.resize(this.screenWidth,this.screenHeight);
    }

    
    this.awake = function() {
        
    }
    
    this.start = function(index) {
        //console.log("in start");
        this.sceneManager.start(index);
        this.awake();
    }
    
    this.scene = function(index) {
        return this.sceneManager.getSceneByIndex(index);
    }
    
}


function Message(_text, _style, _avatar, _narrator="") {
//    this.defaultStyle = new PIXI.TextStyle({
//        fontFamily: 'Arial',
//        fontSize: 20,
//        fontWeight: 'bold',
//        wordWrap: true,
//        wordWrapWidth: 600
//    });
    
    this.text = _text;
    this.style = _style;
    this.avatar;
    this.narrator = _narrator;
}

/*
the original settings for 1280*720 screen
    url: baseURL.requireAssets+'textbox.png'
    pixel: 1051*231
    alpha: 0.8
    font_size: 25
*/

function MessageBox(background, avatarEnable, game) {
    
    this.game = game;
    
    this.holder = new Alice.Container();
    
    //the original background asset is built for 1280*720 screen
    this.backgronud = Alice.Object.fromImage(background.url);
    //this.backgronud = Alice.Object.fromImage("Assets/require/textbox.png");
    this.backgronud.anchor.set(0.5);
    
    //horizontal center
    this.backgronud.x = background.w/2;
    this.backgronud.alpha = 0.8;
    
    var scale = (this.game.screenWidth / 1280) * 0.7;
    
    this.backgronud.scale.set(scale);
    
    this.backgronud.y = background.h - (220 * scale)/2 - 10 * scale;
    
    this.backgronud.interactive = true;
    this.backgronud.buttonMode = true;
    
    this.messageBuffer = [];
    this.currentMsgIndex = 0;
    this.callBack = function(){};
    
    this.nextConversation = function() {
        
        this.currentMsgIndex++;
        //console.log("next " + this.currentMsgIndex);
        if(this.currentMsgIndex < this.messageBuffer.length)
        {
            this.currentMsg.text = this.messageBuffer[this.currentMsgIndex];
            //console.log("speak " + this.messageBuffer[this.currentMsgIndex]);
        } else {
            this.messageBuffer = [];
            this.currentMsg.text = "";
            this.currentMsgIndex = 0;
            this.holder.visible = false;
            this.callBack();           
        }

    }
    
    this.backgronud.on('pointerdown', messageBoxOnClick);
    
    this.holder.addChild(this.backgronud);
    this.holder.visible = false;
    
    
    this.defaltStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 23 * scale,
        fontWeight: 'bold',
        wordWrap: true,
        wordWrapWidth: 1051 * scale * 0.8
    });
    

    this.currentMsg = new PIXI.Text("", this.defaltStyle);
    this.currentMsg.anchor.set(0.5);
    this.currentMsg.x = this.backgronud.x;
    this.currentMsg.y = this.backgronud.y;
    
    this.holder.addChild(this.currentMsg);
    
    this.addMessage = function(msg) {
        this.messageBuffer.push(msg);
    }
    
    this.addMessages = function(msgs) {
        this.messageBuffer = this.messageBuffer.concat(msgs);
    }
    
    this.startConversation= function(msgs, func = null) {
        if(msgs.length == 0)
            return
        
        if(this.messageBuffer.length > 0) {
            this.addMessages(msgs);
            return;
        }
            
        if(func)
            this.callBack = func;
        
        this.messageBuffer = msgs;
        
        this.currentMsgIndex = 0;
        this.currentMsg.text = this.messageBuffer[this.currentMsgIndex];
        this.holder.visible = true;
    }
    
    this.stopConversation= function() {
            this.messageBuffer = [];
            this.currentMsg.text = "";
            this.currentMsgIndex = 0;
            this.holder.visible = false;
            this.game.lock = false;
    }
}


function messageBoxOnClick() {
    if(myGame.messageBox) {
        myGame.messageBox.nextConversation();
    }
}




/*
    2D collision detection
*/
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2; 
  r1.centerY = r1.y + r1.height / 2; 
  r2.centerX = r2.x + r2.width / 2; 
  r2.centerY = r2.y + r2.height / 2; 

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

