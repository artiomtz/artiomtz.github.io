var gameLevel = 1;
var gameLevelOld = 1;
var pause = true;
var win = false;
var lives = 5;
var moveEnable = false;
var crashedBlock;
var screenRatio;
var blkTime = [10000, 11300, 11700, 12200, 13300, 14000, 15300, 16400, 17000, 17800, 18300, 19100];
var cldTime = [10400, 11900, 14300, 15500, 16600, 18800];
var blkID = ["block1", "block2", "block3", "block4", "block5", "block6", "block7", "block8", "block9", "block10", "block11", "block12", ];
var cldID = ["cloud1", "cloud2", "cloud3", "cloud4", "cloud5", "cloud6"];
var blkIntrvl = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cldIntrvl = [0, 0, 0, 0, 0, 0];
var crashSound = new Audio('crash.mp3');
var music = new Audio('music.mp3');


function gameLoad() // initiate
{
	document.getElementById("button").focus();
	document.getElementById("car").src = "pics/car1.png";
	document.getElementById("car").style.opacity = 0;
	document.getElementById("score").innerHTML = 0; // score reset
	document.getElementById("gamelevel").innerHTML = "1/10"; // score reset
	document.getElementById("lives").innerHTML = lives; // lives set
	document.getElementById("block1").style.opacity = 0;	
	document.getElementById("block2").style.opacity = 0;	
	document.getElementById("block3").style.opacity = 0;	
	document.getElementById("block4").style.opacity = 0;	
	document.getElementById("block5").style.opacity = 0;	
	document.getElementById("block6").style.opacity = 0;	
	document.getElementById("block7").style.opacity = 0;	
	document.getElementById("block8").style.opacity = 0;	
	document.getElementById("block9").style.opacity = 0;	
	document.getElementById("block10").style.opacity = 0;	
	document.getElementById("block11").style.opacity = 0;	
	document.getElementById("block12").style.opacity = 0;
	document.getElementById("cloud1").style.opacity = 0;
	document.getElementById("cloud2").style.opacity = 0;	
	document.getElementById("cloud3").style.opacity = 0;	
	document.getElementById("cloud4").style.opacity = 0;	
	document.getElementById("cloud5").style.opacity = 0;	
	document.getElementById("cloud6").style.opacity = 0;
	
	if ((window.outerWidth / window.outerHeight) < 0.95) // portrait
		alert('The game works better in landscape mode :)');
}


function buttonClick() // GO click
{
	document.getElementById("button").style.display = "none";
	document.getElementById("vid").play();
	pause = false;
	
	document.getElementById("car").style.left = "5%";
	document.getElementById("car").style.top = "75%";
	document.getElementById("car").style.opacity = 0;
	
	var pos = 80;
	var posL = 1;
	var carOpacity = 0;
	var id = setInterval(frame, 50);
	function frame() // car comes up
	{
		if (document.getElementById("car").style.top <= screenRatioCheck(false)) // car final position
			clearInterval(id);
		else
		{
			pos--;
			posL += 3;
			document.getElementById("car").style.top = pos + '%'; 
			document.getElementById("car").style.left = posL + '%';
			carOpacity += 0.1;
			document.getElementById("car").style.opacity = carOpacity;
		}
	}
	window.setInterval(levelCheck, 500); // check level every X mSec
	window.setInterval(carCheck, 100); // check level every X mSec
	window.setInterval(shakeDrive, 100); // driving
	window.setInterval(screenRatioCheck, 5000, true); // screen ratio check
	window.setTimeout(gamePlay, 3000); // play
	music.play();
}


function gamePlay() // moving blocks
{
	var i;
		
	for (i = 0; i < 12 ; i++) // blocks
	{
		if (document.getElementById(blkID[i]).style.opacity <= 0)
			window.setTimeout (blockMove, blkTime[i] - 10000, blkID[i], true);
		clearInterval(blkIntrvl[i]);
		blkIntrvl[i] = window.setInterval (blockMove, blkTime[i], blkID[i], true);
	}
	
	for (i = 0; i < 6 ; i++) // clouds
	{
		if (document.getElementById(cldID[i]).style.opacity <= 0)
			window.setTimeout (blockMove, cldTime[i] - 10000, cldID[i], false);
		clearInterval(cldIntrvl[i]);
		cldIntrvl[i] = window.setInterval (blockMove, cldTime[i], cldID[i], false);
	}
}



function blockMove(blockName, earth) // flying stuff
{
	if ((!win) && (!pause)) // while playing
	{
		var element = document.getElementById(blockName);   
		var position = 1;
		var topPosition = 0;
		var repeatSpeed = 1;
		var speed = 0.005 + (gameLevel/1000);
		var id = setInterval(move, repeatSpeed);
		var direction = generateRandom();
		
		function move() // block moves
		{
			if (topPosition > 80) // passed
			{
				document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + 10; // score up
				clearInterval(id);
			}
			
			else // didnt pass yet
			{
				position *= (1 + speed);
				topPosition = speed*position;
				
				if (earth) // block
					element.style.top = (18+topPosition + '%'); // getting closer - down
				else // cloud
					element.style.top = (15-topPosition + '%'); // getting closer - up
				
				element.style.left = (((45+direction*8) + direction*topPosition) + '%'); // getting closer - left / right
				element.style.width = (0.2 + 0.25*topPosition + '%'); // getting closer - width
				element.style.height = (0.2 + 0.4*topPosition + '%'); // getting closer - height
				
				if (earth) // block rotate
					if ((blockName == "block2") || (blockName == "block4") || (blockName == "block6") || (blockName == "block8") || (blockName == "block10") || (blockName == "block12"))
						element.style.transform = 'rotate(' + 3*topPosition + 'deg)'; // getting closer - rotate right
					else
						element.style.transform = 'rotate(-' + 3*topPosition + 'deg)'; // getting closer - rotate left
				else // cloud
					if (parseInt(element.style.left) > 42) // right
						element.style.transform = 'rotate(30deg)'; // getting closer - rotate right
					else 
						element.style.transform = 'rotate(-30deg)'; // getting closer - rotate right
				
				if ((topPosition > 50) && (element.style.opacity > 0)) // passing - change opacity
					element.style.opacity = 0.75 - topPosition/100;
					
				if ((topPosition < 50) && (earth) && (element.style.opacity < 0.8)) // starting - change opacity block
					element.style.opacity = 25 * topPosition / 100;
					
				if ((topPosition < 20) && (!earth) && (element.style.opacity < 0.8)) // starting - change opacity cloud
					element.style.opacity = 10 * topPosition / 100;
				
				var carPos = document.getElementById("car");
				if ((parseInt(element.style.top) > (parseInt(carPos.style.top)-3)) && (parseInt(element.style.top) < (parseInt(carPos.style.top)+3)) && (earth)) // crash check
					checkCrash(blockName);
			}	
		}
	}
}


function checkCrash(blockName) // check crash
{
	var carLeft = parseInt(document.getElementById("car").style.left);
	var carRight = parseInt(document.getElementById("car").style.left.slice(0, -1)) + 10; // car width
	
	var blockLeft = parseInt(document.getElementById(blockName).style.left);
	var blockRight = parseInt(document.getElementById(blockName).style.left.slice(0, -1)) + 10; // block width
	
	if (((carLeft < blockRight && carRight > blockLeft) || (carRight > blockLeft && carLeft < blockRight)) && (crashedBlock != document.getElementById(blockName))) // crash
	{
		crashedBlock = document.getElementById(blockName); // read crashed block
		lives--;
		document.getElementById("lives").innerHTML = lives; // lives set
		crashSound.play();
		blinkHealth();
		shakeCrash();
		if (!lives) // lost
		{
			document.getElementById("vid").pause();
			if (confirm("You Lost :(\nYour score: " +  document.getElementById("score").innerHTML + "\nTo restart press OK\nTo quit press Cancel"))
				location.reload(); // retry
			else 
				window.close(); // quit
		}
	}
}


function levelCheck() // game levels
{
	var score = parseInt(document.getElementById("score").innerHTML);
	
	if (!win)
	{
		if (score < 500)
			gameLevel = 1;
		else if (score < 1000)
			gameLevel = 2;
		else if (score < 1500)
			gameLevel = 3;
		else if (score < 2000)
			gameLevel = 4;
		else if (score < 2500)
			gameLevel = 5;
		else if (score < 3000)
			gameLevel = 6;
		else if (score < 3500)
			gameLevel = 7;
		else if (score < 4000)
			gameLevel = 8;
		else if (score < 4500)
			gameLevel = 9;
		else if (score < 5000)
			gameLevel = 10;
		else // win
		{
			win = true;
			gameWon();
		}
		document.getElementById("gamelevel").innerHTML = gameLevel + '/10';
		
		if (gameLevelOld != gameLevel) // new level, update speed
		{
			gameLevelOld = gameLevel;
			blinkLevel();
			gamePlay();
		}
	}
}


function carCheck() // car pic angle change
{
	var carPos = parseInt(document.getElementById("car").style.left);
	
	if (carPos < 25)
		document.getElementById("car").src = "pics/car3.png";
	else if (carPos > 60)
		document.getElementById("car").src = "pics/car2.png";
	else
		document.getElementById("car").src = "pics/car1.png";
}


function screenRatioCheck(load)
{
	var screenRatio = window.outerWidth / window.outerHeight;
	var carPosition;
	if (screenRatio > 2.2)
		carPosition = '60%';
	else if (screenRatio > 2)
		carPosition = '63%';
	else if (screenRatio > 1.7)
		carPosition = '65%';
	else if (screenRatio > 1.3)
		carPosition = '68%';
	else if (screenRatio > 1)
		carPosition = '70%';
	else
		carPosition = '73%';
	
	if (load)
		document.getElementById("car").style.top = carPosition;
	window.scrollBy(0,5000);
	return carPosition;
}


document.onkeydown = function(e) // movement arrow pressed
{
	if (!pause)
	{
		if ((e.keyCode == 37) && (!moveEnable)) // left key
			move('left');

		if ((e.keyCode == 39) && (!moveEnable)) // right key
			move('right');
	}
}


function move(dir)
{
	var element = document.getElementById("car");
	moveEnable = true;
	var moveCar = setInterval(Drive, 15);
	function Drive()
	{
		if (!moveEnable) // key released
			clearInterval(moveCar);
		else
		{
			if ((dir == 'left') && (element.style.left > '10%'))
				element.style.left = (parseInt(element.style.left) - 1 ) + '%'; // move left
				
			if ((dir == 'right') && (element.style.left < '77%'))
				element.style.left = (parseInt(element.style.left) + 1 ) + '%'; // move left
		}
	}
}


document.onkeyup = function(e) // movement arrow released
{
	moveRelease();
}


function touchLeft()
{
	if (!moveEnable)
		move('left');
}


function touchRight()
{
	if (!moveEnable)
		move('right');
}


function moveRelease()
{
	moveEnable = false;
}


function blinkLevel()
{
	document.getElementById("gamelevel").style.fontSize = 30 + 'px';
	window.setTimeout(blinkLevel2, 200);
}


function blinkLevel2()
{
	document.getElementById("gamelevel").style.fontSize = 15 + 'px';
}


function blinkHealth()
{
	document.getElementById("lives").style.fontSize = 30 + 'px';
	window.setTimeout(blinkHealth2, 200);
}


function blinkHealth2()
{
	document.getElementById("lives").style.fontSize = 15 + 'px';
}


function generateRandom() // random number
{
    var min = -1.0000,
        max = 0.90000,
        random = Math.random() * (max - min) + min;
		return random;
};


function gameWon()
{
	document.getElementById("vid").pause();
	if (confirm("YOU WON! :D\nTo restart press OK\nTo quit press Cancel"))
		location.reload(); // retry
	else 
		window.close(); // quit
}


function shakeDrive()
{
	setTimeout(rotated1, 0);
	setTimeout(rotated2, 50);
}


function shakeCrash()
{
	setTimeout(rotatec1, 50);
	setTimeout(rotatec2, 100);
	setTimeout(rotatec1, 150);
	setTimeout(rotatec2, 200);
	setTimeout(rotatec1, 250);
	setTimeout(rotatec2, 300);
	setTimeout(rotate0, 350);
}


function rotate0() { document.getElementById("car").style.transform = 'rotate(0deg)'; }
function rotated1(){document.getElementById("car").style.transform = 'rotate(+0.7deg)'; }
function rotated2(){document.getElementById("car").style.transform = 'rotate(-0.7deg)'; }
function rotatec1(){document.getElementById("car").style.transform = 'rotate(+5deg)'; }
function rotatec2(){document.getElementById("car").style.transform = 'rotate(-5deg)'; }
