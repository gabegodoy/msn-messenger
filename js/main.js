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


/* SET USER INFO ON HEADER */
const userName = document.querySelector('#userName');
const userImage = document.querySelector('#userImage');
const userStatus = document.querySelector('#userStatus');
const userMessage = document.querySelector('#userMessage');



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