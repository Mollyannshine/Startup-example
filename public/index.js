'use strict'

const domain = "http://localhost:4000";
// const domain = "https://startup.pupcake.click";

// Application logic
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("<b>Name of dog</b><br>Breed of dog").openPopup();


// Login
const usernameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const signInDiv = document.querySelector("#sign-in");

loginBtn.addEventListener('click', (event) => {
  console.log('clicked login');
  fetch(`${domain}/api/login`, {
    method: `POST`,
    body: {username: usernameEl.value, password: passwordEl.value},
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
  },
  }).then((r) => console.log(r));

  localStorage.setItem('logged-in', true);
  localStorage.setItem('username', usernameEl.value);

  let usernameDisplayDiv = document.createElement("div");
  usernameDisplayDiv.className = "row";
  let usernameDisplayP = document.createElement("p");
  usernameDisplayP.className = "col";
  usernameDisplayP.textContent = `You've logged in as ${usernameEl.value}`;
  usernameDisplayDiv.appendChild(usernameDisplayP);
  signInDiv.appendChild(usernameDisplayDiv);
});
