/*global PIXI*/
var app = new PIXI.Application({ 
  width: 256,         // default: 800
  height: 256,        // default: 600
  antialias: true,    // default: false
  transparent: false, // default: false
  resolution: 1,      // default: 1
  backgroundColor: 0x000000
}

);
document.body.appendChild(app.view);

//var texture = PIXI.utils.TextureCache["img/bunny.png"];
var sprite;
var data;
PIXI.loader.add("img/bunny.png").load(function(){
  sprite = new PIXI.Sprite(PIXI.loader.resources["img/bunny.png"].texture);
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;
  
  // Opt-in to interactivity
  sprite.interactive = true;

  // Shows hand cursor
  sprite.buttonMode = true;
  
  sprite
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove);
      
  var onDrag = false;    
  
  function onDragStart(event) {
      onDrag = true;
      data = event.data;
  }
  
  function onDragEnd() {
      onDrag = false;
  }
  
  function onDragMove() {
      if (onDrag) {
          var newPosition = data.getLocalPosition(sprite.parent);
          sprite.x = newPosition.x;
          sprite.y = newPosition.y;
      }
  }
  app.stage.addChild(sprite);
});