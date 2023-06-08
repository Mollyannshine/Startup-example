'use strict'

const domain = "http://localhost:4000";
// const domain = "https://startup.pupcake.click";

// Submitting new sighting
const nameEl = document.querySelector("#name");
const locationEl = document.querySelector("#location");
const timeEl = document.querySelector("#time");
const breedEl = document.querySelector("#breed");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener('click', (event) => {
  console.log('clicked submit')
  const sighting = JSON.stringify({ 
      name: nameEl.value,
      location: locationEl.value,
      time: timeEl.value,
      breed: breedEl.value,
  })

  localStorage.setItem(sighting.time, sighting);
  console.log(localStorage.getItem(sighting.time));

  fetch(`${domain}/api/addSighting`, {
    method: `POST`,
    body: sighting,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((r) => console.log(r));
})
