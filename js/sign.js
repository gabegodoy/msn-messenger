/* CREATE NEW ACCOUNT */

const signFirstName = document.querySelector('#signFirstName');
const signLastName = document.querySelector('#signLastName');
const signMail = document.querySelector('#signMail');
const signUsername = document.querySelector('#signUsername');
const signPassword = document.querySelector('#signPassword');
const signPasswordConfirm = document.querySelector('#signPasswordConfirm');  
const termsCheckbox = document.querySelector('#termsCheckbox');
const termsContainer = document.querySelector('.terms__container');
const signButton = document.querySelector('#signButton')
const signInputs = document.querySelectorAll('.sign__input');
const signInputsContainer = document.querySelector('.form__container')

let newP = document.createElement('p');

signButton.addEventListener('click', () => {
  signInputs.forEach((element) => {
    if (element.value === ""){
      signInputsContainer.insertBefore(newP, element.nextSibling)
      newP.innerText = "Can't be blank"
      newP.classList.add('alert__message')
      newP.style.textAlign = 'left'
    }
  })

  if (signPassword.value !== signPasswordConfirm.value){
    signInputsContainer.insertBefore(newP, signPasswordConfirm.nextSibling)
    newP.innerText = "The passwords don't match"
    newP.classList.add('alert__message')
    newP.style.textAlign = 'left'
  }

  else if (termsCheckbox.checked == false){
    signInputsContainer.insertBefore(newP, termsContainer.nextSibling)
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

  fetch('http://localhost:3333/users', options)
  
    .then((reponse) => reponse.json())
    .then(data => {
      if (data.error){
        signInputsContainer.insertBefore(newP, termsContainer.nextSibling);
        newP.innerText = data.error;
        newP.classList.add('alert__message');
        newP.style.textAlign = 'center';
      }
      else
        window.location.replace('index.html')
    }) 

    .catch(e => console.log('Error' + e)) 
}