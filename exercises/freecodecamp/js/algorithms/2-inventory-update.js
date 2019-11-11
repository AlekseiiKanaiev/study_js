function updateInventory(arr1, arr2) {
    // All inventory must be accounted for or you're fired!
    if(!arr1.length) return arr2.sort((a, b) => a[1] > b[1]);
    if(!arr2.length) return arr1.sort((a, b) => a[1] > b[1]);
    for(let i = 0; i < arr2.length; i++){
        // if (arr1.every(el => !el.includes(arr2[i][1]))) arr1.push([arr2[i][0], arr2[i][1]])
        // else arr1.forEach(el => {
        //     if(el.includes(arr2[i][1])) arr1[arr1.indexOf(el)][0] += arr2[i][0];
        // });
        (arr1.every(el => !el.includes(arr2[i][1]))) ? 
            arr1.push([arr2[i][0], arr2[i][1]]) :
            arr1.forEach(el => {
                    if(el.includes(arr2[i][1])) arr1[arr1.indexOf(el)][0] += arr2[i][0];
                })
    }
    return arr1.sort((a, b) => (a[1] > b[1]) - (a[1] < b[1]));
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);
let a = updateInventory(
    [], 
    [
        [2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]
    ])
let b = updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]);
console.log(a);
console.log(b);