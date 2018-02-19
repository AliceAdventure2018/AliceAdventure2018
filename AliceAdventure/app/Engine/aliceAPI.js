////Aliases
var Application = PIXI.Application;
//    Container = PIXI.Container,
//    loader = PIXI.loader,
//    resources = PIXI.loader.resources,
//    Graphics = PIXI.Graphics,
//    TextureCache = PIXI.utils.TextureCache,
//    Sprite = PIXI.Sprite,
//    Text = PIXI.Text,
//    TextStyle = PIXI.TextStyle;
//

function Inventory(game) {
    //tools container
    this.game = game;
    this.inventory_w = game.inventoryWidth;
    this.inventory_size = game.inventorySize;
    this.magic_scale = 30;
    
    this.container = new PIXI.Container();
    this.objectList = [];
    
    this.baseX= game.screenWidth + this.inventory_w / 2;
    this.baseY = game.screenHeight / this.inventory_size / 2;
    
    //init//
    var inventoryContainer = new PIXI.Container();
    
    for(var i = 0; i < 5; i++) {
        var inventBack = PIXI.Sprite.fromImage('assets/alice/inventory.png');
        inventBack.x = game.screenWidth;
        inventBack.y = i*this.inventory_w;
        inventoryContainer.addChild(inventBack); 
    }
    
    this.game.app.stage.addChild(inventoryContainer); 
    
    ////////functions//////////
    this.scaleDown = function(tool) {
        tool.scale.set(1);
        tool.scale.set((this.inventory_w - this.magic_scale)/tool.width);
        
    }
    
    //add
    this.add = function(tool) {
        //scale down
        this.scaleDown(tool);
        tool.off('pointerdown', tool.onClick);
        
        //enable drag and drop
        tool
            .on('pointerdown', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);
        
        
        this.objectList.push(tool);
        this.update();

    }
    
    this.remove = function(tool) {
        var len  = this.objectList.length;
        for(var i = 0; i < len ; i++) {
            if(this.objectList[i].name == tool.name) {
                var removedItem = this.objectList.splice(i, 1);
                this.update();
                break;
            }
        }
    }
    
    this.update = function() {
        var len  = this.objectList.length;
        for(var i = 0; i < len ; i++) {
            this.objectList[i].x = this.baseX;
            this.objectList[i].y = this.baseY + i * this.inventory_w;
            this.objectList[i].inventPos = {x:this.objectList[i].x,
                                            y:this.objectList[i].y}
        }
    }
    
    this.inventoryCombine = function() {
        
    }
    
    this.inventoryUse = function(tool) {
        if(tool.target && hitTestRectangle(tool,tool.target))
        {
                console.log("2");
                tool.use();
                //tool.visible = false; ///???
                this.remove(tool);
        }else { //go back to inventory
                console.log("3");
                tool.x = tool.inventPos.x;
                tool.y = tool.inventPos.y;
        }
    
    }
    
    this.clearUp= function() {
       this.objectList = []; 
    }
     
}

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    
    //option 1: ???? not right
    if(myGame.inventory) {
        console.log("drag end");
        myGame.inventory.inventoryUse(this);
    }  
}

function onDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
    }
}





function GameManager() {
    
    this.currentSceneindex = -1;
    
    this.init = function(width,height,invent_size) {
        if(invent_size == 0)
            invent_size = 5;
        
        this.screenWidth = width;
        this.screenHeight = height;
        this.inventorySize = invent_size;
        this.inventoryWidth = height/invent_size
        
        this.app = new Application(this.screenWidth + this.inventoryWidth, height, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
        this.inventory = new Inventory(this);
        this.currentSceneindex = 1; // 0: inventory 1:...
    }
    
    this.addScene = function(scene) {
        this.app.stage.addChild(scene);
        scene.visible = false;
    }
    
    this.nextScene = function() {
        
        this.app.stage.getChildAt(this.currentSceneindex).visible = false;
        this.currentSceneindex++;
        
        //console.log(this.app.stage.children.length);
        
        if(this.currentSceneindex >= this.app.stage.children.length)
            return;
        
        var currentScene = this.app.stage.getChildAt(this.currentSceneindex);
        if(currentScene) {
            currentScene.visible = true;
            this.inventory.clearUp();
        }
    }
    
    this.gameEnd = function() {
        
    }
    
    this.start = function() {
        var currentScene = this.app.stage.getChildAt(this.currentSceneindex);
        console.log("in start");
        currentScene.visible = true;
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

