const searchUser = document.getElementById('search-user')
searchUser.addEventListener('keyup', getUserProfile)

function getUserProfile() {
    let username = searchUser.value
    let httpRequest1 = new XMLHttpRequest()
    let httpRequest2 = new XMLHttpRequest()
    httpRequest1.open('GET', 'https://api.github.com/users/'+username)
    httpRequest1.send()
    httpRequest1.onreadystatechange = function() {
        if (httpRequest1.readyState === XMLHttpRequest.DONE && httpRequest1.status === 200) {
            let userProfile = JSON.parse(httpRequest1.responseText)
            let profile = '<div class="user container">' +
            '<img style="border-radius:50%;" width="90px" height="90px" src="'+userProfile.avatar_url+'">' +
            '<ul>' + 
            '<li>Name:  '+userProfile.name+'</li>' +
            '<li>Login ID:  '+userProfile.login+'</li>' +
            '<li>ID:  '+userProfile.id+'</li>'+
            '<ul></div>'
            document.getElementById('profile').innerHTML = profile
        }
    }
    httpRequest2.open('GET', 'https://api.github.com/users/'+username+'/repos')
    httpRequest2.send()
    httpRequest2.onreadystatechange = function() {
        if (httpRequest2.readyState === XMLHttpRequest.DONE && httpRequest2.status === 200) {
            let userRepos = JSON.parse(httpRequest2.responseText)
            let output = ""
            for (var i in userRepos) {
                output += "<div class='repos container'>" + 
                "<ul>"+
                "<li><a href='"+userRepos[i].html_url+"'><h2>"+userRepos[i].name+"</h2></a></li>"+
                "<li><a href='"+userRepos[i].clone_url+"'><button class='btn btn-success'>Clone or Download</button></a></li>"+
                '</ul></div>'
            }
            document.getElementById('repos').innerHTML = output
        }
    }
}