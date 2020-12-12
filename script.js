var quizConatainer = document.getElementById("quiz");
var resultsContainer = document.getElementById("results");
var submitButton = document.getElementById("submit");

var myQuestions = [
    {
        question: "What happens to plastic waste when you throw it away?",
        answers: {
            a: "It's biodegradable & eventually disappears.",
            b: "All plastic is recycled, so there's no such thing as plastic waste.",
            c: "It never disappears, it just breaks down into smaller microplastics."
        },
        correctAnswer: "c"
    },
    {
        question: "On average how much plastic waste do we produce each year?",
        answers: {
            a: "Over 300 million tons",
            b: "Only a few pounds, too little to track",
            c: "6 million pounds"
        },
        correctAnswer: "a"
    },
    {
        question: "Single use plastics are made from...",
        answers: {
            a: "Seaweed",
            b: "Fossil fuels",
            c: "Sand and water"
        },
        correctAnswer: "b"
    }
]

function buildQuiz(){
    // variable to hold the html output
    var output = [];

    // for each question...
    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            // variable to store array of possible answers
            var answers = [];
            // and for each available answer, add a button.
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label>
                        <input type= "radio" name= "question${questionNumber}" value= "${letter}"></input>
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class= "question">${currentQuestion.question}</div>
                <div class= "answers"> ${answers.join("")}</div>`
            );
        }
    );
    quizConatainer.innerHTML = output.join("");
}

function showResults(){

}



buildQuiz();
// on submit show results
submitButton.addEventListener("click", showResults);














// User clicks start button to activate timer and make question 1 appear on screen.
// TODO: create start button
// TODO: write a function that at the start initiates a timer
// TODO: within the function, add a user event on button clicks, so that when a question is answered, a new question appears on the screen.
// TODO: make sure to prevent default behavior
// TODO: within user event, create conditional so that if a question is answered incorrectly 10 seconds is removed from the timer and a message appears letting user know they were wrong, or and a message appears letting user know they were right.
// TODO: create another conditional statement so that when the timer runs out or all questions are answered, the game ends.
// TODO: Display final results on the screen
// TODO: create a submit function so when a user event occurs, user can save information to high scores page. And create a submit function so when a user event occurs, user can clear screen without saving. 
// TODO: create high scores page that saves user data locally and scores are displayed on teh screen.