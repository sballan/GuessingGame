/*jshint enforceall: false, strict: false, lastsemic: true, jquery: true*/
var currentGame;

var GameObject = function() {
	this.randomNumber = Math.floor((Math.random() * 100) + 1);
	this.guessCounter = 5;
	this.input = 0;
	this.guessArray = [];
}

function reset() {
	currentGame = new GameObject();
	updateGuessCounter();
	hidePlayAgain();
	$('#you-lose').hide();
}

function updateGuessCounter(n) {
	if(n === undefined) { n = 0}
	
	currentGame.guessCounter += n;
	
	$(".guess-counter").text("" + currentGame.guessCounter + " Guesses Remaining");
}

function wrongAnswer() {
	updateGuessCounter(-1);
	if (currentGame.guessCounter <= 0) { 
		youLose() 
	}
}

function youLose() {
	$('#you-lose').show();
	showNewGame();
}

function hidePlayAgain() {
	$('#new-game-button').slideUp('fast');
	$('#new-game-button').addClass('you-lose-popup');
}

function showNewGame() {
	$('#new-game-button').removeClass('you-lose-popup');
	$('#new-game-button').slideDown('fast');
}

function evalNum(n) {
	var difference = currentGame.randomNumber - n;
	
	switch(true) {
		case difference >= 60 || difference <= -60:
			return "Very Cold";
		case difference >= 40 || difference <= -40:
			return "Cold";
		case difference >= 30 || difference <= -30:
			return "Not So Warm";
		case difference >= 20 || difference <= -20:
			return "Getting Warm";
		case difference >= 15 || difference <= -15:
			return "Getting Warm";
		case difference >= 10 || difference <= -10:
			return "Hot!";
		case difference >= 5 || difference <= -5:
			return "Very Hot!";
		case difference >= 1 || difference <= -1:
			return "Burning Up!";
		default:
			return "Try Again";	
	}
}

function runSubmitButton() {
	currentGame.input = $('#numberguess').val();
	if(currentGame.input !== currentGame.randomNumber) { 
		wrongAnswer();
	} else { 
		alert("You Win!") 
	}
}

//RUN BEFORE PAGE LOADS
//reset();

currentGame = new GameObject();
$('#you-lose').hide();

$(document).ready(function() {
	$("#new-game-button").click(function() {
		reset();
	});
	
	$("#submit-button").on('click', function() {
		runSubmitButton();
	});
	
	$('#hint-button').on('click', function() {
		var hintString = evalNum(currentGame.input);
//		alert($('#hint-button').data());
		alert(hintString);
		
	});
	
});


