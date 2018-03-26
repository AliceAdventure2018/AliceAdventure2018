var myGame = new GameManager();
myGame.init(1280,720,5);
myGame.sceneManager.createScenes(2);

///------------------------------------------------------------///

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
myGame.scene(0).addChild(door);


var door2 = Alice.Object.fromImage(baseURL.nomalAssets + 'door_open.png');
door2.anchor.set(0.5);
door2.x = myGame.screenWidth / 2;
door2.y = myGame.screenHeight / 2 + 5;
door2.scale.set(1);
door2.visible = false;
door2.name = "door2";
myGame.scene(0).addChild(door2);


var key = Alice.Object.fromImage(baseURL.nomalAssets + 'key.png');
key.anchor.set(0.5);
key.x = 900;
key.y = 600;
key.scale.set(0.7);

key.interactionSystem = new InteractionSystem(key);

//interctions editor
var tempInteraction = new Interaction();
tempInteraction.reaction = function() {
    myGame.inventory.add(key);
}

key.interactionSystem.clickCollection.add(tempInteraction)

tempInteraction = new Interaction();
tempInteraction.reaction = function() {
    myGame.messageBox.startConversation(["It is a key"]);
}

key.interactionSystem.InventoryObserve.add(tempInteraction)


//
//key.target = door; // init sequence matters
//key.dropMessage = "keyDropOnDoor"
//
//key.on("keyDropOnDoor",function(){
//    this.target.interact();
//    myGame.inventory.remove(this);
//    myGame.messageBox.startConversation(["Nice job! Thank you!"]);
//});

myGame.scene(0).addChild(key);



/////

//when key is used on door
tempInteraction = new Interaction();
tempInteraction.reaction = function() {
    myGame.messageBox.startConversation(["opened"]);
}
myGame.inventory.interactionSystem.addUseEvent("key","door",tempInteraction);








/////




//--//
myGame.start();