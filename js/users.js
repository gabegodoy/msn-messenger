var socket = io("http://localhost:3333/");

const userName = document.querySelector('#userName');
const userMessage = document.querySelector('#userMessage')
const userStatus = document.querySelector('#userStatus')
const userImage = document.querySelector('.user__image')

let firstName;
let lastName;

function getUserInfo (username){
  return fetch('http://localhost:3333/users/'+username)
    .then((reponse) => reponse.json())
    .then(data => data) 
    .catch(e => console.log('Error' + e)) 
}


onload = async function(){
    const users = await getUsers()
    let username = getUsernameFromURL()

    const user = await getUserInfo(username)
    
    let status = 'Busy'
    let message = 'Listening to Linking Park'

    emitLogin(username, user.firstName, user.lastName, status, message)
    setHeader(user)
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

/* GET USER MESSAGE */
let currentUserMessage;

userMessage.addEventListener('keypress', (element) =>{
  if (element.key == 'Enter'){
    currentUserMessage = userMessage.value;
    userMessage.value = ''
  }
})


/* GET USER STATUS */
let currentUserStatus = 'online';
changeStatusColour(userStatus)   
changeStatusColour(userImage)   


switch (currentUserStatus) {
  case 'online':
    
    break;

  default:
    break;
}

userStatus.addEventListener('change', () => {
  currentUserStatus = userStatus.options[userStatus.selectedIndex].value
  changeStatusColour(userStatus)   
  changeStatusColour(userImage)   

  

})

function changeStatusColour (place){
  place.classList.toggle('status__online', currentUserStatus == 'online')
  place.classList.toggle('status__busy', currentUserStatus == 'busy')
  place.classList.toggle('status__absent', currentUserStatus == 'absent')
}




function getUsers(){
    return fetch('http://localhost:3333/users')
        .then(response => response.json())
        .then(data => data)
}

function getUsernameFromURL(){
    let url = new URL(window.location.href);
    return url.searchParams.get("username");
}

function setHeader(user){
  userName.innerHTML = user.firstName + ' ' + user.lastName
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






/* LINKEDIN LINK ON DEVs USERS*/
const gabrielDiv = document.querySelector('#gabriel');
const guilhermeDiv = document.querySelector('#guilherme');

gabrielDiv.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/gabecgodoy/");
})

guilhermeDiv.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/guilherme-fcm/");
})