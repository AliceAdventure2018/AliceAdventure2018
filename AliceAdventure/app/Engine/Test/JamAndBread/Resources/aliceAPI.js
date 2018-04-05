
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

function InteractionSystem(object) {
    this.clickCollection = new InteractionCollection(0);
    
    object.interactive = true;
    object.buttonMode = true;
    object.onClick = function() {
        object.interactionSystem.clickCollection.react()
    }
    object.on('pointerdown', object.onClick);

}

function Condition(description) {
    this.description = description;
    this.satisfied = false;
}


function InteractionCollection(type) {
    this.type = type;
    this.interactions = [];
    this.add = function(interation) {
        //console.log(this.interactions);
        this.interactions.push(interation);
    }
    this.react = function() {
        //console.log(this.interactions);
        this.interactions.forEach(function(int) {
            if(int.checkCondition()) {
                int.reaction();
                console.log("react");
            }
        })
    }
}

function Interaction() {
    this.active = true;
    this.description = "";
    this.requiredConditions = [];
    
    //override
    this.reaction = function(){};
    
    this.checkCondition = function() {
        console.log("check");
        var result = true;
        for(var condition in this.requiredConditions) {
            result = result && condition.satisfied;
        }
        return result;
    }
}



var baseURL = {
    requireAssets: './Resources/Assets/require/',
    nomalAssets: './Resources/Assets/'
}


function StateManager(_states, _game) {
    //this.game = _game;
    this.states = _states;
    
    //[{state: _state, toBe: _tobe}]
    this.statesEventMessageList = [];
    
    this.eventSprite = new Alice.Object;
    
    this.addStateEvent = function(_state, _toBe, func) {
        var eventMessage = _state + " is changed to " + _toBe;
        this.statesEventMessageList[eventMessage] = true;
        this.eventSprite.on(eventMessage,function() {
           func(); 
        });
    }
    
//    this.checkEventExist = function(message) {
//        if(this.eventMessageList[message] == undefined || this.eventMessageList[message] == false) {
//            //console.log("not valid");
//            return false;
//        }
//        return true;
//    }
    
    this.callEvent = function(message) {
        //check?
        this.eventSprite.emit(message);
    }
    
    this.setState = function(_state_name, _value) {
        
        if(this.states[_state_name] != _value) {
            var message = _state_name + " is changed to " + _value;
            this.states[_state_name] = _value;
            this.callEvent(message);
        }

    }

}

function InventoryInteractionSystem() {
    
    this.emptySprite = new Alice.Object;
    this.eventMessageList = {};
    
    this.addUsedEvent = function(objA, objB, func) {
        var eventMessage = objA.name + " is used on " + objB.name;
        //console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true; 
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.addCombineEvent = function(objA, objB, func) {
        var eventMessage = objA.name + " is combined with " + objB.name;
        console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true; 
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
        
        eventMessage = objB.name + " is combined with " + objA.name;
        console.log("msg: " + eventMessage);
        this.eventMessageList[eventMessage] = true; 
        this.emptySprite.on(eventMessage,function() {
           func(); 
        });
    }
    
    this.addObserveEvent = function(obj, func) {
        var eventMessage = obj.name + " is observed";
        //console.log("msg: " + eventMessage);
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
    
    //interaction system
    this.interactionSystem = new InventoryInteractionSystem();
    

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
        //console.log(tool.name);
        
        var res = this.getCollisionMap(tool);
        var sceneCollider = res.scene;
        var inventoryCollider = res.inventory;
        
        
        
        if(inventoryCollider.length > 0) {
            //console.log('1');
            var message = tool.name + " is combined with " + inventoryCollider.pop().name;
            //console.log(message);
            if(this.interactionSystem.checkEventExist(message)){
                console.log('2');
                game.sound.play('good');
                this.interactionSystem.callEvent(message);
                return;
            }
            //console.log('2.5');
        }
        //console.log('3');
        
        if(sceneCollider.length > 0) {
            //console.log('4');
            var message = tool.name + " is used on " + sceneCollider.pop().name;
            console.log(message);
            if(this.interactionSystem.checkEventExist(message)){
                console.log('5');
                this.interactionSystem.callEvent(message);
                return;
            }
            //console.log('6');
        }
        
        
        //console.log('here');
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
                console.log(obj.name);
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
        console.log("sceneObjName:");
        console.log(sceneObjName);
        console.log("invObjName:");
        console.log(invObjName);
        
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
    
    //init
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
    
    this.jumpToScene = function(scene) {
        var toScene = this.sceneContainer.getChildAt(scene);
        this.currentScene.visible = false;
        toScene.visible = true;
        this.currentScene = toScene;
    }
    
    this.start = function(index) {
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
    
    //sound list
    this.sound = PIXI.sound;
    
    //lock
    this.lock = false;
    
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
        this.messageBox = new MessageBox({x:width,y:height,scale:1, url: baseURL.requireAssets+'textbox.png',a:1},false, this);
        
        this.app.stage.addChild(this.sceneManager.sceneContainer);
        this.app.stage.addChild(this.inventory.inventoryBackgroundGrp); 
        this.app.stage.addChild(this.inventory.inventoryContainer);
        this.app.stage.addChild(this.messageBox.holder);
        //this.messageBox.startConversation(["hahha","lalalala"]);
        
        //this.winSceneIndex = 0;
    
    }
    
    this.initStateManager = function(_states) {
        this.stateManager = new StateManager(_states, this);
    }
    
    
    this.showInventory = function() {
        this.app.renderer.resize(this.screenWidth + this.inventoryWidth,this.screenHeight);
    }
    
    this.hideInventory = function() {
        this.app.renderer.resize(this.screenWidth,this.screenHeight);
    }

    
    this.awake = function() {
        
    }
    
    
    this.end = function() {
        console.log("game end");
        this.inventory.inventoryBackgroundGrp.visible = false;
        this.sceneManager.sceneContainer.visible = false;
        
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 45,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 1300
        });

        var richText = new PIXI.Text('Mission Complete!', style);
        richText.anchor.set(0.5);
        richText.x = 640 + 72;
        richText.y = 360;

        this.app.stage.addChild(richText);
    
    }
    
    
    this.start = function(index) {
        console.log("in start");
        this.sceneManager.start(index);
        this.awake();
    }
    
    this.scene = function(index) {
        return this.sceneManager.getSceneByIndex(index);
    }
    
}


function Message(text,style,avatar) {
    this.text;
    this.style;
    this.avatar;
}

function MessageBox(background, avatarEnable, game) {
    
    this.game = game;
    
    this.holder = new Alice.Container();
    
    this.backgronud = Alice.Object.fromImage(background.url);
    this.backgronud.anchor.set(0.5);
    
    this.backgronud.x = background.x/2;
    this.backgronud.y = background.y - 220/2;
    
    this.backgronud.alpha = 0.8;
    
    var scale = 0.95 * (this.game.screenWidth / 1280);
    this.backgronud.scale.set(scale);
    
    
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
        fontSize: 20 * scale ,
        //fontStyle: 'italic',
        fontWeight: 'bold',
        //fill: ['#ffffff', '#00ff99'], // gradient
//        stroke: '#4a1850',
//        strokeThickness: 5,
//        dropShadow: true,
//        dropShadowColor: '#000000',
//        dropShadowBlur: 4,
//        dropShadowAngle: Math.PI / 6,
//        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 600
    });
    

    this.currentMsg = new PIXI.Text("", this.defaltStyle);
    this.currentMsg.anchor.set(0.5);
    this.currentMsg.x = 30;
    this.currentMsg.y = 180;
    this.currentMsg.x = this.backgronud.x;
    this.currentMsg.y = this.backgronud.y;
    
    this.holder.addChild(this.currentMsg);
    
    this.addMessage = function(msg) {
        this.messageBuffer.push(msg);
    }
    
    this.addMessages = function(msgs) {
        this.messageBuffer = this.messageBuffer.concat(msgs);
    }
    
    this.startConversation= function(msgs,func) {
        
        //console.log(msgs);
        
        if(msgs.length == 0)
            return
        
        if(this.messageBuffer.length > 0) {
            this.addMessages(msgs);
            return;
        }
        
        this.game.lock = true;
            
        if(func!=undefined)
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


function StateMachine(states) {
    this.currentState = 0;
    this.states = states;
    
    this.nextState = function() {
        if(this.currentState + 1 >= this.states.length) {
            return;
        }
        this.currentState ++;
    }
    
    this.getCurrentStateIndex = function() {
        return this.currentState;
    }
    
    
    this.getCurrentState = function() {
        if(this.currentState >= this.states.length) {
            return null;
        }
        return this.states[this.currentState];
    }
    
    this.setState = function(index) {
        if(index >= this.states.length)
            return;
        this.currentState = index;        
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

