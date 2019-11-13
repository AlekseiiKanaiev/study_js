function Stack() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };
    // Only change code below this line
    this.push = function(item){
        collection.push(item);
    }
    this.pop = function(){
        return collection.pop();
    }
    this.peek = function(){
        return collection.slice(-1).toString();
    }
    this.isEmpty = function(){
        return (collection.length) ? false : true;
    }
    this.clear = function(){
        collection.length = 0;
    }
    // Only change code above this line
}

let s = new Stack();
s.print();
s.push(1);
console.log(s.isEmpty());
console.log(s.pop());
console.log(s.isEmpty());
s.push(2)
console.log(s.pick());
s.clear()
s.print()