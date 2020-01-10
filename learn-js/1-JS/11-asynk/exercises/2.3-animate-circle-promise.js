window.onload = () => {
    function showCirclePromise(cx, cy, radius) {
        return new Promise((res, rej) => {
            const div = document.createElement('div');
            div.classList.add('circle-base-style');
            div.style.top = cy + 'px';
            div.style.left = cx + 'px';
            show = setInterval(() => {
                const width = parseInt(div.style.width) || 0;
                const height = parseInt(div.style.height) || 0;
                if (width < 2 * radius) {
                    div.style.width = 1 + width + 'px';
                    div.style.height = 1 + height + 'px';
                } else {
                    clearInterval(show);
                    res(div);
                }
            }, 10);
            document.body.append(div);
            
        })
    }

    showCirclePromise(100, 100, 150)
    .then(
        (div) => {
            div.innerText = 'Hello, World!';
            div.classList.add('inner-text');
            div.style.lineHeight = div.style.height;
        }
    )
    .catch(err => console.log(err.message))
}