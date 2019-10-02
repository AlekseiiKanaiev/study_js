function spinalCase(str) {
    // "It's such a fine line between stupid, and clever."
    // --David St. Hubbins
    // console.log(str.replace(/[A-Z]/g, (match)=>' '+match).trim().toLowerCase().replace(/\W+/g, '-'));

    // return str.replace(/[A-Z]/g, (match)=>' '+match).toLowerCase().replace(/(?:<.+>)|[_]/g, ' ').trim().replace(/\W+/g, '-');
    return str.replace(/(?:<.*>)|[_\W]/g, ' ')
            .replace(/[A-Z]/g, (match)=>' '+match)
            .trim()
            .toLowerCase()
            .replace(/\W+/g, '-');
}
let str1 = 'The_Andy_<wbr>Griffith_Show';
let str2 = 'This Is Spinal Tap';
let str3 = 'thisIsSpinalTap';
let str4 = 'Teletubbies say Eh-oh';
console.log(spinalCase(str1));
console.log(spinalCase(str2));
console.log(spinalCase(str3));
console.log(spinalCase(str4));