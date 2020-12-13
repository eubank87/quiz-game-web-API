// need to create variable to call pieces of html we'll use in javascript
var userName = document.getElementById("username");
var saveScoreBtn = document.getElementById("saveScoreBtn");
var finalScore = document.getElementById("finalScore");

// need to create variable that will be used in game.js to save scores to local storage, and then call the scores to show here on the high scores page
var mostRecentScore = localStorage.getItem("mostRecentScore");

// to get high scores from local storage we need to create a new variable that gets the item. Rememebr to parse when we get, because local storage only recognizes strings. If this is the first time playing, or there is nothing in local storage, we add another parameter (or send an empty array).
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);
var maxHighScores = 5;

// now we print final score info to the screen by setting the inner text of the final score variable set above
finalScore.innerText = mostRecentScore;

// need to create an event listener for a key up to notice if input field is filled out.
userName.addEventListener("keyup", () => {
    console.log(userName.value);
    // need to create conditional so the save score button is diabled if there's no value in the input field
    saveScoreBtn.disabled = !userName.value;
});

// called a function titled saveHighScore in html, need to write here so something actually happens
function saveHighScore(e){
    console.log("clicked the save button");
    // need to prevent default behavior of form
    e.preventDefault();

    // need to create a variable to make score an object that contains both the score and username of user.
    var score = {
        score: mostRecentScore,
        name: userName.value
    };
    // console.log(score);

    // now we want to add this information to our array
    highScores.push(score);
    // console.log(highScores);

    // now we want to only display the top 5 scores so we need to sort the info from highest to lowest and then create a way to drop the lowest score when more than 5 scores have been saved.
    highScores.sort((a, b) => b.score - a.score);
    // now we'll splice the high scores array and give it a max index of 5
    highScores.splice(5);

    // now we need to update our local storage by setting the item- don't forget to stringify!
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // when this is done we need to reassign to the home page
    window.location.assign("highScores.html");
    // console.log(highScores);

};