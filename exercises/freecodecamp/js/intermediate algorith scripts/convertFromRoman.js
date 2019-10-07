function convertFromRoman(str) {
    const fromROMAN = {
        'I':  1,
        'IV': 4,
        'V': 5,
        'IX': 9,
        'X': 10,
        'XL': 40,
        'L': 50,
        'XC': 90,
        'C': 100,
        'CD': 400,
        'D': 500,
        'CM': 900,
        'M': 1000
    };
    let res = 0;
    for (let i = 0; i < str.length; i++){
        if (fromROMAN[str[i]+str[i+1]]){
            res += fromROMAN[str[i]+str[++i]];
            // i++;
        }
        else{
            res += fromROMAN[str[i]];
        }
    }
   return res;
  }
  
  
let a = convertFromRoman('IX');
let b = convertFromRoman('LXVIII');
let c = convertFromRoman('MMMCMXCIX');
console.log(a);
console.log(b);
console.log(c);
  