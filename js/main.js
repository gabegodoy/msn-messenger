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
  
  //let alertMessageLogin = document.querySelector('.alert__message'); 
  //formContainer.removeChild(alertMessageLogin)
  
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
    validateUser(loginUsername.value, loginPassword.value)
    //LOADING SCREEN
  }
})


/* VALIDATE AND SET USER INFO ON HEADER */
const userName = document.querySelector('#userName');
const userImage = document.querySelector('#userImage');
const userStatus = document.querySelector('#userStatus');
const userMessage = document.querySelector('#userMessage');

// function validateUser (username, password){
//   const options = {
//     method: 'POST',
//     body: JSON.stringify({ username, password }),
//     headers: {"Content-type": "application/json; charset=UTF-8"}
//     //cache: 'defaut'
//   }

//   fetch('http://localhost:3333/users/authenticate', options)
  
//     .then((reponse) => reponse.json())
//     .then(data => {
//       if (data.error){
//         console.log(data.error) 
        
//         //Print validation error on Login Screen
//         loginContainer.insertBefore(newP, formContainer)
//         newP.innerText = data.error
//         newP.classList.add('alert__message')
//         newP.style.textAlign = 'center'

//       }
//       else{
//         userInfo = data;
//         window.location.replace('users.html')

//         // ?username=${data.username}
//         //userName.innerHTML(data.firstName + ' ' + data.lastName)    
//       }

//     }) 

//     .catch(e => console.log('Error' + e)) 
// }

