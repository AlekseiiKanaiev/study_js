class mySet {
    constructor() {
    // collection will hold our set
    this.collection = [];
    }
    // this method will check for the presence of an element and return true or false
    has(element) {
        return this.collection.indexOf(element) !== -1;
    }
    // this method will return all the values in the set
    values() {
        return this.collection;
    }
    // change code below this line
    // write your add method here
    add(value) {
        if (!this.has(value)) {
            this.collection.push(value);
            return true;
        }
        return false;
    }
    // write your remove method here
    remove(value){
        let index = this.collection.indexOf(value);
        if (index !== -1){
            this.collection.splice(index, 1);
            return true;
        } 
        return false;
    }
    // write your size method here
    size() {
        return this.collection.length;
    }
    // change code above this line

    union(set) {
        for (let el of set.values()){
            if (!this.has(el)) {
                this.add(el)
            }
        }
    }
}

let s1 = new mySet();

s1.add(1);
s1.add(2);
s1.add(3);
s1.add(2);

let arr = s1.values();
// for (let el of arr){
//     console.log(el);
// }
// console.log(s1.values());

let s2 = new mySet();

s2.add(1);
s2.add(2);
s2.add(5);
s2.add(4);

// let arr2 = s2.values();

// for (let el of s2.values()){
//     console.log(el);
// }

s1.union(s2);

console.log(s1.values());

function mySet2() {
    // the var collection will hold the set
    var collection = [];
    // this method will check for the presence of an element and return true or false
    this.has = function(element) {
        return (collection.indexOf(element) !== -1);
    };
    // this method will return all the values in the set
    this.values = function() {
        return collection;
    };
    // this method will add an element to the set
    this.add = function(element) {
        if(!this.has(element)){
            collection.push(element);
            return true;
        }
        return false;
    };
   // this method will remove an element from a set
    this.remove = function(element) {
        if(this.has(element)){
           var index = collection.indexOf(element);
            collection.splice(index,1);
            return true;
        }
        return false;
    };
    // this method will return the size of the set
    this.size = function() {
        return collection.length;
    };
    // this method will return the union of two sets
    this.union = function(set){
        for (let el of set.values()){
            if (!this.has(el)) {
                this.add(el)
            }
        }
        return this;
    }

    // this method will return the intersection of two sets
    this.intersection = function(set){
        let res = new mySet2();
        for (let el of set.values()){
            if (this.has(el)) {
                res.add(el)
            }
        }
        return res;
    }
    // this method will return the difference of two sets
    this.difference = function(set){
        let res = new mySet2();
        for (let el of this.values()){
                if (!set.has(el)) res.add(el);
        }
        // for (let el of set.values()){
        //     if (!this.has(el)) res.add(el);
        // }
        return res;
        // for (let el of set.values()){
        //     (this.has(el)) ? this.remove(el) : this.add(el);
        // }
        // return this;
    }
    this.subset = function(set){
        return this.values().every(el => set.has(el));
    }
}

let s3 = new mySet2();

s3.add(1);
s3.add(2);
s3.add(3);

let s4 = new mySet2();

s4.add(1);
s4.add(2);
s4.add(4);

// s3.union(s4);
let s5 = s3.difference(s4);
console.log(s5.values());
console.log(s5.subset(s3));

