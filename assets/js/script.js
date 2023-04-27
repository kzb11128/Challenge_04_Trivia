// Grab DOM elements
var questions = document.querySelector(".questions");
var choices = document.querySelector(".choices");
var startButton = document.querySelector(".start-button");
var timeElement = document.querySelector(".timer-count");
var questionsChoices = document.querySelector(".questionsChoices");
var timerCard = document.querySelector(".card-timer");
var finish = document.querySelector(".finish");
var score = document.querySelector(".score");
var initialsCard = document.querySelector(".card-initials");
var resultsCard = document.querySelector(".card-results");
var submitButton = document.getElementById("submitButton");
var initials = document.getElementById("initials");
var initialResult = document.getElementById("initialResult");

// only show timerCard section and hide others at the beginning
questionsChoices.style.display = 'none';
finish.style.display = 'none';
resultsCard.style.display = 'none';

// Create an array of question, choices and answer set
triviaQuestions = [
{questions: "Which famous scientist developed the theory of relativity?",
choices:["Einstein", "Feynman", "Newton","Galileo"],
answer: "Einstein"
},

{questions: "What is the smallest country in the world by land area?",
choices:["Luxembourg", "Vatican City", "Monaco","Singapore"],
answer: "Vatican City"
},

{questions: "What is the largest organ in the human body?",
choices:["Heart", "Brain", "Liver","Skin"],
answer: "Skin"
},

{questions: "Which one is not a programming language",
choices:["JavaScript", "CSS", "HTML","Peloton"],
answer: "Peloton"
},
];

var timerCount = 90;
var timer;
var index = 0;

// Function to start the game
function startGame() {
    startButton.disabled = true;
    startTimer();

    startButton.style.display = 'none';
    questionsChoices.style.display = 'block';
    timer = setInterval(startTimer, 1000)
    presentQuestion();

}

// Function to present questions and choices for each questions
function presentQuestion() {
    // Grab current question from the triviaQuestions array
    var currentQuestion = triviaQuestions[index];

    // show the questions and choices
    questions.textContent = currentQuestion.questions;
    choices.innerHTML = "";
    for (i = 0; i < currentQuestion.choices.length; i++) {
        var userChoice = currentQuestion.choices[i];

        // Create a list of the choices and make each choice a button
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = userChoice;
        li.appendChild(button);
        choices.appendChild(li);
        button.addEventListener("click", function(event) {
            // Check userChoice again the answer in the checkAnswer function
            checkAnswer(event.target.textContent);
        });
    }
}

// Function to check answers
function checkAnswer(answer) {
        var currentQuestion = triviaQuestions[index];
        if (answer === currentQuestion.answer) {
        
        // Reduce 10 seconds when userChoice does not equal answer 
        } else {
            timerCount -= 10;   
        }

        // Game ends when all the questions are answered
        index++;
        timeElement.textContent = timerCount;
        if(index === triviaQuestions.length) {
            endGame();
        } else {
            presentQuestion();
        }
    }    


    

// Funtion to set the timer 
function startTimer() {
        timerCount--;
        timeElement.textContent = timerCount;
        // Game ends when timerCount is zero
        if (timerCount === 0) {
            endGame();
        }
}

// Function to end game
function endGame() {
    clearInterval(timer);
    timerCard.style.display = "none";
    questionsChoices.style.display = "none";
    finish.style.display = "block";
    score.textContent = timerCount;
    localStorage.setItem("score", timerCount);

// When submit button is click, initial and score is displayed, and a button to reset game
    submitButton.addEventListener("click", function(){
        timerCard.style.display = "none";
        questionsChoices.style.display = "none";
        finish.style.display = "none";
        resultsCard.style.display = "block";     

        var getResult = localStorage.getItem("score"); 
        var getInitial = initials.value; 
        
        var li = document.createElement("li");
        li.textContent = getInitial + " " + getResult;
        initialResult.appendChild(li);

        var resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        resultsCard.appendChild(resetButton);

        resetButton.addEventListener("click", function(){
            location.reload();
        })

    });

  }

startButton.addEventListener("click", startGame);


