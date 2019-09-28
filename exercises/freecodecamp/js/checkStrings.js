function mutation(arr) {
    let arr1 = arr[0].toLowerCase().split('');
    let arr2 = arr[1].toLowerCase().split('');
    return arr2.every(el => arr1.includes(el));
}

mutation(["hello", "hey"]);