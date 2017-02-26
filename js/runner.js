"use strict";

//Define Runner constructor
function Runner() {
	this.x = null;
	this.y = null;
	this.orientation = null;
	this.maze = null;
}

//SetMaze for Runner
Runner.prototype.setMaze = function(maze) {
	this.maze = maze;
	this.x = maze.startX;
	this.y = maze.startY;
	this.orientation = maze.startOrientation;
}

//Runner turnRight method
Runner.prototype.turnRight = function() {
	//Return false if runner not in a maze
	if(!this.maze || !this.maze.isValidDirection(this.orientation)){
		return false;
	}
	var rights = {
		north: "east",
		east: "south",
		south: "west",
		west: "north"
	}
	this.orientation = rights[this.orientation];// Update runner's orientation property by taking mazes orientaion and matching it from right object
	return true;
}

//Runner turnLeft method
Runner.prototype.turnLeft = function() {
	//Return false if runner not in a maze
	if(!this.maze || !this.maze.isValidDirection(this.orientation)){
		return false;
	}
	var lefts = {
		north: "west",
		east: "north",
		south: "east",
		west: "south"
	}
	this.orientation = lefts[this.orientation];// Update runner's orientation property by taking mazes orientaion and matching it from left object
	return true;
}