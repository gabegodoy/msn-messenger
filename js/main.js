import {validateUser} from "./userInfo.js";
let newP = document.createElement('p');

const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');
const loginButton = document.querySelector('#loginButton');
const formContainer = document.querySelector('#formContainer');



loginButton.addEventListener('click', () => {

  if (loginUsername.value === ""){
    formContainer.insertBefore(newP, loginUsername.nextSibling)
    newP.innerText = "Can't be blank"
    newP.classList.add('alert__message')
  }
  
  if (loginPassword.value === ""){
    formContainer.insertBefore(newP, loginPassword.nextSibling)
    newP.innerText = "Can't be blank"
    newP.classList.add('alert__message')
  }
  
  if (loginUsername.value !== "" && loginPassword.value !== ""){

    if (loginUsername.value === "admin" && loginPassword.value == "admin"){
      window.location.replace('users.html')
    } 
    
    else {validateUser(loginUsername.value, loginPassword.value)}
  }
})