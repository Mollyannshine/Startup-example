'use strict'

async function getRandomDog() {
    const dogPicEl = document.getElementById("dog-pic");
    const res = await fetch("https://dog.ceo/api/breeds/image/random", { method: "GET" })
    const pic = await res.json();
    dogPicEl.src = pic.message;
  }
  
getRandomDog();