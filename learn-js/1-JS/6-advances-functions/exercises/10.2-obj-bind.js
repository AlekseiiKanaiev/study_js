function f(){
    console.log(this);
}

// f(); //global object

let user = {
    g: f.bind(null)
}

user.g(); //global object