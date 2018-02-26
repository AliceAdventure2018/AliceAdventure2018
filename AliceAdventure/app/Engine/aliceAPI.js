
var Alice = {
    Application : PIXI.Application,
    Object : PIXI.Sprite,
    Container : PIXI.Container,
    Texture: PIXI.Texture,
    Scene: PIXI.Container
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
        var inventBack = Alice.Object.fromImage('assets/alice/inventory.png');
        inventBack.x = game.screenWidth;
        inventBack.y = i*this.inventory_w;
        this.inventoryBackgroundGrp.addChild(inventBack); 
    }
    
    ////////functions//////////
    this.scaleDown = function(tool) {
        tool.scale.set(1);
        tool.scale.set((this.inventory_w/tool.width) *this.magic_scale);
        
    }
    
    this.add = function(tool) {
        
        //remove tool from the original scene and add to inventory container
        this.inventoryContainer.addChild(tool); //[INTERESTING: remove it from the original container]
        
        //scale down
        this.scaleDown(tool);
        tool.off('pointerdown', tool.onClick);
        
        //enable drag and drop
        tool
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
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
    
    this.inventoryCombine = function() {
        
    }
    
    this.inventoryUse = function(tool) {
        if(tool && tool.target && hitTestRectangle(tool,tool.target))
        {
                //console.log("2");
                tool.use(); //[TODO]
        }else { //go back to inventory
                //console.log("3");
                tool.x = tool.inventPos.x;
                tool.y = tool.inventPos.y;
        }
    
    }
    
    this.clearUp= function() {
        this.inventoryContainer.removeChildren();
    }
     
}

function onDragStart(event) {
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
    this.sceneContainer;
    this.game;
    
    //init
    this.game = game;
    this.sceneContainer = new PIXI.Container();

    
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
    
    
    this.jumpToScene = function(scene) {
        var currentScene = this.sceneContainer.getChildAt(this.currentSceneindex);
        currentScene.visible = false;
        scene.visible = true;
        currentScene = scene;
    }
    
    this.start = function() {
        this.currentScene = this.sceneContainer.getChildAt(0);
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
    
    this.init = function(width,height,invent_size) {
        if(invent_size == 0)
            invent_size = 5;
        
        this.screenWidth = width;
        this.screenHeight = height;

        this.inventorySize = invent_size;
        this.inventoryWidth = height/invent_size
        
        this.app = new Alice.Application(this.screenWidth + this.inventoryWidth, height, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
               
        this.sceneManager = new SceneManager(this);
        this.inventory = new Inventory(this);

        this.app.stage.addChild(this.sceneManager.sceneContainer);
        this.app.stage.addChild(this.inventory.inventoryBackgroundGrp); 
        this.app.stage.addChild(this.inventory.inventoryContainer);

    }
    
    
    this.end = function() {
        
    }
    
    
    this.start = function() {
        //this.currentScene = this.sceneContainer.getChildAt(0);
        console.log("in start");
        //this.currentScene.visible = true;
        this.sceneManager.start();
    }
    
}



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

