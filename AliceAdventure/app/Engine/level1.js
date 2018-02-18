var app = new Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);

var myInventory = new Inventory();


//----------//
var back = PIXI.Sprite.fromImage('assets/back.png');
back.anchor.set(0.5);
back.x = app.screen.width / 2;
back.y = app.screen.height / 2;

app.stage.addChild(back);
    


var door = PIXI.Sprite.fromImage('assets/door.png');
door.anchor.set(0.5);

//properties
door.x = app.screen.width / 2;
door.y = app.screen.height / 2;
door.name = "door";
door.nextTexture = PIXI.Texture.fromImage('assets/treasure.png');

app.stage.addChild(door);


var key = PIXI.Sprite.fromImage('assets/key.png');
key.anchor.set(0.5);

//properties
key.x = app.screen.width / 3;
key.y = app.screen.height / 3;
key.interactive = true;
key.buttonMode = true;
key.name = "key";
key.target = door; // init sequence matters


//user overload methods
key.use = function() {
    
}

key.use = function() {
    key.target.setTexture(door.nextTexture);//this line could also be written in door
    
    
}

//listeners
key.onClick = function() {
    myInventory.add(this);
}

key.on('pointerdown', key.onClick);
app.stage.addChild(key);


var key2 = PIXI.Sprite.fromImage('assets/explorer.png');
key2.anchor.set(0.5);
//properties
key2.x = app.screen.width / 4;
key2.y = app.screen.height / 4;
key2.interactive = true;
key2.buttonMode = true;
key2.name = "key2";

key2.onClick = function() {
    myInventory.add(this);
}

key2.on('pointerdown', key2.onClick);
app.stage.addChild(key2);





