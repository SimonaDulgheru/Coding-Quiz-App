const questions = [
	{
		question: 'What is a correct syntax to output "Hello World" in Java?',
		answers: [
			{ text: 'System.out.println("Hello World");  ', correct: true },
			{ text: 'print ("Hello World");', correct: false },
			{ text: 'echo("Hello World");', correct: false },
			{ text: 'Console("Hello World");', correct: false },
		],
	},
	{
		question:
			"Which data type is used to create a variable that should store text?",
		answers: [
			{ text: "Txt", correct: false },
			{ text: "string", correct: false },
			{ text: "myString", correct: false },
			{
				text: "String ",
				correct: true,
			},
		],
	},
	{
		question: "How do you create a variable with the numeric value 5?",
		answers: [
			{ text: "num x = 5", correct: false },
			{ text: "float x = 5;", correct: false },
			{ text: "x = 5;", correct: false },
			{ text: "int x = 5;  ", correct: true },
		],
	},
	{
		question: "Which method can be used to find the length of a string?",
		answers: [
			{ text: "getLength()", correct: false },
			{ text: "length()  ", correct: true },
			{ text: "len()", correct: false },
			{ text: "getSize()", correct: false },
		],
	},
	{
		question: "Which operator is used to add together two values?",
		answers: [
			{ text: "The * sign", correct: false },
			{ text: "The + sign  ", correct: true },
			{ text: "The & sign", correct: false },
			{ text: "The / sign", correct: false },
		],
	},
	{
		question:
			"Which method can be used to return a string in upper case letters?",
		answers: [
			{ text: "touppercase()", correct: false },
			{ text: "upperCase()", correct: false },
			{ text: "toUpperCase()  ", correct: true },
			{ text: "tuc()", correct: false },
		],
	},
	{
		question: "How do you create a method in Java?",
		answers: [
			{ text: "methodName.", correct: false },
			{ text: "methodName[]", correct: false },
			{ text: "methodName()  ", correct: true },
			{ text: "(methodName)", correct: false },
		],
	},
	{
		question: "How do you call a method in Java?",
		answers: [
			{ text: "methodName();  ", correct: true },
			{ text: "(methodName);", correct: false },
			{ text: "methodName;", correct: false },
			{ text: "methodName[];", correct: false },
		],
	},
	{
		question: "Which keyword is used to create a class in Java?",
		answers: [
			{ text: "class()", correct: false },
			{ text: "class  ", correct: true },
			{ text: "MyClass", correct: false },
			{ text: "className", correct: true },
		],
	},
	{
		question: "Which keyword is used to return a value inside a method?",
		answers: [
			{ text: "break", correct: false },
			{ text: "void", correct: false },
			{ text: "return", correct: true },
			{ text: "break", correct: false },
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
let questionsDisplay = document.querySelector(".question");
const options = document.querySelector(".options");
const answersBtn = document.getElementById("answers-btn ");
const message = document.querySelector(".message");
const showScore = document.getElementById("score");
const scoreResult = document.getElementById("result");
const container = document.querySelector(".container");
const quizDisplay = document.querySelector(".quiz-display ");
const quizButtons = document.querySelectorAll(".button");
const info = document.querySelector(".info");
const cssBtn = document.querySelector(".css");
const homeBtn = document.querySelector(".home-btn");
const backBtn = document.querySelector(".back-btn");

let score;
let index = 0;
totalQ.textContent = questions.length;
let secondsLeft;
let shuffledQuestions, questionIndex;

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
};

backBtn.addEventListener("click", () => {
	window.location.replace("../index.html");
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
	const correct = selectedBtn.dataset.correct;
	if (correct) {
		showScore.textContent = score += 10;
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
	} else {
		element.classList.add("wrong");
	}
};

const clearStatusClass = (element) => {
	element.classList.remove("correct");
	element.classList.remove("wrong");
};
