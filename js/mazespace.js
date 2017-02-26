"use strict";

//MazeSpace object for each space box
function MazeSpace(directions) {
	var i;
	for(i = 0; i < directions.length; i += 1) {
		this[directions[i]] = false;
	}
}

//Method to set wall on either of 4 sides for MazeSpace object
MazeSpace.prototype.setWall = function(direction){
	this[direction] = true;//access property as this.north = true or this["north"] = true
}