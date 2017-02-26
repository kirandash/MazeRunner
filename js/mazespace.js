"use strict";

//MazeSpace object for each space box
function MazeSpace() {
	this.north = false;
	this.east = false;
	this.south = false;
	this.west = false;
}

//Method to set wall on either of 4 sides for MazeSpace object
MazeSpace.prototype.setWall = function(direction){
	this[direction] = true;//access property as this.north = true or this["north"] = true
}