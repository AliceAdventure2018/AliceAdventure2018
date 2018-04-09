function detectDrag(){

	dragElement(document.getElementsByClassName(("interaction-box")));
}




function dragElement(elmnt) {
	

  var pos1, pos2, pos3, pos4;
  var iterator;
  for(i=0;i<elmnt.length;i++){
  	if (elmnt[i] !== null) {
  		
    /* if present, the header is where you move the DIV from:*/
    	elmnt[i].onmousedown = dragMouseDown(){
    		iterator = elmnt[i]; console.log("drag");
		  	console.log(elmnt[i]);
		    elmnt[i] = elmnt[i] || window.event;
		    console.log(elmnt[i]);
		    // get the mouse cursor position at startup:
		    pos3 = elmnt[i].clientX;
		    pos4 = elmnt[i].clientY;
		    document.onmouseup = closeDragElement;
		    // call a function whenever the cursor moves:
		   // document.onmousemove = elementDrag;
		  };

    	
	  }

  }

  
   

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    iterator.style.top = (iterator.offsetTop - pos2) + "px";
    console.log(iterator.style.top);
    iterator.style.left = (iterator.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}