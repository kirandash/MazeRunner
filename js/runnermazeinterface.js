function RunnerMazeInterface(runner,maze,selector
  ) {
  this.runner = runner;
  this.maze  = maze;
  this.selector = selector;
}

RunnerMazeInterface.prototype.canMove = function (x, y, direction) {
  var forwardX, forwardY, forwardDirection;

  if (["north","east","south","west"].indexOf(direction) === -1) {
    return false;
  }

  switch (direction) {
    case "north":
      forwardX = x;
      forwardY = y+1;
      forwardDirection = "south";
      break;
    case "east":
      forwardX = x+1;
      forwardY = y;
      forwardDirection = "west";
      break;
    case "south":
      forwardX = x;
      forwardY = y-1;
      forwardDirection = "north";
      break;
    case "west":
      forwardX = x-1;
      forwardY = y;
      forwardDirection = "east";
      break;
  }

  if (forwardX <= 0 || forwardX > this.maze.width || forwardY <= 0 || forwardY > this.maze.height) {
    return false
  }

  if (this.maze.spaces[x][y][direction]) {
    return false
  }

  if (this.maze.spaces[forwardX][forwardY][forwardDirection]) {
    return false
  }

  return true
}

RunnerMazeInterface.prototype.render = function () {
  $(this.selector).empty().append(this.renderMaze(), this.renderControls());
};

RunnerMazeInterface.prototype.renderMaze = function () {
  var $maze = $("<div class='maze'>");
  var $mazeRow, $mazeSpace;
  for (var y=this.maze.height; y >= 1; y -=1 ){
    $mazeRow = $('<div class="mazeRow">').appendTo($maze);
    for (var x=1; x <= this.maze.width; x +=1 ){
      $mazeSpace = $('<div class="mazeSpace">').appendTo($mazeRow);
      $mazeSpace.append(this.renderSpace(x,y));
      $mazeSpace.append("&nbsp;")
        .toggleClass('north', !this.canMove(x, y, 'north'))
        .toggleClass('south', !this.canMove(x, y, 'south'))
        .toggleClass('east', !this.canMove(x, y, 'east'))
        .toggleClass('west', !this.canMove(x, y, 'west'));
    }
  }
  return $maze;
}

RunnerMazeInterface.prototype.renderSpace = function (x,y) {
  var isrunner = false;
  var isStart = false;
  var isEnd = false;

  if (this.runner !== null && this.runner.x == x && this.runner.y == y) {
      isrunner = true;
  }
  if (this.maze.endX == x && this.maze.endY == y) {
      isEnd = true;
  }
  if (this.maze.startX == x && this.maze.startY == y)  {
      isStart = true;
  }

  if (!isrunner && !isStart && !isEnd) {
    return "";
  }

  var icons = {
    start: "icon-screenshot",
    end: "icon-remove-circle",
    northrunner: "icon-arrow-up",
    eastrunner: "icon-arrow-right",
    southrunner: "icon-arrow-down",
    westrunner: "icon-arrow-left",
    northrunnerStart: "icon-circle-arrow-up",
    eastrunnerStart: "icon-circle-arrow-right",
    southrunnerStart: "icon-circle-arrow-down",
    westrunnerStart: "icon-circle-arrow-left",
    runnerEnd: "icon-ok-sign "
  }  
  var $space = $('<i>');

  if (isrunner) {
    $space.addClass("runner");
  }
  if (isStart) {
    $space.addClass("start");
  }
  if (isEnd) {
    $space.addClass("end");
  }

  if (isrunner && isEnd) {
    $space.addClass(icons["runnerEnd"]);    
  } else if (isrunner && isStart) {
    $space.addClass(icons[this.runner.orientation + "runnerStart"]);
  } else if (isrunner) {
    $space.addClass(icons[this.runner.orientation + "runner"]);
  } else if (isEnd) {
    $space.addClass(icons["end"]);        
  } else if (isStart)  {
    $space.addClass(icons["start"]);        
  }  

  return $space;

}

RunnerMazeInterface.prototype.renderControls = function () {
  var interface = this;
  if (interface.runner === null) return false;
  var $actions = $("<div class='actions'>");
  

  var buttons = {};
  if(typeof interface.runner.turnLeft == 'function') { 
    buttons["Turn Left"] = function () {
        interface.runner.turnLeft();
        interface.render();
      };
  }
  if(typeof interface.runner.turnRight == 'function') { 
    buttons["Turn Right"] = function () {
        interface.runner.turnRight();
        interface.render();
      };
  }
  if(typeof interface.runner.moveForward == 'function') {   
  buttons["Move Forward"] = function () {
      interface.runner.moveForward();
      interface.render();
    };
  }
  if(typeof interface.runner.canMoveForward == 'function') {   
    buttons["Can Move Forward?"] = function () {
        if (interface.runner.canMoveForward()) {
            alert("Yes!");
        } else {
            alert ("No.");
        }
      };
  }
  if(typeof interface.runner.setMaze == 'function') {   
    buttons["Place in Maze"] = function () {
        interface.runner.setMaze(interface.maze);
        interface.render();
      };
  }
  if(typeof interface.runner.exitMaze == 'function') {   
    buttons["Exit Maze"] = function () {    
        if (interface.runner.maze == interface.maze) {
          (function callExitMaze(){
              setTimeout(function() {
                  result = interface.runner.exitMaze(1);
                  interface.render();
                  if (result === false) {
                      callExitMaze();
                  }
                 return result;
              }, 300);
          })();
        }
      };
  }

  for (var label in buttons) {
    if (buttons.hasOwnProperty(label)){
      var $btn = $('<a class="btn">')
        .text(label)
        .appendTo($actions)
        .click(buttons[label]);
    }
  }

  if (this.runner.maze != this.maze) {
    $runner = $('<i class="runner icon-user"></i>').appendTo($actions);
  }  

  return $actions;
}

