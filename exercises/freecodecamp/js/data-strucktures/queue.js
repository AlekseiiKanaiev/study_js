function Queue() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };
    // Only change code below this line
    this.enqueue = function(item){
        collection.push(item);
    }
    this.dequeue = function(){
        return collection.shift();
    }
    this.front = function(){
        return collection[0];
    }
    this.isEmpty = function(){
        return (collection.length) ? false : true;
    }
    this.size = function(){
        return collection.length;
    }
    // Only change code above this line
}

let q = new Queue();