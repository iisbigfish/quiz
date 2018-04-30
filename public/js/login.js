
var button = document.querySelector('#submit')

button.addEventListener('click', submit)

function submit(e) {
  e.preventDefault()

  var username = document.querySelector('#username').value
  var password = document.querySelector('#password').value
  console.log(username, password)
  if (username.trim() && password.trim()) {
    login(username, password)
  }
}

function login (username, password) {
  fetch('/api/user/login', {
    body: JSON.stringify({
      username: username,
      password: password
    }),
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
  }).then(res => {
    res.json().then(res => {
      console.log(res)
      if (res.code === 4) {
        alert(res.message)
        localStorage.setItem('username', res.userInfo.username)
        console.log('1111')
        window.location.replace('/search')
      } else {
        alert(res.message)        
      }
    })
  })
}