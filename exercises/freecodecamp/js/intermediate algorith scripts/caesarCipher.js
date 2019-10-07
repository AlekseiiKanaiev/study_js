function rot13(str) { // LBH QVQ VG!
    return str.replace(/\w/g, (match) => String.fromCharCode(up13(match.charCodeAt())));
  }

function up13(num){
    // console.log(num);
    let res = (num % 65 + 13) % 26 + 65;
    return res;
}
// Change the inputs below to test
let a = rot13("SERR PBQR PNZC");
let b = rot13('LBH QVQ VG!')
console.log(a);
console.log(b);