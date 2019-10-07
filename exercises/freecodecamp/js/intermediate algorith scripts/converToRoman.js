function convertToRoman(num) {
    const toROMAN = {
      1: 'I',
      4: 'IV',
      5: 'V',
      9: 'IX',
      10: 'X',
      40: 'XL',
      50: 'L',
      90: 'XC',
      100: 'C',
      400: 'CD',
      500: 'D',
      900: 'CM',
      1000: 'M'
    };
    let res = '';
    let arr = Object.keys(toROMAN);
    let i = arr.length -1;
    while (num > 0){
      if(num - arr[i] >= 0){
        res += toROMAN[arr[i]];
        num -= arr[i];
      }
      else{
        i--;
      }
    }
   return res;
  }
  
  
let a = convertToRoman(3);
let b = convertToRoman(68);
let c = convertToRoman(3999);
console.log(a);
console.log(b);
console.log(c);
  