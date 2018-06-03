 // Minesweeper game


// initializes variables
var grid;
var cols;
var rows;
var w = 20;

// bees == bombs
var totalBees = 15;
//	1`var gameOver = false;
var won = true;
var totalRevealed = 0;
var totalMarked = 0;


// set up board
function setup() {
  createCanvas(201, 201);
  cols = floor(width / w);
  rows = floor(height / w);

  grid = make2DArray(cols, rows);

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j, w);
		}
	}

	// pick totalBees spots randomly
	var options = [];
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			options.push([i, j]);
		}
	}

	for (var n = 0; n < totalBees; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];
		// Deletes spot so no longer an option
		options.splice(index, 1);
		grid[i][j].bee = true;
	}

	// count number of bees for each spot
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].countBees();
		}
	}
}

// makes 2D array of columns and rows in board
function make2DArray() {
	var arr = new Array(cols);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

// when bomb is clicked, reveal entire board
function gameOver() {
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].revealed = true;
		}
	}
	console.log("Game over");
}

 function win() {
 	for (var i = 0; i < cols; i++) {
 		for (var j = 0; j < rows; j++) {
 			grid[i][j].revealed = true;
 		}
 	}
 	console.log("You won!");
 }

// clicking the mouse on a certain square
function mousePressed() {
  for (var i = 0; i < cols; i++) {
	for (var j = 0; j < rows; j++) {
		if (grid[i][j].contains(mouseX, mouseY)) {
			grid[i][j].reveal();
		}
		
		if (!grid[i][j].revealed && grid[i][j].marked && !grid[i][j].bee) {
			totalRevealed++;
		}

		if (grid[i][j].revealed && grid[i][j].bee) {
 			gameOver();
 			}

		if (totalRevealed + totalBees + totalMarked >= cols * rows && !gameOver) {
			win();
			}

			}
		}
	}


// draws board/*
function draw() {
  background(255);
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show();
		}
	}
}
