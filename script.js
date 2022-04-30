"use strict";
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable /enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing our joke to VoiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "526cfd2aea3d4669aae9318aa69eb938",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from the jokes api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = ` ${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-To-Speech
    tellMe(joke);
    // Disable button
    toggleButton();
  } catch (error) {
    console.error("Something went wrong, try again", error);
  }
}

// Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
