//import tryHard from './main.js'
//console.log('./main.js')

var socket = io("http://localhost:3333/");

onload = async function(){
    const users = await getUsers()
    let username = getUsernameFromURL()
    emitLogin(username)
    setHeader()
    users.forEach(user => {
        createContact(user.firstName, user.lastName, 'status', 'message')
    })
}

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
const offlineUsersList = document.querySelector('#offlineUsersList')
let newDiv = document.createElement('div');
let newP = document.createElement('p');
let newImg = document.createElement('img');

function createContact (name, surname, status, message){
  let image = 'assets/images/default-user-profile.png';

  setDiv(offlineUsersList, 'contact__info__container')
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


function getUsers(){
    return fetch('http://localhost:3333/users')
        .then(response => response.json())
        .then(data => data)
}

function getOneUser(username){
    return fetch('http://localhost:3333/users/'+username)
        .then(response => response.json())
        .then(data => data)
}

function getUsernameFromURL(){
    let url = new URL(window.location.href);
    return url.searchParams.get("username");
}

async function setHeader(){
    let username = getUsernameFromURL()
    // alterar nome do usuário no cabeçalho
    console.log(await getOneUser(username))
}

// Websockets
function emitLogin(username){
    socket.emit('login', { username })
}

function emitLogoff(username){
    socket.emit('logoff', { username })
    window.location.href = '/'
}

socket.on('login', data => {
    console.log(data)
})

socket.on('logoff', data => {
    console.log(data)
})
