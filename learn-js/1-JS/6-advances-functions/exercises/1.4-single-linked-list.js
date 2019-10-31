let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
};

function printList(list){
    let obj = list;
    while(obj){
        console.log(obj.value);
        obj = obj.next;
    }
}

function printListRec(list){
    if (list){
        console.log(list.value);
        printListRec(list.next)
    }
}

// printList(list);
// printListRec(list)

function printReverseList(list){
    let arr = []
    let obj = list;
    while(obj){
        arr.push(obj.value)
        obj = obj.next;
    }
    for (let el of arr.reverse()) console.log(el);
}

function printReverseListRec(list){
    if (list.next){
        printReverseListRec(list.next)
    }
    console.log(list.value);
}

printReverseList(list);
printReverseListRec(list);