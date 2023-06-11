'use strict'

const domain = "http://localhost:4000";
// const domain = "https://startup.pupcake.click";

// Application logic
var map = L.map('map').setView([40.2474025, -111.6541366], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);
// marker.bindPopup("<b>Name of dog</b><br>Breed of dog").openPopup();

async function getMapData() {
  const rq = {
    method: "GET",
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }
  const data = fetch("/api/getMapData", rq).then((r) => r.json());
  // console.log("get", await data);
  return data;
}

async function updateMarkers() {
  const data = await getMapData();
  // console.log(data);
  // console.log(await data);
  for (const sighting of data) {
    addMarker(sighting);
  }
}

function addMarker(sighting) {
  console.log("Creating marker for:\n", sighting)
  var marker = L.marker(L.latLng(sighting.lat, sighting.lng)).addTo(map);
  marker.bindPopup(`<b>${sighting.name}</b><br>${sighting.breed}<br>${sighting.time}`);
}

updateMarkers();

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
