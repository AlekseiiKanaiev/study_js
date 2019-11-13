function specialPythagoreanTriplet(n) {
    for (let a = 1; a < n/3; a++){
        for (let b = a + 1, c = n - a - b; b < c; b++, c--){
            console.log(a, b, c);
            if (a+b+c === n && a**2 + b**2 === c**2){
                return a*b*c;
            } 
        }
    }
}
   
let a = specialPythagoreanTriplet(1000);
console.log(a);
