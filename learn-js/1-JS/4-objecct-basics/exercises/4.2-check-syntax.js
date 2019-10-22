let user = {
    name: "Джон",
    go: function() { console.log(this.name) }
  }

// console.log('1'+(user.go)());
// (user.go)()// we got user is not defined

// user.go()//we got John
// let a = (user.go)()
// console.log(a);

let obj, method;

obj = {
  go: function() { console.log(this); }
};

// obj.go();               // (1) [object Object]

// (obj.go)();             // (2) [object Object]

// (method = obj.go)();    // (3) undefined

// (obj.go || obj.stop)(); // (4) undefined

function makeUser() {
  return {
    name: "Джон",
    ref: this
  };
};

let user1 = makeUser();
console.log( user1.ref.name );
user1.ref.name = 'alex';
console.log( user1.ref.name );
console.log( user1.name );