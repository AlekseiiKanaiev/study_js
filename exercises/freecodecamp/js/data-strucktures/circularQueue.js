class CircularQueue {
    constructor(size) {
 
        this.queue = [];
        this.read = 0;
        this.write = 0;
        this.max = size - 1;
        this.size = size;
    
        while (size > 0) {
            this.queue.push(null);
            size--;
        }
    }
 
    print() {
      return this.queue;
    }
 
    enqueue(item) {
     // Only change code below this line
        if (this.queue[this.write] === null) {
            this.queue.splice(this.write, 1, item);
            this.write = (this.write + 1) % this.size;
            return item;
        } else {
            return null;
        }
     // Only change code above this line
    }
 
    dequeue() {
     // Only change code below this line
        if(this.queue[this.read] !== null){
            let item = this.queue.splice(this.read, 1, null);
            this.read = (this.read + 1) % this.size;
            return item;
        } else {
            return null;
        }
        
     // Only change code above this line
    }
}

let q = new CircularQueue(5);

let a = ['a', 'b', 'c']
let b = ['d', 'e', 'f']
a.forEach(el => q.enqueue(el));
console.log(q.print());


console.log(q.dequeue());
console.log(q.print());
console.log(q.dequeue());
console.log(q.print());
console.log(q.dequeue());
console.log(q.print());

b.forEach(el => q.enqueue(el));
console.log(q.print());

// console.log(q.dequeue());
// console.log(q.print());
// console.log(q.enqueue('a'));
// console.log(q.print());
// console.log(q.dequeue());
// console.log(q.print());