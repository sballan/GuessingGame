/*jshint enforceall: false, strict: false, lastsemic: true, jquery: true*/
var currentGame;

var GameObject = function() {
	this.randomNumber = Math.floor((Math.random() * 100) + 1);
	this.guessCounter = 5;
	this.input = -1;
	this.guessArray = [];
	this.currentDist = 0;
	this.lastDist = 0;
	this.tempDirection = 0;
	
	this.takeInput = function(userInput) {
		
		if(userInput === "") {
			return false;
		} else if(userInput < 0 || userInput > 100) {
			return false;
		} else if(userInput % 1 !== 0 ){
			return false;
		}  else if(this.guessArray.indexOf(userInput) >= 0) {
			return false;
		}

		this.input = userInput;
		this.lastDist = this.currentDist;
		this.currentDist = Math.abs(userInput - this.randomNumber);
		this.tempDirection = this.currentDist - this.lastDist;
		
		this.guessArray.push(userInput);
		
		return true;
	};
	
	this.evaluateInput = function(tempDirection) {
		removeAllTemps();
		switch (true) {
			case tempDirection === this.currentDist:
				if(tempDirection <= 20) {
					alert(tempDirection, this.currentDist);
					$("#you-are-hot").slideDown().removeClass("hidden");
				} else {
					$("#you-are-cold").slideDown().removeClass("hidden");
				}
				break;
				
			case tempDirection < 0:
				$("#getting-hotter").slideDown().removeClass("hidden");
				break;
			case tempDirection >= 0:
				$("#getting-colder").slideDown().removeClass("hidden");
				break;
		}
		
	};
};

function removeAllTemps() {
	$("#you-are-hot").slideUp("slow");
	$("#you-are-cold").slideUp("fast");
	$("#getting-hotter").slideUp("fast");
	$("#getting-colder").slideUp("fast");
}

function reset() {
	currentGame = new GameObject();
	$('#user-guess-list').empty();
	updateGuessCounter();
	removeAllTemps();
	$('#you-lose').slideUp();
	$('#you-win').slideUp();
	$('#submit-button').slideDown();
}

function updateGuessCounter(n) {
	if(n === undefined) { n = 0}
	
	currentGame.guessCounter += n;
	
	$(".guess-counter").text("" + currentGame.guessCounter + " Guesses Remaining");
}

function wrongAnswer() {
	updateGuessCounter(-1);
	
	$('#user-guess-list').append($("<li class=\"list-group-item\">" + currentGame.input + "</li>"));
}

function youLose() {
	removeAllTemps();
	$('#you-lose').slideDown().removeClass('hidden');
	$('#submit-button').slideUp();
}

function runSubmitButton() {
	var check = currentGame.takeInput($('#numberguess').val());
	if(!check) {
		alert("Invalid Input.  Please pick a new number between 1 and 100."); 
		return false;
	}
	
	if (currentGame.guessCounter <= 0) { 
		youLose(); 
	} else if(currentGame.input != currentGame.randomNumber) { 
		currentGame.evaluateInput(currentGame.tempDirection);
		wrongAnswer();
	} else { 
		$('#you-win').slideDown().removeClass('hidden');
		$('#submit-button').slideUp();
	}
	
}

//RUN BEFORE PAGE LOADS
//reset();

currentGame = new GameObject();

$(document).ready(function() {	
	$('#you-lose').hide();

	$('#numberguess').select();
	
	$("#new-game-button").click(function() {
		reset();
	});
	
	$("#submit-button").on('click', function() {
		runSubmitButton();
		$("#numberguess").val('');
	});
	
	$("#numberguess").keypress(function(event) {
		if(event.which == 13) {
			runSubmitButton();
			$("#numberguess").val('');
		}
	});
	
	$('#hint-button').on('click', function() {
		alert("The number was " + currentGame.randomNumber + ".  Try harder next time!!");
		reset();
		
	});
	
});


