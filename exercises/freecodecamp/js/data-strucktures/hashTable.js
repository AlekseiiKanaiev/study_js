var called = 0;
var hash = string => {
  called++;
  var hashed = 0;
  for (var i = 0; i < string.length; i++) {
    hashed += string.charCodeAt(i);
  }
  return hashed;
};

var HashTable = function() {
    this.collection = {};
    // change code below this line
    this.add = (key, val) => {
        let hKey = hash(key);
        if (this.collection[hKey]){
            if(Array.isArray(this.collection[hKey])){
                this.collection[hKey].push([key, val])
            } else {
                this.collection[hKey] = [this.collection[hKey]];
                this.collection[hKey].push([key, val])
            }
        } else {
            this.collection[hKey] = [[key, val]];
        }
    }
    this.remove = key => {
      let hKey = hash(key);
      if (this.collection[hKey].length > 1) {
        this.collection[hKey] = this.collection[hKey].filter(el => el[0] !== key);
      } else {
        delete(this.collection[hKey]);
      }
    }
    // this.remove = key => (this.collection[hash(key)].length > 1) ? this.collection[hash(key)] = this.collection[hash(key)].filter(el => el[0] !== key) : delete(this.collection[hash(key)]);
    // this.remove = key => delete(this.collection[hash(key)]);
    this.lookup = key => this.collection[hash(key)].filter(el => el[0] === key)[0][1] || null;
  // change code above this line
};

let h = new HashTable();

h.add('a', 10);
console.log(h.collection);
console.log(h.lookup('a'));
h.add('ab', 2);
console.log(h.collection);
h.add('ba', 3);
console.log(h.collection);
console.log(h.lookup('ab'));
h.remove('ab')
console.log(h.collection);
h.remove('a');
console.log(h.collection);
