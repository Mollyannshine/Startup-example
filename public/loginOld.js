'use strict'

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
