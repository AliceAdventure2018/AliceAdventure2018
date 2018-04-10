var x =0, y=0;
interact('.interaction-box')
  .draggable({
    // enable inertial throwing
    inertia: false,
    snap: {
      targets: [
        interact.createSnapGrid({ x: 30, y: 30 })
      ],
      range: Infinity,
      relativePoints: [ { x: 0, y: 0 } ]
    },

    onmove: dragMoveListener,
    // keep the element within the area of it's parent
    restrict: {
    // restriction: "parent",

    //  endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
   // autoScroll: true,

    // call this function on every dragmove event
    
    // call this function on every dragend event
    
  })
  .on('doubletap', function (event) {
    var target = event.target || event.srcElement;
    var index = target.style.zIndex;
    if(index === null){
      target.style.zIndex = 0;
      index =0;
    }else{
      index++;
      console.log(index);
      target.style.zIndex = index;
    }

    

  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

 
    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;