import baseUrl from './serverUrl.js'
const loginContainer = document.querySelector('#loginContainer')
let newP = document.createElement('p');

export function validateUser (username, password){
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      //cache: 'defaut'
    }
  
    fetch(baseUrl+'/users/authenticate', options)
    
      .then((reponse) => reponse.json())
      .then(data => {
        if (data.error){
          console.log(data.error) 
          
          loginContainer.insertBefore(newP, formContainer)
          newP.innerText = data.error
          newP.classList.add('alert__message')
          newP.style.textAlign = 'center'
  
        }
        else{
          window.location.replace('users.html?username='+data.username)  
        }
  
      }) 
  
      .catch(e => console.log('Error' + e)) 
}