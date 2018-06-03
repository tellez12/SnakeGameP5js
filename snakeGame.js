/*jslint node: true */
'use strict';
const squareSize = 30;
const scoreFood = 1;
const xWidth = 1000;
const yHeight = 600;
let score;
let direction, size, speed;
let f, s;
let divScore;
let playing;

function setup() {
	createCanvas(xWidth, yHeight);
	playing = true;
	speed = 30;
	f = new Food();
	direction = "left";
	s = new Snake();
	divScore = createDiv('Score = 0');
	divScore.html("");
	divScore.position(20, 20);
	divScore.id = 'score';
	divScore.style('color', 'white');
	score = 1;
}

function draw() {
	background(51);
	f.show();
	if (playing) {
		s.update();
		divScore.html('Score = ' + (score));
	} else {
		divScore.html('GAME OVER Score = ' + (score));
	}
	s.show();

	frameRate(15);
	//showFps();

}

function showFps() {
	var fps = frameRate();
	fill(255);
	stroke(0);
	text("FPS: " + fps.toFixed(2), 10, height - 10);
}
class Base {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	show() {
		rect(this.x, this.y, squareSize, squareSize);
	}
}
class Snake extends Base {

	constructor() {
		super(width / 2, height / 2);
		this.tail = new Array();
		this.color = color(21, 84, 35);

	}
	show() {

		fill(this.color);
		super.show();

		this.tail.forEach(function (element) {
			element.show();
		});
	}
	update() {
		let lastX = this.x;
		let lastY = this.y;


		if (direction == 'left') {
			this.x = this.x - speed;
		} else if (direction == 'right') {
			this.x = this.x + speed;
		} else if (direction == 'up') {
			this.y = this.y - speed;
		} else if (direction == 'down') {
			this.y = this.y + speed;
		}
		this.updateTail(lastX, lastY);
		this.checkFood();
		if (this.checkTailCollision() || this.checkBorderCollision()) {
			playing = false;
		}


	}

	updateTail(lastX, lastY) {

		if (this.tail.length >= 1) {
			this.tail.unshift(this.tail.pop());
			this.tail[0].x = lastX;
			this.tail[0].y = lastY;
		}

	}
	checkCollision(other) {
		if (abs(this.x - other.x) < squareSize && abs(this.y - other.y) < squareSize) {
			return true;
		}
		return false;
	}
	checkFood() {
		if (this.checkCollision(f)) {
			//Create it out of the screen and then make it follow the others.
			this.tail.push(new Base(-50, -50));
			f = new Food();
			score = score + scoreFood;
		}
	}

	checkTailCollision() {
		return this.tail.some(x => this.checkCollision(x));
	}

	checkBorderCollision() {
		let r = squareSize / 2;
		if (this.x + r > width || this.y + r > height || this.x - r < 0 || this.y - r < 0) {
			return true;
		}
		return false;
	}


}

class Food extends Base {

	constructor() {
		let offset = 10;
		let x = random(offset, width - offset);
		let y = random(offset, height - offset);
		super(x, y);
	}
	show() {
		fill(255, 0, 0);
		super.show();
	}

}

function keyPressed() {
	switch (keyCode) {
		case LEFT_ARROW:
			if (direction != 'right') {
				direction = 'left';
			}
			break;
		case RIGHT_ARROW:
			if (direction != 'left') {
				direction = 'right';
			}
			break;
		case UP_ARROW:
			if (direction != 'down') {
				direction = 'up';
			}
			break;
		case DOWN_ARROW:
			if (direction != 'up') {
				direction = 'down';
			}
			break;
	}
}
