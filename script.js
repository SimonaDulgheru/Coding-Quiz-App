
const startBtn = document.querySelector('.start-btn');
let nextBtn = document.getElementById('next-btn');
let restartBtn = document.getElementById('restart-btn');
let finishBtn = document.getElementById('finish-btn');
const quizButtons = document.querySelectorAll('.button');
const info = document.querySelector('.info')
const jsBtn = document.querySelector('.js')
const phpBtn = document.querySelector('.php')
const javaBtn = document.querySelector('.java')



window.onload = () =>
{
	info.classList.remove('hide')
	quizButtons.forEach(element =>
	{
		element.classList.remove('hide')
	})

	startBtn.classList.add('hide');
	jsBtn.addEventListener('click', () =>
	{
		{
			info.classList.add('hide')
			window.location.replace('./jsQuiz/javascript.html')
			quizButtons.forEach(element =>
			{
				element.classList.add('hide')
			})
		};
	})
	phpBtn.addEventListener('click', () =>
	{
		window.location.replace('./phpQuiz/php.html')
	})
	javaBtn.addEventListener('click', () =>
	{
		window.location.replace('./javaQuiz/java.html')
	})

};


