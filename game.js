// need to create variables to reference pieces from the html page. Could give each choice a unique id name, OR use query selector to reference by entire class BUT! Need to go back into html and give each choice a "data-number" so we can differentiate between them when selecting entire class.
var question = document.getElementById("question");
// using the method Array.from to turn the html element into an array
var choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);

// need to create variable for current question. Leaving empty bracktes so it can become an object we work with later on
var currentQuestion = {};
// need a variable for answers so we can create a small delay in between questions
var acceptingAnswers = true;
// need variable to track score
var score = 0;
// need variable to track questions
var questionCounter = 0;
// need an empty array for available questions, so when we loop over this during game play, a new random question is generated for user
var availableQuestions = [];

// create variable consisting of array with possible questions/answers
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
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 
    },
]