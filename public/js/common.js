window.onload = function(){
    //do something
    console.log('//do something')
    let name = localStorage.getItem('username')
    if (name) {
        let user = document.querySelector('.username')
        user.children[0].innerHTML = name
        user.style.display = 'block'
        let login = this.document.querySelector('.login')
        login.style.display = 'none'
    }
    let loginout = document.querySelector('.loginout')
    loginout.addEventListener('click', function (e) {
        localStorage.clear()
    })
}