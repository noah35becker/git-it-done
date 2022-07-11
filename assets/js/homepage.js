
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');


function getUserRepos(user){
    fetch('https://api.github.com/users/' + user + '/repos')
        .then(response => {
            if (response.ok)
                response.json().then(data => displayRepos(data, user));
            else
                alert('Error: Github user not found');
        })
        .catch(error => alert('Unable to connect to Github'));
}


function displayRepos(repos, searchTerm){
    if (!repos.length){
        repoContainerEl.textContent = 'No repositories found';
        return;
    }
    
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = '';

    repos.forEach(repo => {
        var repoName = repo.owner.login + '/' + repo.name;

        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';
        if (repo.open_issues_count > 0)
            statusEl.innerHTML = '<i class="fas fa-times status-icon icon-danger"></i>' + repo.open_issues_count + ' issue(s)';
        else
            statusEl.innerHTML = '<i class="fas fa-check-square status-icon icon-success"></i>';

        var repoEl = document.createElement('a');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';
        repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
        repoEl.appendChild(titleEl);
        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    });
}


userFormEl.addEventListener('submit', function(event){
    event.preventDefault();
    
    var username = nameInputEl.value.trim();

    if (username){
        getUserRepos(username);
        nameInputEl.value = '';
    }else
        alert('Please enter a Github username');

});



