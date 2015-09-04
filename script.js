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
}

function showPlayAgain() {
	$('#play-again-button').slideDown('fast');
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
	
	
});


