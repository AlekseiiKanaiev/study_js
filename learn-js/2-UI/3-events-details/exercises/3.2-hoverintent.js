class HoverIntent {
    constructor({elem, over, out}){
        console.log(2);
        console.log(elem, over, out);
        this.elem = elem;
        this.onMouseOverHandler = over;
        this.onMouseOutHandler = out;
        this.elem.addEventListener('mouseover', this.onMouseOverHandler);
        this.elem.addEventListener('mouseout', this.onMouseOutHandler);
    }

}