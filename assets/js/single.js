
var issueContainerEl = document.querySelector('#issues-container');
var limitWarningEl = document.querySelector('#limit-warning');
var repoNameEl = document.querySelector('#repo-name');

function getRepoIssues(repo){ // repo parameter = 'owner/repo-name'
    fetch('https://api.github.com/repos/' + repo + '/issues?direction=asc')
        .then(response => {
            if (response.ok)
                response.json().then(data =>{
                    displayIssues(data);
                    
                    if(response.headers.get('link'))
                        displayWarning(repo);
                });
            else
                document.location.replace('./index.html');
        })
}


function displayIssues(issues){
    if (!issues.length){
        issueContainerEl.textContent = 'This repo has no open issues';
        return;
    }
    
    issues.forEach(issue => {
        var titleEl = document.createElement('span');
        titleEl.textContent = issue.title;

        var typeEl = document.createElement('span');
        if (issue.pull_request)
            typeEl.textContent = '(Pull request)';
        else
            typeEl.textContent = '(Issue)';
        
        var issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute('href', issue.html_url);
        issueEl.setAttribute('target', '_blank');
        
        issueEl.appendChild(titleEl);
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    });
}


function displayWarning(repo){
    var linkEl = document.createElement('a');
    linkEl.textContent = 'Github';
    linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues');
    linkEl.setAttribute('target', '_blank');
    
    limitWarningEl.textContent = 'To see more than 30 issues, visit ';
    limitWarningEl.appendChild(linkEl);
}


function getRepoName(){
    var repoName = document.location.search.split('=')[1];
    if (repoName){
        repoNameEl.textContent = repoName;
        return repoName;
    }else
        document.location.replace('./index.html');
}

getRepoIssues(getRepoName());