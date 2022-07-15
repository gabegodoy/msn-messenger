
import {userInfo} from "./userInfo.js";
console.log(userInfo)

var socket = io("http://localhost:3333/");

const userName = document.querySelector('#userName');
let firstName;
let lastName;

function getUserInfo (username){
  const options = {
    method: 'GET',
    //cache: 'defaut'
  }

  fetch('http://localhost:3333/users/'+username, options)
  
    .then((reponse) => reponse.json())
    .then(data => {
      firstName = data.firstName
      lastName = data.lastName   
    }) 

    .catch(e => console.log('Error' + e)) 
}


onload = async function(){
    const users = await getUsers()
    let username = getUsernameFromURL()

    let status = 'Busy'
    let message = 'Listening to Linking Park'

    getUserInfo(username)

    emitLogin(username, firstName, lastName, status, message)
    setHeader()
    users.forEach(user => {
        createContact(user.firstName, user.lastName, 'status', 'message', offlineUsersList)
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
const offlineUsersList = document.querySelector('#offlineUsersList');
const onlineUsersList = document.querySelector('#onlineUsersList');
let newDiv = document.createElement('div');
let newP = document.createElement('p');
let newImg = document.createElement('img');

function createContact (name, surname, status, message, nodeParent){
  let image = 'assets/images/default-user-profile.png';

  setDiv(nodeParent, 'contact__info__container')
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

// function getOneUser(username){
//     return fetch('http://localhost:3333/users/'+username)
//         .then(response => response.json())
//         .then(data => data)
// }

function getUsernameFromURL(){
    let url = new URL(window.location.href);
    return url.searchParams.get("username");
}

async function setHeader(){
  userName.innerHTML(firstName + ' ' + lastName)



    // alterar nome do usuário no cabeçalho
    // console.log(await getOneUser(username))
}

// Websockets
function emitLogin(username, firstName, lastName, status, message){
    socket.emit('login', { username, firstName, lastName, status, message })
}

function emitLogoff(username){
    socket.emit('logoff', { username })
    window.location.href = '/'
}

//EMIT É RESPONSÁVEL POR ENVIAR DADOS
  //ATUALIZA MUDANÇA NO EVENTO

//ON É RESPONSÁVEL POR ESCUTAR

socket.on('login', data => {
    console.log(data)

    data.forEach((element) => {
      createContact(element.firstName, element.lastName, 'status', 'message', onlineUsersList)

    })

})

socket.on('logoff', data => {
    console.log(data)
})
