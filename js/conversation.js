import baseUrl from './serverUrl.js'

var socket = io(baseUrl);
let currentMessage;
let newP = document.createElement('p');

const user1 = getUsernameFromURL(1)
const user2 = getUsernameFromURL(2)

/* HTML ELEMENTS */
const userName = document.querySelector('#userName');
const userNote = document.querySelector('#userMessage')
const userStatus = document.querySelector('#userStatus')
const userImage = document.querySelector('#userImage')
const headerArrow = document.querySelector('#headerArrow');
const messagesContainer = document.querySelector('#messagesContainer');
/* INPUT WRITTER & ICONS */
const writeInput = document.querySelector('#writeInput');
const cameraIcon = document.querySelector('#cameraIcon');
const micIcon = document.querySelector('#micIcon');
const sendIcon = document.querySelector('#sendIcon');



/* GET USERS */
function getUsernameFromURL(n){
  let url = new URL(window.location.href);
  return url.searchParams.get("username"+n);
}

function getUserInfo (username){
  return fetch(baseUrl+'/users/'+username)
  .then((reponse) => reponse.json())
  .then(data => data) 
  .catch(e => console.log('Error' + e)) 
}



/* PRINT HEADER */
function setHeader(user){
  userName.innerHTML = user.firstName + ' ' + user.lastName
  // changeStatusColour(userStatus)   
  // changeStatusColour(userImage)
  userNote.innerHTML = user.note
}
/* HEADER | GET BACK ARROW */
headerArrow.addEventListener('click', () => {
  window.location.replace('users.html?username='+user1)
})



/* SCREEN LOAD */
onload = async function(){
  let status = 'status'
  let note = 'note'
  const user = await getUserInfo(user2)
  
  // emitOpenChat(user2)
  this.setTimeout(() => { emitOpenChat(user1) }, 2000)
  
  setHeader(user)
  getOldMessages()
}



/* SOCKET MECHANISM */
function emitOpenChat(username){
  // buscar todas as mensagens na api
  const socketId = socket.id
  socket.emit('openChat', { username, socketId })
}

function emitMessage(sender, recipient, text){
  socket.emit('message', { sender, recipient, text })
}

socket.on('message', data => {
  newMessage(data.text, 'from-them')
})



/* CREATE NEW MESSAGE */
function newMessage (message, className){
  newP = document.createElement('p')
  messagesContainer.appendChild(newP)
  newP.classList.add(className)
  newP.textContent = message
}

/* GET CURRENT MESSAGE */
sendIcon.addEventListener('click', () =>{
  currentMessage = writeInput.value;
  writeInput.value = ''

  emitMessage(user1, user2, currentMessage)
  newMessage(currentMessage, 'from-me')
  newP.scrollIntoView()
  
  cameraIcon.classList.remove('display--hide')
  micIcon.classList.remove('display--hide')
  sendIcon.classList.add('display--hide')
})

/* GET OLD MESSAGES */
function getOldMessages (){
  return fetch(baseUrl+'/messages?sender='+user1+'&recipient='+user2)
    .then((reponse) => reponse.json())
    .then(data =>
    
      data.forEach(element => {
        if (element.sender === user1) newMessage(element.text, 'from-me')
        else if (element.sender === user2) newMessage(element.text, 'from-them')
        
        newP.scrollIntoView()        
      })
    ) 
    .catch(e => console.log('Error' + e)) 
}



/* CHANGE ICONS ON INPUT CONTAINER */
writeInput.addEventListener('input', () =>{

  if (writeInput.value.length > 0) {    
    cameraIcon.classList.add('display--hide')
    micIcon.classList.add('display--hide')
    sendIcon.classList.remove('display--hide')    
  }
  else{
    cameraIcon.classList.remove('display--hide')
    micIcon.classList.remove('display--hide')
    sendIcon.classList.add('display--hide')
  }
})