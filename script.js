// Quiz Questions
const quiz = [
  {
    question: "Which of the following is a programming language?",
    choices: ["A. HTML", "B. CSS", "C. JavaScript", "D. PNG"],
    answer: "C. JavaScript"
  },
  {
    question: "What is the purpose of a loop in coding?",
    choices: ["A. Print text on the screen", "B. Store data in a variable", "C. Repeat instructions", "D. Create function"],
    answer: "C. Repeat instructions"
  },
  {
    question: "What will display in the console 'console.log(2 + 2);'?",
    choices: ["A. 4", "B. 5", "C. 12", "D. 1"],
    answer: "A. 4"
  }
];

// Quiz Timer in seconds
const quizTime = 30;

// High Scores Array
let highScores = [];

// Start The Quiz
function startQuiz() {
  // Hides The Start Button and Initials Input
  document.querySelector("button").style.display = "none";
  document.querySelector("input").style.display = "none";

  // Displays Quiz Questions and Choices
  let quizHtml = "";
  for (let i = 0; i < quiz.length; i++) {
    quizHtml += "<p>" + quiz[i].question + "</p>";
    for (let j = 0; j < quiz[i].choices.length; j++) {
      quizHtml += "<input type='radio' name='q" + i + "' value='" + quiz[i].choices[j] + "'>" + quiz[i].choices[j] + "<br>";
    }
  }
  document.querySelector("#quiz").innerHTML = quizHtml;

  // Start Quiz Timer
  let timeLeft = quizTime;
  let timer = setInterval(function() {
    document.querySelector("#score").innerHTML = "Time left: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

// Submits The Quiz and Display The Score
function submitQuiz() {
  // Get's The User's Initials
  let initials = document.querySelector("#initials").value;
  let score = 0;
  for (let i = 0; i < quiz.length; i++) {
    let selected = document.querySelector("input[name='q" + i + "']:checked");
    if (selected && selected.value === quiz[i].answer) {
      score++;
    }
  }

  // Saves The User's Score Locally 
  highScores.push({initials: initials, score: score});
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Display The Score
  document.querySelector("#score").innerHTML = "Your score is " + score + " out of " + quiz.length;
}

// Loads The High Scores From Local Storage
if (localStorage.getItem("highScores")) {
  highScores = JSON.parse(localStorage.getItem("highScores"));
}
