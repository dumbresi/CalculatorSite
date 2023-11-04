class Button{
    #startwidth;
    #startheight;
    #width;
    #height;
    #color;

    constructor(startwidth,startheight,width,height,color) {
        this.#startheight=startheight;
        this.#startwidth=startwidth;
        this.#width=width;
        this.#height=height;
        this.#color=color;
    }

    drawButton(text) {
        const canvas=document.createElement("canvas");
        document.body.appendChild(canvas);
        const ctx= canvas.getContext("2d");
        ctx.rect(this.#startwidth,this.#startheight,this.#width,this.#height);
        ctx.stroke();
        ctx.fillText(text,this.#startwidth+20,this.#startheight+20);
        // ctx.fillStyle(this.#color);
    }
}

// const one = document.getElementById("one");
// const oneCtx= one.getContext("2d");

// oneCtx.fillStyle= "blue";
// oneCtx.fillText("1",100,100);
// oneCtx.fillRect(10,10,20,20);
for(let i=0;i<9;i++){
    const a= new Button(10*i,10*i,40,40,"red");
    a.drawButton(""+i);
}

