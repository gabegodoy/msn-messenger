/* LOGIN CHECK */
const loginUsername = document.querySelector('#loginUsername');
const loginPassword = document.querySelector('#loginPassword');
const loginButton = document.querySelector('#loginButton');
const loginContainer = document.querySelector('.form__container')

loginButton.addEventListener('click', () => {
  
  //let alertMessageLogin = document.querySelector('.alert__message'); 
  //loginContainer.removeChild(alertMessageLogin)
  
  if (loginUsername.value === ""){
    loginContainer.insertBefore(newP, loginUsername.nextSibling)
    newP.innerText = "Can't be blank"
    newP.classList.add('alert__message')
  }
  
  if (loginPassword.value === ""){
    loginContainer.insertBefore(newP, loginPassword.nextSibling)
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

function validateUser (username, password){
  const options = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    //cache: 'defaut'
  }

  fetch('http://localhost:3333/users/authenticate', options)
  
    .then((reponse) => reponse.json())
    .then(data => {
      console.log(data)
      if (data.error) console.log(data.error)
      else
        window.location.replace(`users.html?username=${data.username}`)
      userName.innerHTML(data.firstName + ' ' + data.lastName)    
    }) 

    .catch(e => console.log('Error' + e)) //Print on Login Screen
}






/* CREATE NEW ACCOUNT */
const signFirstName = document.querySelector('#signFirstName');
const signLastName = document.querySelector('#signLastName');
const signMail = document.querySelector('#signMail');
const signUsername = document.querySelector('#signUsername');
const signPassword = document.querySelector('#signPassword');
const signPasswordConfirm = document.querySelector('#signPasswordConfirm');  
const signButton = document.querySelector('#signButton')
const signInputs = document.querySelectorAll('.sign__input');


signButton.addEventListener('click', () => {

  
  signInputs.forEach((element) => {
    if (element.value === ""){
      console.log('empty')
      //loginContainer.insertBefore(newP, element.nextSibling)
      //newP.innerText = "Can't be blank"
      //newP.classList.add('alert__message')
    }
  })
  
})



/* ARROW SHOW/HIDE CATEGORY */
let categoryArrow = document.querySelectorAll('#categoryArrow');
categoryArrow.forEach((element) => {

  element.addEventListener('click', () => {
    let quantityOfItems = element.parentElement.parentElement.parentElement.childNodes.length -1; 
    
    element.classList.toggle('contacts__category__arrow--active')
    
    for (let i=3; i <= quantityOfItems; i++){
      
      let selectedCategory = element.parentElement.parentElement.parentElement.childNodes[i]

      if (selectedCategory.nodeName != '#text'){
        selectedCategory.classList.toggle('display--hide')
      }  

    }

  })
  
});





/* CREATE ONLINE USERS */
const onlineUsersList = document.querySelector('#onlineUsersList')
let newDiv = document.createElement('div');
let newP = document.createElement('p');
let newImg = document.createElement('img');

function createContact (name, surname, status, message){
  let image = 'assets/images/default-user-profile.png';

  setDiv(onlineUsersList, 'contact__info__container')
  setImage(newDiv, image)
  setDiv(newDiv, 'contact__info')
  setName(newDiv, name, surname)
  setStatus(newDiv, status)
  setMessage(newDiv, message)
}

function setDiv (parent, className){
  newDiv = document.createElement('div')
  parent.appendChild(newDiv)
  newDiv.classList.add(className)
} 

function setImage (parent, imageSrc){
  newImg = document.createElement('img')
  parent.appendChild(newImg)
  newImg.classList.add('contact__image')
  newImg.src = imageSrc
}

function setName (parent, name, surname){
  newP = document.createElement('p')
  parent.appendChild(newP)
  newP.classList.add('contact__info__name')
  newP.textContent = name + ' ' + surname
}

function setStatus (parent, status){
  newP = document.createElement('p')
  parent.appendChild(newP)
  newP.classList.add('contact__info__status')
  newP.textContent = status
}



function setMessage (parent, message){
  newP = document.createElement('p')
  parent.appendChild(newP)
  newP.classList.add('contact__info__message')
  newP.textContent = message
}

/* Your password must include a minimum of three of the following mix of character types: uppercase, lowercase, numbers, and ! @ # $ % ^ & * () <> [] {} | _+-= symbols.

The passwords don't match.

top || Wrong email or password.

*/