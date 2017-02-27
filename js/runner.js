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

Runner.prototype.moveForward = function() {
	if(!this.canMoveForward()) {
		return false;
	}	
	switch (this.orientation) {
		case "north":
			this.y += 1;
			break;
		case "east":
			this.x += 1;
			break;
		case "south":
			this.y -= 1;
			break;
		case "west":
			this.x -= 1;
			break;						
	}
	return true;
}

Runner.prototype.canMoveForward = function() {
	if(!this.maze) {
		return false;
	}
	return this.maze.canMove(this.x, this.y, this.orientation); //Call the maze canMove function
}

// Follow the left - Move Forwar turn left - If can't turn right - Restriction - Inner wall must be connected to out
Runner.prototype.exitMaze = function(steps){
	if(this.maze){
		//while steps are not zero and runner is not at end point
		while(steps != 0){
			steps -= 1;
			//If runner in maze
			if(this.canMoveForward()){
				//If can move forward then move and turn left
				this.moveForward();
				this.turnLeft();
			}else{
				this.turnRight();
			}
			//When runner at end point
			if(this.x == this.maze.endX && this.y == this.maze.endY) {
				return true;
			}
		}
		return false; //when at end indicate did not exit maze
	}
}