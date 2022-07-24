var socket = io("https://msn-messenger-server.herokuapp.com");

const userName = document.querySelector('#userName');
const userNote = document.querySelector('#userMessage')
const userStatus = document.querySelector('#userStatus')
const userImage = document.querySelector('#userImage')

const offlineUsersList = document.querySelector('#offlineUsersList');
const onlineUsersList = document.querySelector('#onlineUsersList');

let onlineUsers;
let offlineUsers;


let newDiv = document.createElement('div');
let newP = document.createElement('p');
let newImg = document.createElement('img');

let firstName;
let lastName;
let currentUserNote = '';
let currentUserStatus = 'online';

changeStatusColour(userStatus)   

function getUserInfo (username){
  return fetch('https://msn-messenger-server.herokuapp.com/users/'+username)
    .then((reponse) => reponse.json())
    .then(data => data) 
    .catch(e => console.log('Error' + e)) 
}

onload = async function(){
    const users = await getUsers()
    offlineUsers = users;

    let username = getUsernameFromURL()
    let status = currentUserStatus

    const user = await getUserInfo(username)
    

    //SEND user.status and user.message
    if (!user.error){
      emitLogin(user.username, user.firstName, user.lastName, status, user.note)
      setHeader(user)
      printUsers(users, offlineUsersList)
      console.log(user)
    }
    else {window.location.replace('index.html')}
}



/* PRINT USERS ON SCREEN*/
function createContact (name, surname, status, message, nodeParent, id, username){
  let image = 'assets/images/default-user-profile.png'; //Default Image

  setDiv(nodeParent, 'contact__info__container', id + 'User')
  newDiv.classList.add(username)
  setImage(newDiv, image, status)
  setDiv(newDiv, 'contact__info', id + 'UserInfo')
  setName(newDiv, name, surname)
  setStatus(newDiv, status)
  setMessage(newDiv, message)
}

function setDiv (parent, className, id){
  newDiv = document.createElement('div')
  parent.appendChild(newDiv)
  newDiv.classList.add(className)
  newDiv.id = id
} 

function setImage (parent, imageSrc, id){
  newImg = document.createElement('img')
  parent.appendChild(newImg)
  newImg.classList.add('contact__image')
  newImg.src = imageSrc
  newImg.classList.add('status__'+id)
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

const onlineUsersListTag = document.querySelector('#onlineUsersListTag');
const offlineUsersListTag = document.querySelector('#offlineUsersListTag');

function clearScreen (place, firstChild){
   while (firstChild.nextSibling) {
    place.removeChild(firstChild.nextSibling)
  }  
}


/* GET USER MESSAGE */
userNote.addEventListener('keypress', (element) =>{
  if (element.key == 'Enter'){
    currentUserNote = userNote.value;
    userNote.value = ''
    emitNote(getUsernameFromURL(), currentUserNote)
  }
})


/* UPDATE USER STATUS */   
userStatus.addEventListener('change', () => {
  currentUserStatus = userStatus.options[userStatus.selectedIndex].value
  changeStatusColour(userStatus)   
  changeStatusColour(userImage)   
  //RE-LOAD THE DATA-BASE
  
  emitStatus(getUsernameFromURL(), currentUserStatus)
})

function changeStatusColour (place){
  place.classList.toggle('status__online', currentUserStatus == 'online')
  place.classList.toggle('status__busy', currentUserStatus == 'busy')
  place.classList.toggle('status__absent', currentUserStatus == 'absent')
}

function getUsers(){
    return fetch('https://msn-messenger-server.herokuapp.com/users')
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
  console.log(user)
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
  
  //let currentOnlineUsers = data.slice(1)
  //console.log(data)
  //console.log(currentOnlineUsers)
  let onlineUsernames = []
  let currentOfflineUsers;
  
  clearScreen(onlineUsersList, onlineUsersListTag)
  printUsers(data, onlineUsersList)
  clearScreen(offlineUsersList, offlineUsersListTag)

  redirectToConversation()

  data.forEach(element => {
    onlineUsernames.push(element.username)
  });

  currentOfflineUsers = offlineUsers.filter(function (objeto) { 
    return onlineUsernames.indexOf(objeto.username) === -1 
  });
 
  currentOfflineUsers.forEach(element => {
    createContact(element.firstName, element.lastName, element.status, element.note, offlineUsersList, 'offline', element.username);  
  })
    
//  console.log(getUsernameFromURL())
//  console.log(onlineUsernames)
//  console.log(offlineUsers)
//  console.log(currentOfflineUsers)

})

socket.on('logoff', data => {
  console.log(data)
})



function emitStatus(username, status){
  socket.emit('statusChange', { username, status })
}
  
socket.on('statusChange', data => {
  console.log(data)

  let onlineUsers = redirectToConversation()

  onlineUsers.forEach(element => {
    if(data.username === element.classList[1]){
      //changeStatusColour(element.firstChild)

      element.firstChild.classList.toggle('status__online', data.status == 'online')
      element.firstChild.classList.toggle('status__busy', data.status == 'busy')
      element.firstChild.classList.toggle('status__absent', data.status == 'absent')
      element.firstChild.classList.add('status__'+data.status)





      //element.lastChild.lastChild.innerHTML = data.status

      //.lastChild.innerHTML = data.note
    }    
  });
  
  

})



function emitNote(username, note){
  socket.emit('noteChange', { username, note })
}
  
socket.on('noteChange', data => {
  console.log(data.username, data.note)

  let onlineUsers = redirectToConversation()

  onlineUsers.forEach(element => {
    if(data.username === element.classList[1]){
      element.lastChild.lastChild.innerHTML = data.note
    }    
  });
  
})








function printUsers(users, place){
  users.forEach((element) => {
    //send element.status and element.message
    createContact(element.firstName, element.lastName, element.status, element.note, place, 'online',element.username);  
    console.log(element)
  })
}



function redirectToConversation (){

  const contactUser = document.querySelectorAll('#onlineUser')

  let user1;
  let user2;
  
  contactUser.forEach((element) => {
    element.addEventListener('click', () => {
      
      user1 = getUsernameFromURL();
      user2 = element.classList[1];

      window.location.replace('conversation.html?username1='+user1+'&username2='+user2)  
    })
  })

  return contactUser
  
}

let contactUser = redirectToConversation()
console.log(contactUser)


/* ARROW SHOW/HIDE CATEGORY */
let categoryArrow = document.querySelectorAll('#categoryArrow');
categoryArrow.forEach((element) => {

  element.addEventListener('click', () => {
    let quantityOfItems = element.parentElement.parentElement.parentElement.childNodes.length -1; 
    
    element.classList.toggle('contacts__category__arrow--active')
    
    for (let i=2; i <= quantityOfItems; i++){
      
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