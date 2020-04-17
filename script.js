const questions = [
	{
		question: 'Inside which HTML element do we put the JavaScript?',
		answers: [
			{ text: '<script>', correct: true },
			{ text: ' <scripting>', correct: false },
			{ text: 'javascript', correct: false },
			{ text: '<js>', correct: false },
		],
	},
	{
		question: 'Where is the correct place to insert a JavaScript?',
		answers: [
			{ text: 'The <head> section', correct: false },
			{ text: 'The <body> section', correct: false },
			{ text: 'In the <footer> section', correct: false },
			{
				text: 'Both <head> and <body> section',
				correct: true,
			},
		],
	},
	{
		question: 'How do you write "Hello World" in an alert box?',
		answers: [
			{ text: 'msg("Hello World")', correct: false },
			{ text: 'msgBox("Hello World")', correct: false },
			{ text: 'alertBox("Hello World")', correct: false },
			{ text: 'alert("Hello World")', correct: true },
		],
	},
	{
		question: 'How do you create a function in JavaScript?',
		answers: [
			{ text: 'function = myFunction()', correct: false },
			{ text: 'function myFunction()', correct: true },
			{ text: 'function:myFunction()', correct: false },
			{ text: 'function => myFunction()', correct: false },
		],
	},
	{
		question: 'How do you call a function named "myFunction"?',
		answers: [
			{ text: 'call myFunction()', correct: false },
			{ text: 'myFunction()', correct: true },
			{ text: 'call function myFunction()', correct: false },
			{ text: 'call function ()', correct: false },
		],
	},
	{
		question: 'How to write an IF statement in JavaScript?',
		answers: [
			{ text: 'if i === 5 then', correct: false },
			{ text: 'if i = 5 then', correct: false },
			{ text: 'if (i === 5)', correct: true },
			{ text: 'if i = 5', correct: false },
		],
	},
	{
		question: 'What is the correct way to write a JavaScript array?',
		answers: [
			{ text: 'let colors = (1:"red", 2:"blue")', correct: false },
			{ text: 'let colors = ("red", "blue")', correct: false },
			{ text: 'let colors = ["red", "blue"]', correct: true },
			{ text: 'let colors = (["red", "blue"])', correct: false },
		],
	},
	{
		question: 'How do you round the number 7.25, to the nearest integer?',
		answers: [
			{ text: 'Math.round(7.25)', correct: true },
			{ text: 'round(7.25)', correct: false },
			{ text: 'Math.rnd(7.25)', correct: false },
			{ text: 'rnd(7.25)', correct: false },
		],
	},
	{
		question: 'How do you declare a JavaScript variable?',
		answers: [
			{ text: 'variable carName', correct: false },
			{ text: 'var carName', correct: true },
			{ text: 'v carName', correct: false },
			{ text: 'let carName', correct: true },
		],
	},
	{
		question: 'Which event occurs when the user clicks on an HTML element?',
		answers: [
			{ text: 'onmouseclick', correct: false },
			{ text: 'onchange', correct: false },
			{ text: 'onclick  ', correct: true },
			{ text: 'onmouseover', correct: false },
		],
	},
];

const stopWatch = document.querySelector('#stopWatch');
const startBtn = document.getElementById('start-btn');
let nextBtn = document.getElementById('next-btn');
let restartBtn = document.getElementById('restart-btn');
let finishBtn = document.getElementById('finish-btn');
const timer = document.getElementById('timer');
const quizContainer = document.getElementById('quiz-container');
const questionNumValue = document.querySelector('.question-num-value');
const totalQ = document.querySelector('.total-questions');
let questionsDisplay = document.querySelector('.question'); //question
const options = document.querySelector('.options');
const answersBtn = document.getElementById('answers-btn '); //answer
const message = document.querySelector('.message');
const showScore = document.getElementById('score');
const scoreResult = document.getElementById('result');
const container = document.querySelector('.container');
const quizDisplay = document.querySelector('.quiz-display ');

let score;
let index = 0;
totalQ.textContent = questions.length;
let secondsLeft;
let shuffledQuestions, questionIndex; //currentquestionIndex

window.onload = () => {
	quizContainer.classList.remove('hide');

	timer.classList.remove('hide');
	startBtn.classList.remove('hide');
	message.classList.remove('hide');

	timer.textContent = secondsLeft;
	score = 0;
	showScore.textContent = score;
	console.log(score);
};

startBtn.addEventListener('click', setTime);
function setTime() {
	score = 0;
	startQuiz();

	let timerSeconds = setInterval(function () {
		secondsLeft--;

		timer.textContent = secondsLeft;

		if (
			secondsLeft === 0 ||
			shuffledQuestions.length == questionIndex + 1
		) {
			clearInterval(timerSeconds);
			showMessage();
		}
		if (secondsLeft <= 10) {
			timer.style.background = '#990005';
		}
	}, 1000);
}

const showMessage = () => {
	if (secondsLeft === 0) {
		scoreResult.classList.remove('hide');
		scoreResult.textContent = `Your score is ${score}`;

		const alertBox = document.createElement('p');
		alertBox.setAttribute('class', 'message-box');
		alertBox.textContent = "Time's Up!";
		message.appendChild(alertBox);

		quizDisplay.classList.add('hide');
		restartBtn.classList.remove('hide');
		nextBtn.classList.add('hide');
	}
};

restartBtn.addEventListener('click', restart);
function restart() {
	setTime();
	startQuiz();
	timer.classList.remove('hide');
	message.classList.add('hide');
}

nextBtn.addEventListener('click', () => {
	questionIndex++;
	setNextQuestion();
});

const startQuiz = () => {
	secondsLeft = 60;
	timer.textContent = secondsLeft;
	score = 0;
	showScore.textContent = score;
	quizDisplay.classList.remove('hide');
	startBtn.classList.add('hide');
	scoreResult.classList.add('hide');
	restartBtn.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	questionIndex = 0;
	quizContainer.classList.remove('hide');
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
		const button = document.createElement('button');
		button.textContent = answer.text;
		button.classList.add('btn');
		if (answer.correct === true) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answersBtn.appendChild(button);
	});
};

const resetState = () => {
	clearStatusClass(answersBtn);
	nextBtn.classList.add('hide');
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
		console.log('Hello');
	}

	setStatusClass(answersBtn, correct);
	Array.from(answersBtn.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});

	if (shuffledQuestions.length > questionIndex + 1) {
		nextBtn.classList.remove('hide');
	} else {
		startBtn.classList.add('hide');
		finishBtn.classList.remove('hide');
		restartBtn.classList.add('hide');
	}
};

const finishQuiz = () => {
	scoreResult.classList.remove('hide');
	scoreResult.textContent = `Your score is ${score}`;
	quizDisplay.classList.add('hide');
	restartBtn.classList.remove('hide');
	finishBtn.classList.add('hide');
};

finishBtn.addEventListener('click', () => {
	finishQuiz();
});

const setStatusClass = (element, correct) => {
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
		console.log('correct');
	} else {
		element.classList.add('wrong');
		console.log('wrong');
	}
};

const clearStatusClass = (element) => {
	element.classList.remove('correct');
	element.classList.remove('wrong');
};
