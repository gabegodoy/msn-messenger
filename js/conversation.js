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
  window.location.replace('users.html')
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
  emitMessage(user1, user2, 'Olá, '+user2)

  const user = await getUserInfo(user2)
  //if (!user.error){
    setHeader(user)
  //}
  //else {window.location.replace('index.html')}
}

function emitOpenChat(recipient){
  socket.emit('openChat', { recipient })
}

function emitMessage(sender, recipient, text){
  socket.emit('message', { sender, recipient, text })
}

socket.on('message', data => {
  console.log(data)
})