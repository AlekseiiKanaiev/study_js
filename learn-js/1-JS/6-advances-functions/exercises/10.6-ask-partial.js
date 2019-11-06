function askPassword(ok, fail){
    let password = "rockstar";
    (password === 'rockstar') ? ok() : fail();
}

let user = {
    name: 'Alex',
    login(result) {
        console.log(this.name + (result ? ' logged in' : ' failed to log in'));
    },
};

askPassword(user.login.bind(user, true), user.login.bind(user, false))