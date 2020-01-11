class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

async function loadJson(url) {
    try {
        const response = await fetch(url);
        if (response.status === 200){
            return response.json();
        } else {
            throw new HttpError(response)
        }
    } catch(err) {
        throw (err instanceof HttpError) ?
            new HttpError(err.response) : 
            new Error(err.response); 
    }
    

}

// Запрашивать логин, пока github не вернёт существующего пользователя.
async function demoGHUser() {
    let error = true;
    do {
        const name = prompt('Enter login', 'iliakan');
        try {
            let user = await loadJson(`https://api.github.com/users/${name}`);
            alert(`User fullname: ${user.name}`);
            error = false;
            return user;
        } catch(err) {
            if (err instanceof HttpError && err.response.status === 404) {
                alert('No such user, please try another name');
            } else {
                alert('Network error')
                error = false;
                throw err;
            }
        }
    } while(error);
}

demoGHUser();