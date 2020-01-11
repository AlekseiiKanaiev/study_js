new Promise((res) => {
    // Выбросит ошибку сразу
    // throw new Error('error!');
    setTimeout(() => {
        // Завершит промис
        res();
        // Выбросит ошибку сразу, но catch ее не словит
        // throw new Error('error!');
    }, 1000)
})
.then(() => {
    // Выбросит ошибку через секунду
    // throw new Error('error!');
})
.catch(console.log);