const myMap = function() {
    this.collection = {};
    // change code below this line
    this.add = function(key, val){
      this.collection[key] = val;
    }
    this.remove = function(key){
      delete(this.collection[key]);
    }
    this.get = function(key){
      return this.collection[key];
    }
    this.has = function(key){
      return this.collection.hasOwnProperty(key);
    }
    this.values = function(){
      return Object.values(this.collection);
    }
    this.size = function(){
      return Object.values(this.collection).length;
    }
    this.clear = function(){
      Object.keys(this.collection).forEach(el => delete(this.collection[el]))
    }
    // change code above this line
};
  
let m = new myMap();

m.add('a', 1);
m.add('b', 2);

console.log(m.values());
console.log(m.size());
m.clear();
console.log(m.values());
