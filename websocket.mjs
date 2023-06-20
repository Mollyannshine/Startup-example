'use strict'

const socketAlert = document.querySelector('#socket-alerts');

// setInterval(() => {
// const numDogs = Math.floor(Math.random() * 3000);
// sendMessage(`${numDogs}`);
// }, 5000);

// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  console.log("webSocket open");
};

// Display messages we receive from our friends
socket.onmessage = async (event) => {
  const breed = await event.data.text();
  displayMessage(breed);
};

// If the webSocket is closed then disable the interface
socket.onclose = (event) => {
  console.log("webSocket closed");
};

// Send a message over the webSocket
export function sendMessage(breed) {
    displayMessage(breed);
    const msg = `${breed}`;
    socket.send(msg);
}

function displayMessage(breed) {
  socketAlert.textContent = `A ${breed} was just sighted!`;
}