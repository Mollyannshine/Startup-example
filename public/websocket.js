'use strict'

setInterval(() => {
const numDogs = Math.floor(Math.random() * 3000);
const socketAlert = document.querySelector('#socket-alerts');
socketAlert.textContent = `${numDogs}nth dog sighting just in!`;
}, 5000);
