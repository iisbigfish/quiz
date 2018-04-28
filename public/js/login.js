
var button = document.querySelector('#submit')

button.addEventListener('click', submit)

function submit(e) {
  e.preventDefault()

  var email = document.querySelector('#username').value
  var password = document.querySelector('#password').value
  console.log(email, password)
  if (email.trim() && password.trim()) {
    login(email, password)
  }
}

function login (email, password) {
  fetch('/api/user/login', {
    body: JSON.stringify({
      username: email,
      password: password
    }),
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
  }).then(res => {
    console.log(res)
  })
}