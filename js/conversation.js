//import { redirectToConversation } from "./users.js";

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

let user1 = getUsernameFromURL(1)
let user2 = getUsernameFromURL(2)
console.log(user1)
console.log(user2)

function getUserInfo (username){
  return fetch('https://msn-messenger-server.herokuapp.com/users/'+username)
    .then((reponse) => reponse.json())
    .then(data => data) 
    .catch(e => console.log('Error' + e)) 
}

function setHeader(user){
  userName.innerHTML = user.firstName + ' ' + user.lastName
  changeStatusColour(userStatus)   
  changeStatusColour(userImage)
}

function changeStatusColour (place){
  place.classList.toggle('status__online', currentUserStatus == 'online')
  place.classList.toggle('status__busy', currentUserStatus == 'busy')
  place.classList.toggle('status__absent', currentUserStatus == 'absent')
}


onload = async function(){
  let username = getUsernameFromURL(2)
  let status = 'status'
  let note = 'note'

  const user = await getUserInfo(username)
  
  //if (!user.error){
    setHeader(user)
  //}
  //else {window.location.replace('index.html')}
}