window.onload = () => {

    const el = document.getElementById('circle');

    function showCircle(cx, cy, radius) {
        el.style.top = cy + 'px';
        el.style.left = cx + 'px';
        el.style.borderRadius = radius + 'px';
        show = setInterval(() => {
            if (parseInt(el.style.width)  < 2 * radius) {
            
                el.style.width = 1 + parseInt(el.style.width) + 'px';
                el.style.height = 1 + parseInt(el.style.height) + 'px';
            } else {
                clearInterval(show);
            }
        }, 10)
    }
    // showCircle(100, 100, 50);

    function showCircleCB(cx, cy, radius, callback) {
        el.style.top = cy + 'px';
        el.style.left = cx + 'px';
        el.style.lineHeight = 2 * radius + 'px'
        show = setInterval(() => {
            const width = parseInt(el.style.width) || 0;
            const height = parseInt(el.style.width) || 0;
            if (width  < 2 * radius) {
                el.style.width = 1 + width + 'px';
                el.style.height = 1 + height + 'px';
            } else {
                clearInterval(show);
                callback(null, el);
            }
        }, 500 / (2 * radius))
    }

    showCircleCB(100, 100, 50, (error, div) => {
        if (error) {
            console.log(error);
        } else {
            div.classList.add('message-ball');
            div.append("Hello, world!");
        }
    });
    
}

