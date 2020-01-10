window.onload = () => {
    function showCirclePromise(cx, cy, radius) {
        return new Promise((res, rej) => {
            const div = document.createElement('div');
            div.classList.add('circle-base-style');
            div.style.top = cy + 'px';
            div.style.left = cx + 'px';
            setTimeout(() => {
                div.style.width = 2 * radius + 'px';
                div.style.height = 2 * radius + 'px';
                div.style.margin = `-${radius}px -${radius}px`; // for scaling from center
                document.addEventListener('transitionend', function hadler() {
                    document.removeEventListener('transitionend', hadler);
                    res(div);
                })
            });
            document.body.append(div);
            
        })
    }

    showCirclePromise(200, 200, 100)
    .then(
        (div) => {
            div.innerText = 'Hello, World!';
            div.classList.add('inner-text');
            div.style.lineHeight = div.style.height;
        }
    )
    .catch(err => console.log(err.message))
}