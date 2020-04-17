const questions = [
	{
		question: 'What does CSS stand for?',
		answers: [
			{ text: 'Creative Style Sheet', correct: false },
			{ text: ' Computer Style Sheet', correct: false },
			{ text: 'Cascading Style Sheet', correct: true },
			{ text: 'Colorful Style Sheet', correct: false },
		],
	},
	{
		question:
			'Where in an HTML document is the correct place to refer to an external style sheet?',
		answers: [
			{ text: 'In the <head> section', correct: true },
			{ text: 'At the end of the document', correct: false },
			{ text: 'In the <body> section', correct: false },
			{ text: 'In the <footer> section', correct: false },
		],
	},
	{
		question: 'Which HTML tag is used to define an internal style sheet?',
		answers: [
			{ text: '<css>', correct: false },
			{ text: '<style>', correct: true },
			{ text: '<script>', correct: false },
			{ text: '<link>', correct: false },
		],
	},
	{
		question: 'How do you insert a comment in a CSS file?',
		answers: [
			{ text: '//this is a comment', correct: false },
			{ text: '//this is a comment//', correct: false },
			{ text: '/*this is a comment*/', correct: true },
			{ text: '<this is a comment>', correct: false },
		],
	},
	{
		question: 'Which property is used to change the background color?',
		answers: [
			{ text: 'color', correct: false },
			{ text: 'background-color', correct: true },
			{ text: 'bgcolor', correct: false },
			{ text: 'background', correct: true },
		],
	},
	{
		question:
			'Which CSS property is used to change the text color of an element?',
		answers: [
			{ text: 'textcolor', correct: false },
			{ text: 'text-color', correct: false },
			{ text: 'bgcolor', correct: false },
			{ text: 'color', correct: true },
		],
	},
	{
		question: 'Which CSS property controls the text size?',
		answers: [
			{ text: 'text-style', correct: false },
			{ text: 'font-size', correct: true },
			{ text: 'font-style', correct: false },
			{ text: 'text-size', correct: false },
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
	currentDate();
	timer.classList.remove('hide');
	startBtn.classList.remove('hide');
	message.classList.remove('hide');
	secondsLeft = 5;
	timer.textContent = secondsLeft;
	score = 0;
	showScore.textContent = score;
	console.log(score);
};

const currentDate = () => {
	timer.textContent = secondsLeft;

	let showDate = document.createElement('p');
	stopWatch.appendChild(showDate);
	let today = new Date();
	showDate.textContent = `${today}`;

	console.log(today);
};

startBtn.addEventListener('click', setTime);
function setTime() {
	score = 0;
	startQuiz();
	// randomQuestion();
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
	}, 1000);
}

const showMessage = () => {
	if (secondsLeft === 0) {
		const alertBox = document.createElement('p');
		alertBox.setAttribute('class', 'message-box');
		alertBox.textContent = "Time's Up!";
		message.appendChild(alertBox);

		quizDisplay.classList.add('hide');
		restartBtn.classList.remove('hide');

		nextBtn.classList.add('hide');
		scoreResult.textContent = score;
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

function startQuiz() {
	secondsLeft = 20;
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
}

function setNextQuestion() {
	resetState();
	loadQuestion(shuffledQuestions[questionIndex]);
}

function loadQuestion(question) {
	console.log(question);
	questionsDisplay.innerHTML = question.question;
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
}

function resetState() {
	clearStatusClass(answersBtn);
	nextBtn.classList.add('hide');
	while (answersBtn.firstChild) {
		answersBtn.removeChild(answersBtn.firstChild);
	}
}

function selectAnswer(e) {
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
}

function finishQuiz() {
	scoreResult.classList.remove('hide');
	scoreResult.textContent = `Your score is ${score}`;
	quizDisplay.classList.add('hide');
	restartBtn.classList.remove('hide');
	finishBtn.classList.add('hide');
}

finishBtn.addEventListener('click', () => {
	finishQuiz();
});

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
		console.log('correct');
	} else {
		element.classList.add('wrong');
		console.log('wrong');
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}
