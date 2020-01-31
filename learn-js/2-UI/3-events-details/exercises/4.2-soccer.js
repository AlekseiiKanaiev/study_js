function getScrollBarWidth(){
    let result = 0;
    if (window.innerHeight < document.body.offsetHeight){
        let div = document.createElement('div');
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        document.body.append(div);
        result = div.offsetWidth - div.clientWidth;
        div.remove();
    }
    return result;
    
}
window.onload = () => {
    // console.dir(window);
    // console.dir(document);
    // console.dir(document.documentElement.offsetHeight);
    
    document.addEventListener('dragstart', (event) => event.preventDefault())
    
    document.addEventListener('mousedown', (e) => {
        if (!e.target.classList.contains('draggable')) return;
        let elem = e.target;
        let coords = elem.getBoundingClientRect();
        let shiftX = e.clientX - coords.x;
        let shiftY = e.clientY - coords.y;
    
        elem.style.position = 'absolute';
        elem.style.zIndex = 1000;
        document.body.append(elem);
    
    
        move(e.pageX, e.pageY);
    
        function move(pageX, pageY){
            let left = pageX - shiftX;
            let top = pageY - shiftY;
            let maxRight = document.body.offsetWidth - getScrollBarWidth() - elem.offsetWidth;
            let screenTop = window.scrollY;
            let screenBottom = window.innerHeight + window.scrollY - elem.offsetHeight;
            let maxBottom = document.documentElement.offsetHeight - elem.offsetHeight;
            let scrollSpeed = 100;
            let scrollTop = screenTop - scrollSpeed
            let scrollBottom = screenBottom - window.innerHeight + elem.offsetHeight + scrollSpeed;

            // console.log(top);
            // console.log(top < screenTop, screenTop);
            // console.log(top > screenBottom, screenBottom);
            // console.log(top > maxBottom, maxBottom);
            
            if (left <= 0){
                elem.style.left = '0px';
            }  else if(left > maxRight){
                elem.style.left = maxRight + 'px';
            } else {
                elem.style.left = left + 'px';
            }
            if (top <= 0){
                elem.style.top = '0px';
            } else if (top < screenTop){
                window.scrollTo({top: scrollTop, left: left, behavior: 'smooth'});
                elem.style.top = screenTop + 'px';
            } else if (top > screenBottom){
                window.scrollTo({top: scrollBottom, left: left, behavior: 'smooth'});
                elem.style.top = screenBottom + 'px';
            } else if (top > maxBottom) {
                elem.style.top = maxBottom + 'px';
            } else {
                elem.style.top = top + 'px';
            }
        }
    
        function onMouseMove(event){
            move(event.pageX, event.pageY);
        }
    
        document.addEventListener('mousemove', onMouseMove);
    
        function onMouseUp(){
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    
        document.addEventListener('mouseup', onMouseUp);
    });
}
