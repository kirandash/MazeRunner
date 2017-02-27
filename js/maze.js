// Maze Object
"use strict"; // Causes Modern browsers to use JS in a stricter context and thus avoid common mistakes

//Define a constructor function
function Maze(width, height) {
	//'this' keyword is use to set the properties of an object - refers to current context
	//Dimension properties
	this.width = width;
	this.height = height;

	this.startX = null;
	this.startY = null;//starting co-ordinates
	this.startOrientation = null;//direction robot will be facing while start
	this.endX = null;
	this.endY = null;//ending co-ordinates

	//Array containing maze spaces
	this.directions = ["north","east","south","west"]; //DRY keep directions at one place
	this.spaces = [];

	var x,y;
	for(x = 1; x <= width; x += 1) {
		this.spaces[x] = [];
		for(y = 1; y <= height; y += 1) {
			this.spaces[x][y] = new MazeSpace(this.directions);//New MazeSpace object for each column
		}
	}
}

//Create method in JS object by adding a function to its prototype property (Note that JS does not have classes)
//Setter methods for validation before setting property to check if properties are in bounds of maze
Maze.prototype.setStart = function(x, y, orientation) {
	if(this.isInBounds(x , y) && this.isValidDirection(orientation)){
		this.startX = x;
		this.startY = y;
		this.startOrientation = orientation; //Update the Maze properties
		return true;
	}
	return false;
}

//Exit point method
Maze.prototype.setEnd = function(x, y) {
	if(!(this.isInBounds(x , y))){
		return false;
	}
	this.endX = x;
	this.endY = y;
	return true;
}

//SetWall method for maze
Maze.prototype.setWall = function(x, y, direction) {
	//Check if assigned properties are within bounds of maze
	if(this.isInBounds(x , y) && this.isValidDirection(direction)){
		this.spaces[x][y].setWall(direction);
		return true; //successful
	}
	return false;//not in bound - so don't set bound
}

//Valid direction check method
Maze.prototype.isValidDirection = function(direction) {
	return this.directions.indexOf(direction) !== -1
}

//Inbounds check method
Maze.prototype.isInBounds = function(x , y) {
	return x > 0 && x <= this.width && y > 0 && y <= this.height;
}

//canMove check
Maze.prototype.canMove = function(x, y, direction) {
	if(!this.isValidDirection(direction)){
		return false;
	}

	if(!this.isInBounds(x , y)){
		return false;
	}

	//Code to get maze space infront of runner and see if it is in bound
	var forwardX, forwardY;
	switch (direction) {
		case "north":
			forwardX = x;
			forwardY = y+1;
		break;
		case "east":
			forwardX = x+1;
			forwardY = y;
		break;
		case "south":
			forwardX = x;
			forwardY = y-1;
		break;
		case "west":
			forwardX = x-1;
			forwardY = y;
		break;
	}
	//Check if the front space is in bounds
	if(!this.isInBounds(forwardX,forwardY)){
		return false;
	}

	//Check if there is a wall
	if(this.spaces[x][y][direction]) {
		return false;
	}

	//Check wall by checking wall in opposit side of front maze space
	var opposites = {
		north: "south",
		east: "west",
		south: "north",
		west: "east"		
	};

	if(this.spaces[forwardX][forwardY][opposites[direction]]) {
		return false;
	}

	return true;
}