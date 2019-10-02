function convertHTML(str) {
    // &colon;&rpar;
    const signs = {
      '&':'&amp;',
      '<':'&lt;',
      '>':'&gt;',
      '"':'&quot;',
      '\'':"&apos;"
    };
    let res = str;
    return res.replace(/[<>&"']/g, (match) => signs[match]);
    // return res.split('').map(el => signs[el] || el).join('');
  }
  
let a = convertHTML("Dolce & Gabbana");
let b = convertHTML("Stuff in \"quotation marks\"");
console.log(a);
console.log(b);
  