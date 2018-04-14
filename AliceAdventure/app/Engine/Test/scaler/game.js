

myGame.init(1280,720,8);

var reaction = myGame.reactionSystem;
//myGame.init(600,400,5);
//myGame.init(1280*2/4,720*2/4,5);
myGame.sceneManager.createScenes(3);
//myGame.states = {cat_is_feeded:false}
myGame.initStateManager({cat_is_feeded:false});

///------------------------------------------------------------///
//myGame.sound.add('meow_unhappy', baseURL.nomalAssets + 'meow_unhappy.wav');
//myGame.sound.add('meow_happy', baseURL.nomalAssets + 'meow_happy.wav');
//myGame.sound.add('door', baseURL.nomalAssets + 'door.wav');
//myGame.sound.add('win', baseURL.nomalAssets + 'win.wav');

myGame.soundManager.load('meow_unhappy', baseURL.nomalAssets + 'meow_unhappy.wav');
myGame.soundManager.load('meow_happy', baseURL.nomalAssets + 'meow_happy.wav');
myGame.soundManager.load('door', baseURL.nomalAssets + 'door.wav');
myGame.soundManager.load('win', baseURL.nomalAssets + 'win.wav');

///-----------------------------------------------------------///

var back = Alice.Object.fromImage(baseURL.nomalAssets + 'room_basic.png');
back.anchor.set(0.5);
back.x = myGame.screenWidth / 2;
back.y = myGame.screenHeight / 2;
back.name = "back";
myGame.scene(0).addChild(back);


var door = Alice.Object.fromImage(baseURL.nomalAssets + 'door.png');
door.anchor.set(0.5);
door.x = myGame.screenWidth / 2;
door.y = myGame.screenHeight / 2 + 5;
door.scale.set(1);
door.name = "door";
reaction.makeClickable(door);

//door.interactive = true;
//door.buttonMode = true;
//door.on('pointerdown',function() {
//    //myGame.sound.play('door');
//    reaction.playAudio('door');
//    //myGame.sceneManager.jumpToScene(1);
//    reaction.transitToScene(1);
//});

myGame.scene(0).addChild(door);

var cat = new Alice.Object(new PIXI.Texture.fromImage(baseURL.nomalAssets + 'cat_sad.png'));
cat.anchor.set(0.5);
cat.x = 250;
cat.y = 500;
cat.scale.set(1);
cat.name = "cat";
cat.interactive = true;
//cat.buttonMode = true;
myGame.scene(0).addChild(cat);


//reaction.makeDraggable(cat);
//reaction.makeClickable(cat);
//cat.DIY_CLICK = function() {
//    helper.showHelper(cat,myGame.scene(0));
//}

cat.on('pointerdown',function() {
//    console.log(cat.width, cat.height);
//    var graphics = new PIXI.Graphics();
//    graphics.lineStyle(4, 0xffd900, 1);
//    graphics.drawShape(cat.getBounds());
//    myGame.scene(0).addChild(graphics);
    //console.log("hehe")
    helper.showHelper(cat, myGame.scene(0));
//    console.log(cat.width)
//    cat.scale.set(2);
//    console.log(cat.width)
//    console.log(cat.texture.orig.width)
})



var helper = new ScaleHelper();

function ScaleHelper() {
    this.helperContainer = null;
    this.graphics = null;
    this.curScene = null;
    this.curObj = null;
    
    this.init = function() {
        this.helperContainer = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(4, 0xffd900, 1);
        
        this.initSquare();
        this.helperContainer.visible = false;
        this.helperContainer.addChild(this.graphics);
    }
    
    this.initSquare = function() {
        this.helperContainer.removeChildren();
        for(var i = 0; i < 4; i++) {
            var sqr = this.createSquare(0,0);
                switch(i) {
                case 0:
                    sqr.tint = 0xff0000;
                    break;
                case 1:
                    sqr.tint = 0x00ff00;
                    break;
                case 2:
                    sqr.tint = 0x0000ff;
                    break;
                case 3:
                    break;
                }
            this.helperContainer.addChild(sqr);
            
        }
    }
    
    this.drawLines = function(rect) {
        this.graphics.drawShape(rect);
    }
    
    this.setSquares = function(bound) {
        console.log(this.curObj.scale.x)
        console.log(this.curObj.scale.y)
        if(this.curObj.scale.x > 0 && this.curObj.scale.y > 0) {
            this.helperContainer.getChildAt(0).x = bound.x;
            this.helperContainer.getChildAt(0).y = bound.y;

            this.helperContainer.getChildAt(1).x = bound.x + bound.width;
            this.helperContainer.getChildAt(1).y = bound.y;

            this.helperContainer.getChildAt(2).x = bound.x;
            this.helperContainer.getChildAt(2).y = bound.y + bound.height;

            this.helperContainer.getChildAt(3).x = bound.x + bound.width;
            this.helperContainer.getChildAt(3).y = bound.y + bound.height;
            
        } else if(this.curObj.scale.x < 0 && this.curObj.scale.y > 0) {
            
            this.helperContainer.getChildAt(1).x = bound.x;
            this.helperContainer.getChildAt(1).y = bound.y;

            this.helperContainer.getChildAt(0).x = bound.x + bound.width;
            this.helperContainer.getChildAt(0).y = bound.y;

            this.helperContainer.getChildAt(3).x = bound.x;
            this.helperContainer.getChildAt(3).y = bound.y + bound.height;

            this.helperContainer.getChildAt(2).x = bound.x + bound.width;
            this.helperContainer.getChildAt(2).y = bound.y + bound.height;
            
        } else if(this.curObj.scale.x > 0 && this.curObj.scale.y < 0) {
            
            this.helperContainer.getChildAt(2).x = bound.x;
            this.helperContainer.getChildAt(2).y = bound.y;

            this.helperContainer.getChildAt(3).x = bound.x + bound.width;
            this.helperContainer.getChildAt(3).y = bound.y;

            this.helperContainer.getChildAt(0).x = bound.x;
            this.helperContainer.getChildAt(0).y = bound.y + bound.height;

            this.helperContainer.getChildAt(1).x = bound.x + bound.width;
            this.helperContainer.getChildAt(1).y = bound.y + bound.height;
            
        } else {
            
            this.helperContainer.getChildAt(3).x = bound.x;
            this.helperContainer.getChildAt(3).y = bound.y;

            this.helperContainer.getChildAt(2).x = bound.x + bound.width;
            this.helperContainer.getChildAt(2).y = bound.y;

            this.helperContainer.getChildAt(1).x = bound.x;
            this.helperContainer.getChildAt(1).y = bound.y + bound.height;

            this.helperContainer.getChildAt(0).x = bound.x + bound.width;
            this.helperContainer.getChildAt(0).y = bound.y + bound.height;
            
        }
        
    }
    
    this.count = 0
    
    this.createSquare = function(x, y) {
        var square = new PIXI.Sprite(PIXI.Texture.WHITE);
        
        
        
        //square.tint = 0xff0000;
        square.factor = 1;
        square.anchor.set(0.5);
        square.position.set(x, y);
        square.interactive = true;
        
        square.cursor = 'grab'
        square
                .on('pointerdown', helperDragStart)
                .on('pointerup', helperDragEnd)
                //.on('pointerupoutside', onDragEnd)
                .on('pointermove', helperDragMove);
        this.count++;
        
        return square;
    }
    
    this.showHelper = function(_obj, _scene) {
        //console.log(_obj.name)
        this.curScene = _scene;
        this.curObj = _obj;
        
        //this.drawLines(this.curObj.getBounds());
        //this.helperContainer.addChild(this.graphics);
        this.setSquares(this.curObj.getBounds());
        this.helperContainer.visible = true;
        this.curScene.addChild(this.helperContainer)
    }
    
    this.hideHelper = function() {
        this.curScene.remove(this.helperContainer);
        this.curScene = null;
        this.curObj = null;
        this.helperContainer.visible = false;
    }
    
    this.updateSquares = function(dragSqr) {
        
        
        var x_scale = (dragSqr.x - this.curObj.x)/(this.curObj.texture.orig.width/2)
        var y_scale = (dragSqr.y - this.curObj.y)/(this.curObj.texture.orig.height/2)
        //console.log(x_scale)
        this.curObj.scale.set(x_scale,y_scale);

        this.setSquares(this.curObj.getBounds())
    }
    
    this.checkMoveable = function(dragSqr, newPos) {
        var index = this.helperContainer.getChildIndex(dragSqr);
        switch(index) {
            case 0:
                if(newPos.x < this.curObj.x && newPos.y < this.curObj.y)
                    return true;
                break;
            case 1:
                if(newPos.x > this.curObj.x && newPos.y < this.curObj.y)
                    return true;
                break;
            case 2:
                if(newPos.x < this.curObj.x && newPos.y > this.curObj.y)
                    return true;
                break;
            default:
                if(newPos.x > this.curObj.x && newPos.y > this.curObj.y)
                    return true;
                break;
        }
        
        return false;
        
    }
    
    this.init();

}


function helperDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function helperDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}

function helperDragMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        //if(newPosition.x > helper.curObj.x)
//        if(!helper.checkMoveable(this, newPosition))
//            return;
        
        this.x = newPosition.x;
        this.y = newPosition.y;
        helper.updateSquares(this);
    }
}


//--//
myGame.start(0);