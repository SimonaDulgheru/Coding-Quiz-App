const questions = [
	{
		question: "The PHP syntax is most similar to:?",
		answers: [
			{ text: "Perl and C  ", correct: true },
			{ text: "JavaScript", correct: false },
			{ text: "VBScript", correct: false },
			{ text: "Java", correct: false },
		],
	},
	{
		question: "What is the correct way to create a function in PHP?",
		answers: [
			{ text: "create myFunction()", correct: false },
			{ text: "new_function myFunction()", correct: false },
			{ text: "function myFunction()", correct: true },
			{
				text: "Function()",
				correct: false,
			},
		],
	},
	{
		question:
			"What is the correct way to open the file 'time.txt' as readable?",
		answers: [
			{ text: 'fopen("time.txt","r+");', correct: false },
			{ text: 'open("time.txt");', correct: false },
			{ text: 'open("time.txt","read");', correct: false },
			{ text: 'fopen("time.txt","r");  ', correct: true },
		],
	},
	{
		question:
			"Which superglobal variable holds information about headers, paths, and script locations?",
		answers: [
			{ text: "$_SESSION", correct: false },
			{ text: "$_GLOBALS", correct: false },
			{ text: "$_GET", correct: false },
			{ text: "$_SERVER ", correct: true },
		],
	},
	{
		question: "What is the correct way to add 1 to the $count variable?",
		answers: [
			{ text: "++count", correct: false },
			{ text: "count++;", correct: false },
			{ text: "$count =+1", correct: false },
			{ text: "$count++;", correct: true },
		],
	},
	{
		question: "Which one of these variables has an illegal name?",
		answers: [
			{ text: "myVar", correct: false },
			{ text: "$my_Var", correct: false },
			{ text: "$my-Var  ", correct: true },
			{ text: "$myVar", correct: false },
		],
	},
	{
		question: "How do you create a cookie in PHP?",
		answers: [
			{ text: "createcookie", correct: false },
			{ text: "makecookie()", correct: false },
			{ text: "setcookie()  ", correct: true },
			{ text: "setcookie", correct: false },
		],
	},
	{
		question:
			"Which operator is used to check if two values are equal and of same data type?",
		answers: [
			{ text: "===  ", correct: true },
			{ text: " =", correct: false },
			{ text: "==", correct: false },
			{ text: "!=", correct: false },
		],
	},
	{
		question: "What is a correct way to add a comment in PHP?",
		answers: [
			{ text: "<comment>...</comment>", correct: false },
			{ text: "/*...*/  ", correct: true },
			{ text: "<!--...-->", correct: false },
			{ text: "*...*", correct: false },
		],
	},
	{
		question: 'What is the correct way to include the file "time.inc" ?',
		answers: [
			{ text: '<?php include file="time.inc"; ?>', correct: false },
			{ text: '<?php include:"time.inc"; ?>', correct: false },
			{ text: '<?php include "time.inc"; ?>  ', correct: true },
			{ text: '<!-- include file="time.inc" -->', correct: false },
		],
	},
];

const stopWatch = document.querySelector("#stopWatch");
const startBtn = document.getElementById("start-btn");
let nextBtn = document.getElementById("next-btn");
let restartBtn = document.getElementById("restart-btn");
let finishBtn = document.getElementById("finish-btn");
const timer = document.getElementById("timer");
const quizContainer = document.getElementById("quiz-container");
const questionNumValue = document.querySelector(".question-num-value");
const totalQ = document.querySelector(".total-questions");
let questionsDisplay = document.querySelector(".question"); //question
const options = document.querySelector(".options");
const answersBtn = document.getElementById("answers-btn "); //answer
const message = document.querySelector(".message");
const showScore = document.getElementById("score");
const scoreResult = document.getElementById("result");
const container = document.querySelector(".container");
const quizDisplay = document.querySelector(".quiz-display ");
const quizButtons = document.querySelectorAll(".button");
const info = document.querySelector(".info");
const phpBtn = document.querySelector(".php");
const homeBtn = document.querySelector(".home-btn");
const backBtn = document.querySelector(".back-btn");

let score;
let index = 0;
totalQ.textContent = questions.length;
let secondsLeft;
let shuffledQuestions, questionIndex; //currentquestionIndex

window.onload = () => {
	quizButtons.forEach((element) => {
		element.classList.remove("hide");
	});
	quizContainer.classList.remove("hide");

	timer.classList.remove("hide");
	startBtn.classList.remove("hide");
	message.classList.remove("hide");

	timer.textContent = secondsLeft;
	score = 0;
	showScore.textContent = score;
	console.log(score);
};
backBtn.addEventListener("click", () => {
	{
		{
			window.location.replace("../index.html");
		}
	}
});

startBtn.addEventListener("click", setTime);

startBtn.addEventListener("click", () => {
	backBtn.classList.add("hide");
	quizButtons.forEach((element) => {
		element.classList.add("hide");
	});
});

function setTime() {
	score = 0;
	startQuiz();

	let timerSeconds = setInterval(function () {
		secondsLeft--;

		timer.textContent = secondsLeft;
		if (secondsLeft <= 10) {
			timer.style.background = "#990005";
		} else if (secondsLeft < 20) {
			timer.style.background = "#999005";
		} else {
			timer.style.background = "#005D00";
		}

		if (
			secondsLeft === 0 ||
			shuffledQuestions.length == questionIndex + 1
		) {
			clearInterval(timerSeconds);
			showMessage();
		}
	}, 1000);
}

const showMessage = () => {
	if (secondsLeft === 0) {
		// backBtn.classList.remove("hide");
		homeBtn.classList.remove("hide");
		scoreResult.classList.remove("hide");
		scoreResult.textContent = `Your score is ${score}`;

		const alertBox = document.createElement("p");
		alertBox.setAttribute("class", "message-box");
		alertBox.textContent = "Time's Up!";
		message.appendChild(alertBox);
		quizDisplay.classList.add("hide");
		restartBtn.classList.remove("hide");
		nextBtn.classList.add("hide");
		homeBtn.addEventListener("click", () => {
			{
				window.location.replace("../index.html");
			}
		});
	}
};

restartBtn.addEventListener("click", restart);

function restart() {
	setTime();
	startQuiz();
	timer.classList.remove("hide");
	message.classList.add("hide");
	homeBtn.classList.add("hide");
}

nextBtn.addEventListener("click", () => {
	questionIndex++;
	setNextQuestion();
});

const startQuiz = () => {
	secondsLeft = 40;
	timer.textContent = secondsLeft;
	score = 0;
	showScore.textContent = score;
	quizDisplay.classList.remove("hide");
	startBtn.classList.add("hide");
	scoreResult.classList.add("hide");
	restartBtn.classList.add("hide");
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	questionIndex = 0;
	quizContainer.classList.remove("hide");
	setNextQuestion();
};

const setNextQuestion = () => {
	resetState();
	loadQuestion(shuffledQuestions[questionIndex]);
};

const loadQuestion = (question) => {
	console.log(question);
	questionsDisplay.innerHTML = question.question;
	questionNumValue.textContent = questionIndex + 1;
	question.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.textContent = answer.text;
		button.classList.add("btn");
		if (answer.correct === true) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
		answersBtn.appendChild(button);
	});
};

const resetState = () => {
	clearStatusClass(answersBtn);
	nextBtn.classList.add("hide");
	while (answersBtn.firstChild) {
		answersBtn.removeChild(answersBtn.firstChild);
	}
};

const selectAnswer = (e) => {
	const selectedBtn = e.target;
	console.log(selectedBtn);
	const correct = selectedBtn.dataset.correct;

	if (correct) {
		showScore.textContent = score += 10;
		console.log("Hello");
	}
	if (score > 20) {
		showScore.style.color = "#999005";
	}
	if (score > 60) {
		showScore.style.color = "#005D00";
		showScore.style.background = "#fff";
	}

	setStatusClass(answersBtn, correct);
	Array.from(answersBtn.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});

	if (shuffledQuestions.length > questionIndex + 1) {
		nextBtn.classList.remove("hide");
	} else {
		startBtn.classList.add("hide");
		finishBtn.classList.remove("hide");
		restartBtn.classList.add("hide");
	}
};

const finishQuiz = () => {
	scoreResult.classList.remove("hide");
	scoreResult.textContent = `Your score is ${score}`;
	quizDisplay.classList.add("hide");
	restartBtn.classList.remove("hide");
	homeBtn.classList.remove("hide");
	homeBtn.addEventListener("click", () => {
		{
			window.location.replace("../index.html");
		}
	});
	finishBtn.classList.add("hide");
};

finishBtn.addEventListener("click", () => {
	finishQuiz();
});

const setStatusClass = (element, correct) => {
	clearStatusClass(element);
	if (correct) {
		element.classList.add("correct");
		console.log("correct");
	} else {
		element.classList.add("wrong");
		console.log("wrong");
	}
};

const clearStatusClass = (element) => {
	element.classList.remove("correct");
	element.classList.remove("wrong");
};
