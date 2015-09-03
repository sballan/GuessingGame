var randomNumber = Math.floor((Math.random() * 100) + 1);
var guessCounter = 5;
var inputNumber;
var started;

var reset = function() {
	guessCounter = 5;
	randomNumber = Math.floor((Math.random() * 100) + 1);
	inputNumber = undefined;
	setGuessCounter();
	
	alert("reset");
	
}

var setGuessCounter = function(n) {
	
}

alert(guessCounter);

$(document).ready(function() {
	console.log("reloaded");
	$("#play-again-button").click(reset);
	
	$("#submit-button").on('click', function() {
		inputNumber = $('#numberguess').val();
		
		if(inputNumber != randomNumber) {
			console.log("reloaded");
			guessCounter -= 1;
			$(".guess-counter").text("" + guessCounter + " Guesses Remaining");
			
		}
	});
	
	
});


