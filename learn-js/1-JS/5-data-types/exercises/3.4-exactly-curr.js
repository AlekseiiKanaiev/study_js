function extractCurrencyValue(str){
    let res = '';
    for(let c of str){
        if (isFinite(c)){
            res += c;
        }
    }
    return res;
}

let a = extractCurrencyValue("$120");
console.log(a);