// when we enter a username this data will be displayed
function userInformationHTML(user) {
    return `
    <h2>${user.name}
    <span class="small-name>
    (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
    </span>
    </h2>
    <div class="gh-content">
    <div class="gh-avatar">
    <a href="${user.html_url}" target="_blank">
    <img src="${user.avatar_url}" width="80" height="80" target="_blank" alt="${user.login}" />
    </a>
    </div>
    <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

function fetchGitHubInformation(e){
    //If username box is empty display this msg
    let username = $('#gh-username').val();
    if (!username) {
        $('#gh-user-data').html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    //Loader gif for entering username
    $('#gh-user-data').html(`<div id="loader">              
    <img src="assets/css/loader.gif" alt="loading..." />
    </div>`);
    // fetching username and repos and setting error response
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) {
            let userData = firstResponse[0];
            let repoData = secondResponse[0];
            $('#gh-user-data').html(userInformationHTML(userData));
            $('#gh-repo-data').html(repoInformationHTML(repoData));
        }, function(errorResponse) {
            if (errorResponse === 404) {
                $('#gh-user-data').html(
                    `<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $('#gh-user-data').html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`)
            }
        }
    );
}