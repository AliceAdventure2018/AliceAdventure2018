var myGame = new GameManager();
myGame.init();

//first scene
var scene = new PIXI.Container();

myGame.addScene(scene);

var back = PIXI.Sprite.fromImage('assets/back.png');
back.anchor.set(0.5);
back.x = myGame.app.screen.width / 2;
back.y = myGame.app.screen.height / 2;

scene.addChild(back);
    

var door = PIXI.Sprite.fromImage('assets/door.png');
door.anchor.set(0.5);

//properties
door.x = myGame.app.screen.width / 2;
door.y = myGame.app.screen.height / 2;
door.name = "door";
door.nextTexture = PIXI.Texture.fromImage('assets/treasure.png');

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


var key = PIXI.Sprite.fromImage('assets/key.png');
key.anchor.set(0.5);

//properties
key.x = myGame.app.screen.width / 3;
key.y = myGame.app.screen.height / 3;
key.interactive = true;
key.buttonMode = true;
key.name = "key";
key.target = door; // init sequence matters


//user overload methods
key.use = function() {
    
}

key.use = function() {
    this.target.interact();
    console.log("done");
}

//listeners
key.onClick = function() {
    myGame.inventory.add(this);
}

key.on('pointerdown', key.onClick);
scene.addChild(key);


var key2 = PIXI.Sprite.fromImage('assets/explorer.png');
key2.anchor.set(0.5);
//properties
key2.x = myGame.app.screen.width / 4;
key2.y = myGame.app.screen.height / 4;
key2.interactive = true;
key2.buttonMode = true;
key2.name = "key2";

key2.onClick = function() {
    myGame.inventory.add(this);
}

key2.on('pointerdown', key2.onClick);
scene.addChild(key2);

console.log("here");
myGame.start();


