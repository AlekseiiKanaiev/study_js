function PriorityQueue() {
    var collection = [];
    this.print = function() {
      console.log(collection);
    };
    // Only change code below this line
    this.enqueue = function(item){
        let isAdded = false;
        if (collection.length) {
            for (let i = 0; i < collection.length; i++){
                if (collection[i][1] > item[1]){
                    collection.splice(i, 0, item);
                    isAdded = true
                    break;
                }
            }
            if (!isAdded) collection.push(item);
        } else {
            collection.push(item);
        }
    }
    this.dequeue = function(){
        return collection.shift()[0];
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

let q = new PriorityQueue();

q.enqueue(['Harry', 2]);
q.print();
q.enqueue(['Adam', 1]);
q.print();
q.enqueue(['Don', 2]);
q.print();
console.log(q.dequeue());