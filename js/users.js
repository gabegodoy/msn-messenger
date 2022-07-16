var socket = io("http://localhost:3333/");

const userName = document.querySelector('#userName');
const userMessage = document.querySelector('#userMessage')
const userStatus = document.querySelector('#userStatus')
const userImage = document.querySelector('#userImage')

const offlineUsersList = document.querySelector('#offlineUsersList');
const onlineUsersList = document.querySelector('#onlineUsersList');

let newDiv = document.createElement('div');
let newP = document.createElement('p');
let newImg = document.createElement('img');

let firstName;
let lastName;
let currentUserMessage = '';
let currentUserStatus = 'online';



function getUserInfo (username){
  return fetch('http://localhost:3333/users/'+username)
    .then((reponse) => reponse.json())
    .then(data => data) 
    .catch(e => console.log('Error' + e)) 

    // if (e) {window.location.replace('index.html')};
}

onload = async function(){
    const users = await getUsers()
    let username = getUsernameFromURL()
    let status = currentUserStatus
    let message = currentUserMessage

    const user = await getUserInfo(username)
    
    //SEND user.status and user.message
    emitLogin(username, user.firstName, user.lastName, status, message)

    setHeader(user)
    users.forEach(user => {
        createContact(user.firstName, user.lastName, 'status', 'message', offlineUsersList)
    })
}



/* PRINT USERS ON SCREEN*/
function createContact (name, surname, status, message, nodeParent){
  let image = 'assets/images/default-user-profile.png'; //Default Image

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
userMessage.addEventListener('keypress', (element) =>{
  if (element.key == 'Enter'){
    currentUserMessage = userMessage.value;
    userMessage.value = ''
  }
})


/* UPDATE USER STATUS */   
userStatus.addEventListener('change', () => {
  currentUserStatus = userStatus.options[userStatus.selectedIndex].value
  changeStatusColour(userStatus)   
  changeStatusColour(userImage)   
  //RE-LOAD THE DATA-BASE
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
  changeStatusColour(userStatus)   
  changeStatusColour(userImage)
}



/* WEBSOCKETS */
function emitLogin(username, firstName, lastName, status, message){
  socket.emit('login', { username, firstName, lastName, status, message })
}

function emitLogoff(username){
  socket.emit('logoff', { username })
  window.location.href = '/'
}

  //EMIT É RESPONSÁVEL POR ENVIAR DADOS // ATUALIZA MUDANÇA NO EVENTO
  //ON É RESPONSÁVEL POR ESCUTAR
  
socket.on('login', data => {
  console.log(data)

  //send element.status and element.message
  data.forEach((element) => {
    createContact(element.firstName, element.lastName, 'status', 'message', onlineUsersList)
  })
})

socket.on('logoff', data => {
  console.log(data)
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



/* LINKEDIN LINK ON DEVs USERS*/
const gabrielDiv = document.querySelector('#gabriel');
const guilhermeDiv = document.querySelector('#guilherme');

gabrielDiv.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/gabecgodoy/");
})

guilhermeDiv.addEventListener('click', () => {
  window.open("https://www.linkedin.com/in/guilherme-fcm/");
})