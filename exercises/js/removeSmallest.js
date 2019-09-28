function removeSmallest(numbers) {
	
	// let minIndex = numbers.findIndex((elem) => elem === Math.min(...numbers));
	console.log(numbers.filter((num,ind) => ind !== numbers.indexOf(Math.min(...numbers))));
	// numbers.splice(minIndex, 1);
	return numbers.filter((num,ind) => ind !== numbers.indexOf(Math.min(...numbers)));
}
numbers = [5, 3, 2, 1, 4];
console.log(removeSmallest(numbers))

let a;
a.push(1);
console.log(a);