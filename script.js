/*jshint enforceall: false, strict: false, lastsemic: false, jquery: true*/

var randomNumber;
var guessCounter;
var inputNumber;

function reset() {
	randomNumber = Math.floor((Math.random() * 100) + 1);
	guessCounter = 5;
	inputNumber = 0;
	updateGuessCounter();
	hidePlayAgain();
	$('#you-lose').hide();
	
}

function updateGuessCounter(n) {
	if(n === undefined) { n = 0}
	
	guessCounter += n;
	$(".guess-counter").text("" + guessCounter + " Guesses Remaining");
}

function wrongAnswer() {
	updateGuessCounter(-1);
	if (guessCounter <= 0) { youLose() }
}

function youWin() {
	alert("You Win!");
}

function youLose() {
	$('#you-lose').show();
	showPlayAgain();
}

function hidePlayAgain() {
	$('#play-again-button').slideUp('fast');
	$('#play-again-button').addClass('you-lose-popup');
}

function showPlayAgain() {
	$('#play-again-button').removeClass('you-lose-popup');
	$('#play-again-button').slideDown('fast');
}

function eval(n) {
	var difference = randomNumber - n;
	alert(difference);
	
	switch(true) {
		case difference >= 60 || difference <= -60:
			return "Very Cold";
			break;
		case difference >= 40 || difference <= -40:
			return "Cold";
			break;
		case difference >= 30 || difference <= -30:
			return "Not So Warm";
			break;
		case difference >= 20 || difference <= -20:
			return "Getting Warm";
			break;
		case difference >= 15 || difference <= -15:
			return "Getting Warm";
			break;
		case difference >= 10 || difference <= -10:
			return "Hot!";
			break;
		case difference >= 5 || difference <= -5:
			return "Very Hot!";
			break;
		case difference >= 1 || difference <= -1:
			return "Burning Up!";
			break;
		default:
			return "Try Again";	
	}
}

$(document).ready(function() {
	$('#play-again-button').hide();
	reset();
	
	$("#play-again-button").click(function() {
		reset();
	});
	
	$("#submit-button").on('click', function() {
		inputNumber = $('#numberguess').val();
		
		if(inputNumber != randomNumber) {
			wrongAnswer();
		} else { 
			youWin();
		}
	});
	
	$('#hint-button').on('click', function() {
		var hintString = eval(inputNumber);
		alert(hintString);
	});
	
});


