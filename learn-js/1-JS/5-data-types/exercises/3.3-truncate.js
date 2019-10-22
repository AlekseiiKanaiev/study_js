function truncate(str, max){
    return (str.length <= max)? str : str.slice(0, max-1)+"…";
}

console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
console.log(truncate("Всем привет!", 20));