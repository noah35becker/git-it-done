
function getUserRepos(user){
    fetch('https://api.github.com/users/' + user + '/repos')
        .then(response => response.json())      
        .then(data => console.log(data));
}



// getUserRepos('noah35becker');