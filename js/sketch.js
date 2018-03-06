
let ball;
let p1;
let p2;

function setup()
{

	createCanvas(windowWidth,windowHeight);
	p1 = new paddle(1,color('blue'));
	p2 = new paddle(2,color('red'));
	ball = new pelota();
}

function draw()
{
	background('black');
	drawline();
	ball.draw();
	ball.move();
	if (ball.collision(p1) || ball.collision(p2)){
		ball.move()
	}

let checkScore = ball.checkScore()
	if (checkScore=== 2)
		p2.updateScore()
	else if( checkScore === 1)
		p1.updateScore()
	p1.draw();
	p2.draw();




	if (keyIsPressed) {
		if (keyIsDown(87)) 
			p1.move(-1)
		if (keyIsDown(83))
			p1.move(1)
		if (keyIsDown(UP_ARROW))
			p2.move(-1)
		if (keyIsDown(DOWN_ARROW))
			p2.move(1)
	}
   showScore()
}

function keyPressed() {
		switch(keyCode) {
			case 87:
				p1.move(-1)
				break

			case 83:
				p1.move(1)
				break

			case UP_ARROW:
				p2.move(-1)
				break;

			case DOWN_ARROW:
				p2.move(1)
				break;
		}
	}


const drawline = function (){

	stroke('white');
	fill('black');
	ellipse(width/2,height/2,250);
	fill('white');
	ellipse(width/2,height/2,40);
	strokeWeight(5);
	line(width/2, 0, width/2, height);
	
}

const showScore = function(){

	fill('#fff')
	textSize(50)
	text(p1.getScore(),width *0.25,70)
	text(p2.getScore(),width *0.75,70)

}

const pelota = function(){
	//ellipse(width/2,height/2,30);
	let x= Math.floor(width/2);
	let h= Math.floor(height/2);
	const r=20;

	let pasoX = 5;
	let pasoY = 5;

const collision = function(player){
	let dx = Math.abs(x -player.getX() - player.getW()/2)
	let dy = Math.abs(h -player.getY() - player.getH()/2)

	if (dx > player.getW()/2 + r || dy > player.getH()/2 + r){
		return false
	}

	if (dx <= player.getW()/2 || dy <= player.getH()/2) {
		pasoX = -pasoX
		return true
	}
}


	const reset = function(){
		x= Math.floor(width/2);
		h= Math.floor(height/2);

		pasoX *= Math.round(Math.random()) * 2 - 1;
		pasoY *= Math.round(Math.random()) * 2 - 1;
	}

	

	const edges = function(){
		
		if (h - r <=0 || h + r >=height) {
			pasoY = -pasoY
		}
	}

	const checkScore = function(){
		if(x-r<=0){
			reset()
			return 2

		}
		if(x+r > width){
			reset()

			return 1
		}
		return 0

	}

const move = function(){
	x+=pasoX;
	h+=pasoY;
	edges();
}


const draw = function(){
	ellipseMode(CENTER);
	fill('#62FF0D');
	noStroke();
	ellipse(x,h,r*2,r*2);

}

	return{
		draw,
		move,
		collision,
		checkScore,



	}
}



	







