function whatIsInAName(collection, source) {
    // What's in a name?
    var res = collection.slice();
    // Only change code below this line
    for (let key in source){
        res = res.filter(el => (el.hasOwnProperty(key) && el[key] === source[key]));
    }
    // Only change code above this line
    return res;
  }
  
let a = whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }, { first: "Tybalt", last: "Capulet" }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

console.log(a);