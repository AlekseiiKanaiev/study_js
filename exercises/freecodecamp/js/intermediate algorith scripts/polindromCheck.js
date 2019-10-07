function palindrome(str) {
    // Good luck!
    let newStr = str.toLowerCase().replace(/[^a-z0-9]/g, '')
    console.log(newStr);
    let res = newStr.split('').reverse().join('');
    console.log(res);
    return res === newStr;
  }
  
  
  
let a = palindrome("race car");
let b = palindrome('A man, a plan, a canal. Panama');
let c = palindrome("0_0 (: /- :) 0-0");
console.log(a);
console.log(b);
console.log(c);