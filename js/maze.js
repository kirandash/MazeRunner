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
	this.spaces = [];

	var x,y;
	for(x = 1; x < width; x += 1) {
		this.spaces[x] = [];
		for(y = 1; y <= height; y += 1) {
			this.spaces[x][y] = "(" + x + "," + y + ")"; //Text representation of co-ordinates for columns in each row
		}
	}
}

//Create method in JS object by adding a function to its prototype property (Note that JS does not have classes)
//Setter methods for validation before setting property to check if properties are in bounds of maze
Maze.prototype.setStart = function(x, y, orientation) {
	this.startX = x;
	this.startY = y;
	this.startOrientation = orientation; //Update the Maze properties
}

//Exit point method
Maze.prototype.setEnd = function(x, y) {
	this.endX = x;
	this.endY = y;
}