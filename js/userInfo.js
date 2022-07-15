var userInfo

function getUserInfo(){ return userInfo }

function validateUser (username, password){
    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      //cache: 'defaut'
    }
  
    fetch('http://localhost:3333/users/authenticate', options)
    
      .then((reponse) => reponse.json())
      .then(data => {
        if (data.error){
          console.log(data.error) 
          
          //Print validation error on Login Screen
          loginContainer.insertBefore(newP, formContainer)
          newP.innerText = data.error
          newP.classList.add('alert__message')
          newP.style.textAlign = 'center'
  
        }
        else{
        //   userInfo = data;
          userInfo = data;
          console.log(userInfo, data)
          window.location.replace('users.html')
  
          // ?username=${data.username}
          //userName.innerHTML(data.firstName + ' ' + data.lastName)    
        }
  
      }) 
  
      .catch(e => console.log('Error' + e)) 
  }

export {validateUser, getUserInfo}