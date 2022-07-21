const signFirstName = document.querySelector('#signFirstName');
const signLastName = document.querySelector('#signLastName');
const signMail = document.querySelector('#signMail');
const signUsername = document.querySelector('#signUsername');
const signPassword = document.querySelector('#signPassword');
const signPasswordConfirm = document.querySelector('#signPasswordConfirm');  
const termsCheckbox = document.querySelector('#termsCheckbox');
const termsContainer = document.querySelector('#termsContainer');
const signButton = document.querySelector('#signButton')
const signInputs = document.querySelectorAll('.sign__input');
const formContainer = document.querySelector('#formContainer');

let newP = document.createElement('p');



signButton.addEventListener('click', () => {
  signInputs.forEach((element) => {
    if (element.value === ""){
      formContainer.insertBefore(newP, element.nextSibling)
      newP.innerText = "Can't be blank"
      newP.classList.add('alert__message')
      newP.style.textAlign = 'left'
    }
  })
  
  if (signPassword.value !== signPasswordConfirm.value){
    formContainer.insertBefore(newP, signPasswordConfirm.nextSibling)
    newP.innerText = "The passwords don't match"
    newP.classList.add('alert__message')
    newP.style.textAlign = 'left'
  }
  
  else if (termsCheckbox.checked == false){
    formContainer.insertBefore(newP, termsContainer.nextSibling)
    newP.innerText = "You must read and agree"
    newP.classList.add('alert__message')
    newP.style.textAlign = 'center'
  }

  else {
    newUser(signUsername.value, signFirstName.value, signLastName.value, signPassword.value, signMail.value)
  }
  
})

function newUser (username, firstName, lastName, password, email){
  const options = {
    method: 'POST',
    body: JSON.stringify({ username, firstName, lastName, password, email }),
    headers: {"Content-type": "application/json; charset=UTF-8"}
    //cache: 'defaut'
  }
  
  fetch('https://msn-messenger-server.herokuapp.com/users', options)
  
  .then((reponse) => reponse.json())
  .then(data => {
    if (data.error){
        formContainer.insertBefore(newP, termsContainer.nextSibling);
        newP.innerText = data.error;
        newP.classList.add('alert__message');
        newP.style.textAlign = 'center';
      }
      else
      window.location.replace('index.html')
    }) 
    
    .catch(e => console.log('Error' + e)) 
}




/* TERMS AND CONDITIONS */
const termsLink = document.querySelector('#termsLink');
const signContainer = document.querySelector('#signContainer');
const termsBackground = document.querySelector('#termsBackground');

termsLink.addEventListener('click', () => {
  signContainer.style.display = 'none'
  termsBackground.style.display = 'flex'
})

function hideTerms (){
  signContainer.style.display = 'flex'
  termsBackground.style.display = 'none'
}