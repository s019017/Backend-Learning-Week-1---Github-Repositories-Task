// Task 1: GitHub repositories page
// Steps:
// 1. Write getRepos(username) using fetch and async/await. Check response.ok.
// 2. Write showRepos(repos): one link per repository. Use textContent, not innerHTML.
// 3. Write init(): call getRepos inside try/catch and show a message if it fails.
// 4. Add a JSDoc comment above every function.
// 5. Call init() at the bottom of the file.

const USE_LOCAL_FILES = false;

/**
 * 
 * @param {string} username Username of the github account being targeted
 * @returns JSON file of the target accounts repositories
 */

async function getRepos(username){

    
    const address = USE_LOCAL_FILES
        ? 'repos.json'
        : `https://api.github.com/users/${username}/repos`;

    const response = await fetch(address)
    

    if(!response.ok){
        throw new Error(
            'Github Returned ' + response.status
        );
    }
    //console.log(response.json());
    return response.json()
};

let x = 's019017';

function showRepos(repos){
    const list = document.querySelector('#repos');
    list.innerHTML = '';

    if (repos.length === 0){
        list.textContent = "No Public repos foumd";
        return;
    }

    for (const repo of repos){
        const  item = document.createElement('li');
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.textContent = repo.name;
        item.append(link);
        list.append(item);
    }
}

async function init(){
    try{
        showRepos(await getRepos(x))
    } catch(error){
        console.error(error)
        document.querySelector('#repos').textContent = "There was an error!"
    }
};


init();
