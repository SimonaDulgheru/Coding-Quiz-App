const quizButtons = document.querySelectorAll(".button");
const info = document.querySelector(".info");
const jsBtn = document.querySelector(".js");
const phpBtn = document.querySelector(".php");
const javaBtn = document.querySelector(".java");

window.onload = () => {
	quizButtons.forEach((element) => {
		element.classList.remove("hide");
	});

	jsBtn.addEventListener("click", () => {
		{
			window.location.replace("./jsQuiz/javascript.html");
		}
	});

	phpBtn.addEventListener("click", () => {
		window.location.replace("./phpQuiz/php.html");
	});

	javaBtn.addEventListener("click", () => {
		window.location.replace("./javaQuiz/java.html");
	});
};
