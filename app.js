const apiKey = "ADD SECRET API KEY HERE";
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
    .then(data => handleImage(data.data[0].url, prompt))
    .catch(error => handleError(error));
}

function handleImage(img, prompt) {
  main.style.display = 'block';
  main.innerHTML = 
    `<img src="${img}" alt="generated image ${prompt}">
    `;
  
  
  inputPrompt.value = '';
  form.classList.remove('disabled');
  handleRecents(img, prompt);
}

function handleRecents(image, prompt) {
  recents.style.display = "block";
  recentsUL.innerHTML = '';
  recentImages.reverse();
  recentImages.push({ image: image, prompt: prompt, });
  recentImages.reverse().forEach(recent => {
    recentsUL.innerHTML +=
      `
      <li>
        <a href="${recent.image}" target="_blank" title="${recent.prompt}">
          <img src="${recent.image}" alt="Generated image for ${recent.prompt}">
        </a>
      </li>
      `
  })
  
}

function handleError(msg) {
  main.style.display = "block";
  main.innerHTML = `
    <p class="error">error with your request. <br> <span>${msg}</span>
    `;
}
