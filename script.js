/*jshint enforceall: false, strict: false, lastsemic: false, jquery: true*/

var randomNumber;
var guessCounter;
var inputNumber;

function reset() {
	randomNumber = Math.floor((Math.random() * 100) + 1);
	guessCounter = 5;
	inputNumber = 0;
}

function updateGuessCounter(n) {
	if(n === undefined) { n= -1}
	
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
	alert("You Lose!");
}

$(document).ready(function() {
	reset();
	alert("Random number is: " + randomNumber);
	
	$("#play-again-button").click(function() {
		alert("Play Again!");
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
	
	
});


