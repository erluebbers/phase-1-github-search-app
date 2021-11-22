document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#github-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data.items)
                data.items.forEach((obj) => displayData(obj))
            })
        form.reset()
    })

    function displayData (obj) {
        let userInfo = document.createElement('li')
        userInfo.innerHTML = `
            <h1> User: ${obj.login} </h1>
                <ul>
                    <li> <img src=${obj.avatar_url}> </li>
                    <li> <a href=${obj.html_url}>Link to Profile</a>
                </ul>
                
                <ul id="repo_list" >

                </ul>
            
        `
        document.querySelector('#user-list').appendChild(userInfo)
        userInfo.addEventListener('click', () => {
            fetchRepos(obj.login)
        })
    }

    function fetchRepos(user) {
        fetch(`https://api.github.com/users/${user}/repos`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                postRepos(data)
            })
    }

    function postRepos(array) {
        array.forEach((obj) => {
            // console.log(obj)
            let li = document.createElement('li')
            li.innerText = obj.name
            document.querySelector('#repo_list').appendChild(li)
        })
    }


})

