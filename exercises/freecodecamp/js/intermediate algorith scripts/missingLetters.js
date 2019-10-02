function fearNotLetter(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    const start = alphabet.indexOf(str[0]);
    const end = alphabet.indexOf(str[str.length-1])+1;
    let ourStr = alphabet.slice(start, end);
    // console.log(ourStr);
    for (let char of ourStr){
      if (!str.includes(char)){
        res += char;
      }
    }
    return res || undefined;
    // return ourStr.split('').filter(el => !str.includes(el)).join('') || undefined;
  }
  
let a = fearNotLetter("abce");
console.log(a);