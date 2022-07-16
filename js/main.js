import {validateUser} from "./userInfo.js";
// console.log(userInfo)
// userInfo = 'passou na main'


/* LOGIN CHECK */
const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');
const loginButton = document.querySelector('#loginButton');
const formContainer = document.querySelector('.form__container');
const loginContainer = document.querySelector('#loginContainer')

let newP = document.createElement('p');

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
    
    
    else {validateUser(loginUsername.value, loginPassword.value)
    }
    
    //LOADING SCREEN
  }
  
})


/* VALIDATE AND SET USER INFO ON HEADER */
const userName = document.querySelector('#userName');
const userImage = document.querySelector('#userImage');
const userStatus = document.querySelector('#userStatus');
const userMessage = document.querySelector('#userMessage');
