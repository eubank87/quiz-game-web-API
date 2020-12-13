// need to create variables to reference items we need in html
var highScoresList = document.getElementById("highScoresList");
// now we want to get the high scores info from local storage- don't forget to parse with JSON. Also attach paramter for first tim eplay/empty storage with || {} (or send an epty array).
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);

// now we want to go through each score and for each one we want to add an li to our unordered list. Using ".map" allows us to take in the high scores array and converts each of the items into something new in a different array. We'll set this function to return and "li" so we can add to our "ul", and we'll set the entire process to be equal to the high scores list. We'll use ".innerHTML" since we are writing an html element directly into js.
highScoresList.innerHTML = highScores.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}).join(""); //using ".join" to convert array back into a string