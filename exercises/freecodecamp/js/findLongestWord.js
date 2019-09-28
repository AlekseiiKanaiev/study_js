function findLongestWordLength(str) {
    return Math.max(...str.split(' ').map(el => el.length));
  }
  
 console.log(findLongestWordLength("The quick brown fox jumped over the lazy dog")); 