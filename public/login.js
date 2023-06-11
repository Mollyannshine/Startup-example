'use strict'

const usernameEl = document.querySelector("#username");
const passwordEl = document.querySelector("#password");
const loginBtn = document.querySelector("#login");
const signInDiv = document.querySelector("#sign-in");
const signUpBtn = document.querySelector("#sign-up");

loginBtn.addEventListener('click', (event) => {
  fetch(`/auth/login`, {
    method: `POST`,
    body: JSON.stringify({email: usernameEl.value, password: passwordEl.value}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
  },
  }).then((r) => {
  if (r.status === 200) {
    goodSignIn();
  } else {
    badSignIn();
  }
  });
  
});

signUpBtn.addEventListener('click', (event) => {
  fetch(`/auth/create`, {
    method: `POST`,
    body: JSON.stringify({email: usernameEl.value, password: passwordEl.value}),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
  },
  });
  goodSignIn();
});

function goodSignIn() {
  signInDiv.innerHTML = "";
  localStorage.setItem('logged-in', true);
  localStorage.setItem('username', usernameEl.value);
  
  // let usernameDisplayDiv = document.createElement("div");
  // usernameDisplayDiv.className = "row";
  let usernameDisplayP = document.createElement("p");
  usernameDisplayP.className = "col";

  usernameDisplayP.textContent = `You've logged in as ${usernameEl.value}`;
  // usernameDisplayDiv.appendChild(usernameDisplayP);
  // signInDiv.appendChild(usernameDisplayDiv);
  signInDiv.appendChild(usernameDisplayP);
}

function badSignIn() {
  signInDiv.innerHTML = "";
  localStorage.setItem('logged-in', false);
  localStorage.setItem('username', null);
  
  // let usernameDisplayDiv = document.createElement("div");
  // usernameDisplayDiv.className = "row";
  let usernameDisplayP = document.createElement("p");
  usernameDisplayP.className = "col";

  usernameDisplayP.textContent = `Not logged in`;
  // usernameDisplayDiv.appendChild(usernameDisplayP);
  // signInDiv.appendChild(usernameDisplayDiv);
  signInDiv.appendChild(usernameDisplayP);
}
