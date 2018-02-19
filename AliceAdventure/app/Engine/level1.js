var myGame = new GameManager();
myGame.init(1280,720,5);

// ----------------------------scene1--------------------------------//
var scene = new PIXI.Container();
myGame.addScene(scene);

var back = PIXI.Sprite.fromImage('assets/alice/room_basic.png');
back.anchor.set(0.5);
back.x = myGame.screenWidth / 2;
back.y = myGame.screenHeight / 2;

scene.addChild(back);
    

var door = PIXI.Sprite.fromImage('assets/alice/door.png');
door.anchor.set(0.5);
door.x = myGame.screenWidth / 2;
door.y = myGame.screenHeight / 2 + 5;
door.scale.set(1);
door.name = "door";
door.nextTexture = PIXI.Texture.fromImage('assets/alice/door_open.png');

door.interact = function() {
    this.setTexture(this.nextTexture);
    this.interactive = true;
    this.buttonMode = true;
    
    this.on('pointerdown', this.onClick);
}

door.onClick = function() {
    myGame.nextScene();
}

scene.addChild(door);


var key = PIXI.Sprite.fromImage('assets/alice/key.png');
key.anchor.set(0.5);
key.x = 900;
key.y = 400;
key.scale.set(0.7);
key.interactive = true;
key.buttonMode = true;
key.name = "key";
key.target = door; // init sequence matters

//user overload methods
key.use = function() {
    
}

key.use = function() {
    this.target.interact();
    this.visible = false;
    console.log("done");
}

key.onClick = function() {
    myGame.inventory.add(this);
}
key.on('pointerdown', key.onClick);

scene.addChild(key);


var key2 = PIXI.Sprite.fromImage('assets/alice/cat.png');
key2.anchor.set(0.5);
key2.x = 250;
key2.y = 500;
key2.scale.set(0.8);

key2.interactive = true;
key2.buttonMode = true;
key2.name = "key2";

key2.onClick = function() {
    myGame.inventory.add(this);
}

key2.on('pointerdown', key2.onClick);
scene.addChild(key2);

// ----------------------------scene2--------------------------------//
var scene2 = new PIXI.Container();
myGame.addScene(scene2);

var back2 = PIXI.Sprite.fromImage('assets/alice/backdrop.png');
back2.anchor.set(0.5);
back2.x = myGame.screenWidth / 2;
back2.y = myGame.screenHeight / 2;

scene2.addChild(back2);

var robot = PIXI.Sprite.fromImage('assets/alice/robot.png');
robot.anchor.set(0.5);
robot.scale.set(1.4);
robot.x = myGame.screenWidth / 2;
robot.y = myGame.screenHeight / 2;
scene2.addChild(robot);


var paint = PIXI.Sprite.fromImage('assets/alice/whitepaint.png');
paint.anchor.set(0.5);
paint.x = 300;
paint.y = 500;
paint.name = "paint";
scene2.addChild(paint);


var cone = PIXI.Sprite.fromImage('assets/alice/redcone.png');
cone.anchor.set(0.5);
cone.x = 900;
cone.y = 500;
cone.scale.set(1.2);
cone.interactive = true;
cone.buttonMode = true;
cone.name = "key";
cone.target = paint; // init sequence matters
cone.nextTexture = PIXI.Texture.fromImage('assets/alice/whitecone.png');

cone.use = function() {
    this.setTexture(this.nextTexture);
    myGame.inventory.add(this);
}

cone.onClick = function() {
    myGame.inventory.add(this);
}

cone.on('pointerdown', cone.onClick);
scene2.addChild(cone);

//////////////////////////////////////////////////////////////

myGame.start();


