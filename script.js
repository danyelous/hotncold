// HotNCold Game project by Ponto.


$(document).ready(function() {



var randomNumber = randomFromInterval(0,100); //Stores current random number generated

var guessInput = $('#guess'); //input guess reference

var guessButton = $('.guesssubmit'); //guess submit reference
var cheatButton = $('.cheatsubmit'); //cehat submit reference
var resetButton = $('.resetsubmit'); //reset submit reference

var replyText = $('#reply'); //reply div reference
var replyErrorText = $('#error-reply'); //error reply div reference


// ******************** Input functions ********************

guessInput.focus(); //to get the focus on the box as soon the page loads

// to capture the enter key when submitting a number
$(document).keyup(function (e) {
    if ( guessInput.focus() && (e.keyCode === 13) ) {
		evaluateEntry(guessInput.val());		
    }
 });
 
// to capture the submit button when submitting a number
guessButton.click(function() {
	evaluateEntry(guessInput.val());
});

// to capture the cheat submit button
cheatButton.click(function() {
	showRandomNumber();
});

// to capture the reset submit button
resetButton.click(function() {
	resetGame();
});
 
// ******************** End Input functions ********************


// ******************** Internal functions ********************

function randomFromInterval(from,to) {
// generates a random value between two numbers;

    return Math.floor(Math.random()*(to-from+1)+from);
}

function numbersDistanceModule(x, y) {
// returns distance difference module of two numbers. By module I mean no negative numbers.

	var dist = 0;

	if(x >= y){
		dist = (x - y);
	} else {
		dist = (y - x);
	}
	
	return dist;

}


function evaluateEntry(inputValue) {
// evaluates the input entry

		//to clean previous errors, if exists:
		if(replyErrorText.innerText != ''){
			writeErrorReply('');
		}
			

		if(isNaN(inputValue) || inputValue == '') { // Check if the inout is not a number
				writeErrorReply("Error: Please enter a valid number between 0 and 100.");
		}else{ 

			// Since its a number, I evaluate the "distance", I mean, how far the input number is from the random number
		
			var distance = numbersDistanceModule(inputValue, randomNumber);
			
			// Now that I have the "distance" I check how cold or hot is it, and if the number is the same.

			switch (true) {
				case (distance > 0 && distance <= 10):
					writeReply("You are getting really hot.");
				  break;
				case (distance > 10 && distance <= 25):
					writeReply("You are getting hot.");
				  break;
				case (distance > 25 && distance <= 50):
					writeReply("Cold.");
				  break;
				case (distance > 50 && distance <= 75):
					writeReply("Very cold.");
				  break;
				case (distance > 75):
					writeReply("Very very cold.");
				  break;
				case (distance == 0):
					writeCorrectReply("Correct! The number is: " + randomNumber + ".");
				  break;
			}

				
		}


}

function resetGame() {
// Restart the game

randomNumber = randomFromInterval(0,100); //Generates a new random number.

writeReply(''); //Empty outputs
writeErrorReply(''); //Empty error outputs

guessInput.val(''); //Empty inputs


}

// ******************** End Internal functions ********************





// ******************** Output functions ********************

function writeReply(text) {
// write reply text value on reply div in HTML;
	replyText.html("<h4>" + text + "</h4>");
}
function writeCorrectReply(text) {
// write reply text value on reply div in HTML;
	replyText.html("<h4 class='correct'>" + text + "</h4>");
}
function writeErrorReply(text) {
// write reply text value on error-reply div in HTML;
	replyErrorText.html("<h4 class='error'>" + text + "</h4>");
}

function showRandomNumber() {
// display random number
		alert( "The random number is: " + randomNumber );
}

// ******************** End Output functions ********************

});
