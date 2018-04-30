let button = document.querySelector('#submit')

button.addEventListener('click', submit)

function submit(e) {
    e.preventDefault()
  
    let nickname = document.querySelector('#nickname').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value
    if (email.trim() && password.trim()) {
      registrer(nickname, email, password)
    }
  }

  function registrer (nickname, email, password) {
    console.log(nickname, email, password)
    fetch('/api/user/register', {
      body: JSON.stringify({
        nickname: nickname,
        email: email,
        password: password
      }),
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    }).then(res => {
      res.json().then(res => {
        if (res.code === 4) {
          alert(res.message)
          window.location.replace('/login')
        } else {
          alert(res.message)
        }
      })
    })
  }