//import { redirectToConversation } from "./users.js";
import baseUrl from './serverUrl.js'
var socket = io(baseUrl);
let user1 = getUsernameFromURL(1)
let user2 = getUsernameFromURL(2)

const userName = document.querySelector('#userName');
const userNote = document.querySelector('#userMessage')
const userStatus = document.querySelector('#userStatus')
const userImage = document.querySelector('#userImage')
const headerArrow = document.querySelector('#headerArrow');


/* GET BACK ARROW | HEADER */
headerArrow.addEventListener('click', () => {
  window.location.replace('users.html?username='+user1)
})


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

function setHeader(user){
  userName.innerHTML = user.firstName + ' ' + user.lastName
  // changeStatusColour(userStatus)   
  // changeStatusColour(userImage)
  userNote.innerHTML = user.note
}

// function changeStatusColour (place){
//   place.classList.toggle('status__online', currentUserStatus == 'online')
//   place.classList.toggle('status__busy', currentUserStatus == 'busy')
//   place.classList.toggle('status__absent', currentUserStatus == 'absent')
// }


onload = async function(){
  let status = 'status'
  let note = 'note'
  // emitOpenChat(user2)
  this.setTimeout(() => { emitOpenChat(user1) }, 2000)


  const user = await getUserInfo(user2)
  //if (!user.error){
    setHeader(user)
  //}
  //else {window.location.replace('index.html')}
}

 
/* function emitOpenChat(recipient){
  socket.emit('openChat', { recipient })
}  */

function emitOpenChat(username){
  // buscar todas as mensagens na api
  const socketId = socket.id
  socket.emit('openChat', { username, socketId })
}

function emitMessage(sender, recipient, text){
  socket.emit('message', { sender, recipient, text })
}


const messagesContainer = document.querySelector('#messagesContainer');
let newP = document.createElement('p');


function newMessage (message, className){
  newP = document.createElement('p')
  messagesContainer.appendChild(newP)
  newP.classList.add(className)
  newP.textContent = message
}



socket.on('message', data => {
  newMessage(data.text, 'from-them')
})


/* CHANGE ICONS ON INPUT CONTAINER */
const writeInput = document.querySelector('#writeInput');
const cameraIcon = document.querySelector('#cameraIcon');
const micIcon = document.querySelector('#micIcon');
const sendIcon = document.querySelector('#sendIcon');


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

let currentMessage;

/* GET USER MESSAGE */
sendIcon.addEventListener('click', () =>{
  currentMessage = writeInput.value;
  writeInput.value = ''

  emitMessage(user1, user2, currentMessage)
  newMessage(currentMessage, 'from-me')

  cameraIcon.classList.remove('display--hide')
  micIcon.classList.remove('display--hide')
  sendIcon.classList.add('display--hide')

})