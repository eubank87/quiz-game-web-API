// need to create variables to reference pieces from the html page. Could give each choice a unique id name, OR use query selector to reference by entire class BUT! Need to go back into html and give each choice a "data-number" so we can differentiate between them if selecting entire class.
var question = document.getElementById("question"); 
// using the method Array.from to turn the html element into an array
var choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
// need variables pulled from html for heads up display so we can dynamically update the info
var questionCounterText = document.getElementById("questionCounter");
var scoreText = document.getElementById("score");


// need to create variable for current question. Leaving empty brackets so it can become an object we work with later on
var currentQuestion = {};
// need a variable for answers so we can create a small delay in between questions
var acceptingAnswers = false;
// need variable to track score
var score = 0;
// need variable to track questions
var questionCounter = 0;
// need an empty array for available questions, so when we loop over this during game play, a new random question is generated for user
var availableQuestions = [];

// create variable consisting of array with possible questions/answers. Each question will be an object (which is why we made our currentQuestion var an empty object {}), and will have a question field, 4 choices and an answer- set to the index of the correct answer; because question is a part of the object, the first question has an index of 1(not 0).
var quizQuestions = [
    {
        question: "What are the 3 main types of pollution humans contribute to every day?",
        choice1: "sugar, fat & salt",
        choice2: "cotton, silk & wool",
        choice3: "land, air & water",
        choice4: "aluminum, steel & titanium",
        answer: 3
    },
    {
        question: "Most air pollution comes from...",
        choice1: "deflated helium balloons",
        choice2: "burning fossil fuels",
        choice3: "large choirs singing all at once",
        choice4: "baking cookies",
        answer: 2
    },
    {
        question: "What is global warming?",
        choice1: "A steady rise in the Earth's average temperature.",
        choice2: "A day we celebrate winter coats.",
        choice3: "A made up hoax by the liberal media.",
        choice4: "An art installation in NYC.",
        answer: 1
    },
    {
        question: "Each year an average of _______ gallons of untreated sewage waste, stormwater and industrail chemical waste are dumped into US water.",
        choice1: "1,000",
        choice2: "80 million",
        choice3: "5",
        choice4: "1.2 trillion",
        answer: 4
    },
    {
        question: "Something small I can do to help pollution is...",
        choice1: "recycle.",
        choice2: "bring my own shopping bags to the grocery store.",
        choice3: "use a reusable water bottle instead of buying a new plastic one every time.",
        choice4: "All of the above.",
        answer: 4
    }
]

// Need to create constants for the game.
var correctBonus = 10;
var maxQuestions = 5;

// need to create a function to start the game that sets the question counter and score to 0. Don't forget to call the function below.
function startGame(){
    questionCounter = 0;
    score = 0;
    // calling questions from the availableQuestions array and use the spread operator (...) so that we take the quizQuestions array, spread out each of it's items and then turn it back into an array.
    availableQuestions = [...quizQuestions];
    // console.log(availableQuestions);
    // finally we need to call the function to get a new question- which will be created now...
    getNewQuestion();
}

function getNewQuestion(){
    // create conditional so that if there are no more questions in the availableQuestion array or if the question counter hits above 5, we take the user to the location of the end of the game.
    if(availableQuestions === 0 || questionCounter >= 5){
        // when game ends we want to save the user's score so we can access it in the end screen. We'll set an item to local storage, giving it a new var name (mostRecentScore) and attaching a value(score).
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }
    // start with the question counter ++ so when we start the game we'll add 1 to the question counter
    questionCounter++;
    // we also need to update the questionCounterText dynamically to be set to the current question
    questionCounterText.innerText = questionCounter + "/" + maxQuestions;

    // now we need to grab a random question using the Math function. We multiply by the length of the array of available questions so we make sure we get a number that exists in our array. We also use the Math.floor method outside of the randomizing so we make sure it's a whole number that the computer knows to reference for each question index.
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    // need reference to current question by pulling it from the available question array at the random index
    currentQuestion = availableQuestions[questionIndex];
    // now we want to print the current question to the screen so we tell it to make the variable question (which is attached to an h2 tag in html) equal to the current question we just established at the availableQuestion index.
    question.innerText = currentQuestion.question;

    // now we want to follow this same principle for each of our choices.
    choices.forEach(choice =>{
        // we need to create a variable so we can reference datatset in html 
        var number = choice.dataset["number"];
        // now we want to print the choices to the screen so they correspond to their individual choice number. So A matches with 1 and so on.
        choice.innerText = currentQuestion["choice" + number];
    });

    // now we need to splice out the question we just used so it's not repeated using the splice() method.
    availableQuestions.splice(questionIndex, 1);

    // after we've loaded the question, we want to allow the user to answer. Set to false at top of screen so they can't answer before question is answered.
    acceptingAnswers = true;
};

// we need another for each loop outside of the function on choices so we can add an event listener that logs a choice when a button is clicked.
choices.forEach(choice =>{
    choice.addEventListener("click", e=>{
        // need a conditional to start that will ignore clicks if we're not ready to accept answers
        if(!acceptingAnswers){
            return
        }
        // now we want to set accepting answers to false so we have a small delay before they start answering
        acceptingAnswers = false;
        // now we need variables so we can turn the click event on a particular choice to be read as the user's answer
        var selectedChoice = e.target;
        // call the info by using data property with corresponding number
        var selectedAnswer = selectedChoice.dataset["number"];

        // using the information above about whether an answer is correct or incorrect, we'll create variables to apply styling that corresponds: green for correct, red for wrong.
        var classToApply = "incorrect";
        // create conditional so if the selected answer is right, it switches the answer button from it's default state of incorrect to correct.
        if(selectedAnswer == currentQuestion.answer){
            classToApply = "correct";
                    // creating conditional so if an answer's class is triggered to correct based on event listener, the score is incremented by the set amount in var correctBonus.
            incrementScore(correctBonus);
        }
        // console.log(classToApply);
        

        // now we want to apply newly created variable above for color changing selections to the entire container with the answer in it. We'll call on the parent of the selectedChoice.
        selectedChoice.parentElement.classList.add(classToApply);
        // need to do the same thing, but to remove the class so color is removed from next question. If these are listed back to back with no delay, they happen almost simultaneously and it's like nothing happened. and we want to call the function to get a new question.
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 300);
        


        // use console log to see if selected answer is equal to the correct answer. Can't use === need to use == because the dataset is set to a string and the answer is set to a number. === is a stright comparison, == is are they equal in definition. 
        // console.log(selectedAnswer == currentQuestion.answer);
        
    });
});

// need to create a function that increments the score and updates the score text with the new score. Need to call incrementScore function in the forEach loop with answers as a conditional so if an answer is right, the score goes up. 
incrementScore = num =>{
    score +=num;
    scoreText.innerText = score;
};

startGame();