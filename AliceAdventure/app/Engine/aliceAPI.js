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

function Inventory() {
    //tools container
    this.container = new PIXI.Container();
    
    this.objectList = [];
    this.objx= 60;
    
    //active:
    //this.activeIndex = -1;
    
    //scroll
    this.getNewY = function() {
        return y = 60 + this.objectList.length*120;
    }
    
    this.scaleDown = function(tool) {
        
        
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
            this.objectList[i].x = this.objx;
            this.objectList[i].y = 60 + i*120;
            this.objectList[i].inventPos = {x:this.objx, y:60 + i*120}
        }
    }
    
    this.inventoryCombine = function() {
        
    }
    
    this.inventoryUse = function(tool) {
        if(tool.target && hitTestRectangle(tool,tool.target))
        {
                console.log("2");
                tool.use();
                tool.visible = false; ///???
                this.remove(tool);
        }else { //go back to inventory
                console.log("3");
                
                //console.log(tool.position.x);
                //console.log(tool.position.y);
                tool.x = tool.inventPos.x;
                tool.y = tool.inventPos.y;
        }
    
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


function GameManager() {
    this.inventory = new Inventory();
    this.currentSceneindex = -1;
    
    this.init = function() {
        this.app = new Application(800, 600, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);
    }
    
    this.addScene = function(scene) {
        this.app.stage.addChild(scene);
        this.currentSceneindex = 0;
        scene.visible = false;
    }
    
    this.nextScene = function() {
        this.app.stage.getChildAt(this.currentSceneindex).visible = false;
        this.currentSceneindex++;
        
        if(this.currentSceneindex >= this.app.stage.children.length)
            return;
        
        var currentScene = this.app.stage.getChildAt(this.currentSceneindex);
        if(currentScene) {
            currentScene.visible = true;
        }
    }
    
    this.gameEnd = function() {
        
    }
    
    
//    this.changeToScene = function(scene) {
//    }

    
    this.start = function() {
        var currentScene = this.app.stage.getChildAt(this.currentSceneindex);
        console.log("in start");
        //console.log(currentScene);
        currentScene.visible = true;
    }
    
}


