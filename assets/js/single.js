
var issueContainerEl = document.querySelector('#issues-container');



function getRepoIssues(repo){ // repo parameter = 'owner/repo-name'
    fetch('https://api.github.com/repos/' + repo + '/issues?direction=asc')
        .then(response => {
            if (response.ok)
                response.json().then(data => displayIssues(data));
            else
                alert('There was a problem with your request');
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


getRepoIssues('microsoft/.net-modernization-in-a-day');