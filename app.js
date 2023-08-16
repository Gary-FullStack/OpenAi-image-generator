const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/images/generations";

const form = document.querySelector("form");
const inputPrompt = form.querySelector("input");

const recents = document.querySelector("section.recents");
const recentsUL = recents.querySelector("ul");

const main = document.querySelector("main");

const recentImages = [];

// * prevent the default reload of the page on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  generateImage(inputPrompt.value);
});

function generateImage(prompt) {
  form.classList.add("disabled");

  main.style.display = "block";
  main.innerHTML = `<p>Generating that image <span>${prompt}</span> now...</p>`;
}
