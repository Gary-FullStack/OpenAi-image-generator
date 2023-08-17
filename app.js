const apiKey = "SECRET GOES HERE";
const apiUrl = "https://api.openai.com/v1/images/generations";

const form = document.querySelector("form");
const inputPrompt = form.querySelector("input");

const recents = document.querySelector("section.recents");
const recentsUL = recents.querySelector("ul");

const main = document.querySelector("main");

const recentImages = [];

form.addEventListener("submit", e => {
  e.preventDefault();
  generateImage(inputPrompt.value);
});

function generateImage(prompt) {
  form.classList.add("disabled");

  main.style.display = "block";
  main.innerHTML = `<p>Generating image <span>${prompt}</span></p>`;

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      "model": "image-alpha-001",
      "prompt": prompt,
      "num_images": 1,
      "size": "512x512",
      "response_format": "url",
    }),
  })
    .then(response => response.json())
    .then(data => handleImage(data))
    .catch(error => handleError(error));
}

function handleImage(img) {
  console.log(img)
    
    
}

function handleError(msg) {
  main.style.display = "block";
  main.innerHTML = `
    <p class="error">error with your request. <br> <span>${msg}</span>
    `;
}
