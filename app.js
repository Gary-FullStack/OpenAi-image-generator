const apiKey = "KEY GOES HERE";
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

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },

    body: JSON.stringify({
      "model": "image-alpha-001",
      "prompt": prompt,
      "num_images": 1,
      "size": "512x512",
      "response_format": "url",
    })
  }).then(response => response.json())
    .then(data => handleImage(data.data[0].url, prompt))
    .catch(error => handleError(error));
}


function handleImage(img, prompt) {
  main.style.display = "block";
  main.innerHTML = `<p>${prompt}</p>  <img src="${img}" alt="Generated image of ${prompt}">`;
  inputPrompt.value = "";
  form.classList.remove("disabled");
}

function handleError(msg) {
  main.style.display = "block";
  main.innerHTML = `<p class="error">Sorry, there was an error generating that image. <br> <span>${msg}</span></p>`;
}
