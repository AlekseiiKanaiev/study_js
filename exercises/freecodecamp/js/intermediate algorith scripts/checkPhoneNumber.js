function telephoneCheck(str) {
    // Good luck!
    let re = /(^1?)\s?((\(\d{3}\))|\d{3})-?\s?(\d{3})-?\s?(\d{4}$)/
    return re.test(str);
  }
  
let a = telephoneCheck("555-555-5555");
let b = telephoneCheck("1 555-555-5555");
let c = telephoneCheck("555-5555");
let d = telephoneCheck("1 555)555-5555");
let e = telephoneCheck("2 757 622-7382");
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);