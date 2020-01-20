function alert(str){
    console.log(str);
}

let user = {
    name: 'John',
    sayName() {
        console.log(`my name is ${this.name}`);
    }
};

function wrap(target) {
    return new Proxy(target, {
        get(target, prop, reciever){
            if (prop in target) {
                let value = Reflect.get(...arguments);
                return (typeof value === 'function') ? value.bind(target) : value;
            }
            throw new Error('No such property')
        }
    })
}

alert(user.age);

user = wrap(user);

alert(user.name);

user.sayName()

user.sayAge();

alert(user.age)
