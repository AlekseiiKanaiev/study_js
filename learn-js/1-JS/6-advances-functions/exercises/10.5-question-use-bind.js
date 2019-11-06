function askPassword(ok, fail){
    let password = "rockstar";
    (password === 'rockstar') ? ok() : fail();
}

let user = {
    name: 'Alex',
    loginOk() {
        console.log(`${this.name} logged in`);
    },

    loginFail() {
        console.log(`${this.name} failed to log in`);
    },
};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user))