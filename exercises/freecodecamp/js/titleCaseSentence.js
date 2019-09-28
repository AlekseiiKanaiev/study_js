function titleCase(str) {
    let newStr = str.toLowerCase().split(' ').map(el => el.replace(el[0], el[0].toUpperCase())).join(' ');
    console.log(newStr);
    return newStr
  }
  
  titleCase("I'm a little tea pot");
