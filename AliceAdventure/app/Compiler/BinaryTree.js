//asychronous fs+JSON.parser version

'use strict';

function INode(eventString, eventType, args, condWithReact){
	this.event = eventString;
	this.type = eventType;
	this.args = args;
	this.condWithReact = condWithReact;

	this.left = null;
	this.rigt = null;
}

function ITree(){
	this.root = null;
}

ITree.prototype.putNode = function(eventString, eventType, args, condWithReact){

	this.root = _putNode.call(this, this.root, eventString, eventType, args, condWithReact);
}

ITree.prototype.getEverything = function () {
	
	return _postOrder.call(this, this.root, "");
}


function _putNode(n, eventString, eventType, args, condWithReact){
	if (n == null){
		//console.log(1);
		var toReturn = new INode(eventString, eventType, args, condWithReact);
		return toReturn;
	}
	// if equals to the current node, append condWithReact to the node
	else if (sameTypeSameArg(n, eventType, args)){
		n.condWithReact += "\n" + condWithReact;
		return n;
	}
	//add new ones
	else{

		if (n.left == null || (n.left != null && n.right != null)) n.left = _putNode(n.left, eventString, eventType, args, condWithReact);
	
		else n.right = _putNode(n.right, eventString, eventType, args, condWithReact);

		return n;
	}
}

function _postOrder(n, string){
	if (n != null){
		var end;
		if (n.type == 0) end = "}//interaction end\n";
		else end = "}); //interaction end\n";

		if (n.left !== null) 
			return _postOrder(n.left, string + _getString(n) + end);

		if(n.right !== null) return  _postOrder(n.right, string + _getString(n)+ end);
	}else{
		return string;
	}
}

function _getString(n){
	return n.event + n.condWithReact;
}

function sameTypeSameArg(n, eventType, args){
	return _sameTypeSameArg(n.type, n.args, eventType, args);
}

// return true if types AND args are all the same
function _sameTypeSameArg(e0, a0, e1, a1){
	return (e0 === e1) && sameArg(a0, a1);
}

// return true if the order and the elements in a0 and a1 are the same
function sameArg(a0, a1){
	if (a0.length != a1.length) return false;
	else if (a0.length == 0) return true; // need attention, since no event will have zero args now
	else {
		//order MATTERS
		return (a0.toString() === a1.toString());
	}
}


module.exports = ITree;