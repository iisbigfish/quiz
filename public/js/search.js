let go = document.querySelector('.go')
let clear = document.querySelector('.clear')
let upload = document.querySelector('.upload')

go.addEventListener('click', search)
clear.addEventListener('click', clears)
upload.addEventListener('click', uploads)

function search (e) {
    let keyword = document.querySelector('.search-word').value
    console.log(keyword)
    let content = document.querySelector('.search-content')
    content.innerHTML = ''
    if (!keyword.trim()) {
        alert('请输入问题关键字')
        return
    }
    fetch('/api/search', {
        body: JSON.stringify({
          keyword: keyword
        }),
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
      }).then(res => {
        let searchData = res.json().then(res => {
          console.log(res)
          if (res.data.length) {
              let searchData = res.data.map(it => {
                  return `
                    <div>
                        <table>
                            <tr>
                                <td>Question</td>
                                <td>${it.question}</td>
                            <//tr>
                            <tr>
                                <td>Answer List</td>
                                <td>${it.option.join('<br />')}</td>
                            <//tr>
                            <tr>
                                <td class="answer">Answer</td>
                                <td>${it.answer}</td>
                            <//tr>
                        </table>
                    </div>
                  `
              });
              document.querySelector('.search-content').innerHTML = searchData.join('')
          } else {
              alert(res.message)
          }
        })
      })
}

function clears (e) {
    let content = document.querySelector('.search-content')
    content.innerHTML = ''
}

function uploads (e) {
    let content = document.querySelector('#questions').value
    console.log(judge(content))
    if (!judge(content)) {
        alert('格式错误')
    } else {
        fetch('/api/insert', {
            body: JSON.stringify({
              questions: content
            }),
            method: 'POST',
            credentials: 'include',
            headers: {
              'content-type': 'application/json'
            },
          }).then(res => {
            res.json().then(res => {
                alert(res.message)
            })
          })
    }
}

function judge (txt) {
    console.log(txt.split('\n'), 'txt')
    return txt.split('\n').every(it => {
        let res = it.match(/\|\|/gi)
        return res && res.length % 2 == 0
    })
}