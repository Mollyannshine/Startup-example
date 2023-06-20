'use strict'

import { sendMessage } from './websocket.mjs';

const nameEl = document.querySelector("#name");
const locationEl = document.querySelector("#location");
const timeEl = document.querySelector("#time");
const breedEl = document.querySelector("#breed");
const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener('click', async (event) => {
  if (await loggedIn()) {
  const sighting = JSON.stringify({ 
      name: nameEl.value,
      lat: locationEl.value.split(', ')[0],
      lng: locationEl.value.split(', ')[1],
      time: timeEl.value,
      breed: breedEl.value,
  })

  const rq = {
    method: "POST",
    body: sighting,
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }

  console.log("sending sighting:\n", sighting);
  fetch(`/api/addSighting`, rq).then((r) => console.log(r));

  console.log(`socketing ${breedEl.value}`);
  sendMessage(breedEl.value);

  } else {
    console.log("no auth");
  }
})

async function loggedIn() {
  const rq = {
    method: "GET",
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }
  const result = await fetch('/user/me', rq).then((res) => {
    if (res.status === 401) {
      return false;
    } else {
      return true;
    }
  })
  return result;
}
