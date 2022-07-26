import baseUrl from './serverUrl.js'

var socket = io(baseUrl);
let currentMessage;
let newP = document.createElement('p');
let newSpan = document.createElement('span');

const user1 = getUsernameFromURL(1)
const user2 = getUsernameFromURL(2)
const userCurrentStatus = getUserStatusFromURL()

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
/* GET USER STATUS */
function getUserStatusFromURL(){
  let url = new URL(window.location.href);
  return url.searchParams.get("status");
}

console.log (userCurrentStatus)

/* SET USER2 STATUS */
function setUser2Status (status){
  userImage.classList.add('status__' + status)
  userStatus.classList.add('status__' + status)
  userStatus.innerHTML = status

} 



//window.location.replace('conversation.html?username1='+user1+'&username2='+user2+'&status='+status) 

//status__offline


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
  const user = await getUserInfo(user2)

  this.setTimeout(() => { emitOpenChat(user1) }, 2000)
  
  setUser2Status(userCurrentStatus)
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


let day;
let month; 
let hour;
let minutes;
let time;


socket.on('message', data => {

  getTime(data)
  newMessage(data.text, time, 'from-them')
  newP.scrollIntoView()

  console.log(data.created_at)
  console.log(time)


})

function getTime(data){
  day = data.created_at[8]+data.created_at[9];
  month = data.created_at[5]+data.created_at[6];
  hour =  (parseInt(data.created_at[11] + data.created_at[12]) - 3);
  minutes =  data.created_at[14]+data.created_at[15];
  time = hour + ':' + minutes

  //PREVENT HOURS (0h, 1h, 2h, 3h)
  switch (hour) {
    case -3:
      hour = 21 
      break;
    case -2:
      hour = 22 
      break;
    case -1:
      hour = 23 
      break;
  }
 
  return time

}

function getCurrentTime(){
  let d = new Date();
  let hour = d.getHours();
  let minutes = d.getMinutes();
  let time = hour + ':' + minutes
  //add 0 before minutes


  return time
}




/* CREATE NEW MESSAGE */
function newMessage (message, time ,className){
  newP = document.createElement('p')
  messagesContainer.appendChild(newP)
  newP.classList.add(className)
  newP.textContent = message

  newSpan = document.createElement('span')
  newP.appendChild(newSpan)
  newSpan.classList.add('timeStamp__' + className)
  newSpan.textContent = time

}

/* GET CURRENT MESSAGE */
sendIcon.addEventListener('click', () =>{
  currentMessage = writeInput.value;
  writeInput.value = ''

  emitMessage(user1, user2, currentMessage)
  newMessage(currentMessage, getCurrentTime() ,'from-me')
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

        

        if (element.sender === user1) newMessage(element.text, getTime(element) ,'from-me')
        else if (element.sender === user2) newMessage(element.text, getTime(element) ,'from-them')
        
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