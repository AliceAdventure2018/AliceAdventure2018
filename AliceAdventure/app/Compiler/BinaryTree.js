//asychronous fs+JSON.parser version

'use strict';

function BST(val){
	this.value =value;
	this.right = null;
	this.left = null;
}

BST.prototype.insert = function(val){
	if (val <= this.value){
		if(!this.left)this.left = new BST(val);
		else this.left.insert(val);
	}
	else {
		if(!this.right) this.right = new BST(val);
		else this.right.insert(val);
	}
}

BST.prototype.contains = function(val){
	if (this.value === val) return true;
	if (val < this.value){
		if(!this.left) return false;
		else return this.left.contains(val);
	}
	else{
		if (!this.right)return false;
		else return this.right.contains(val);
	}
}

module.exports = BST;