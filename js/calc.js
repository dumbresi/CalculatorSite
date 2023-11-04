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

    drawButton(text,container) {
        const canvas=document.createElement("canvas");
        canvas.setAttribute("height",""+this.#height*2);
        canvas.setAttribute("width",""+this.#width*2);
        container.appendChild(canvas);
        const ctx= canvas.getContext("2d");
        ctx.rect(1,1,this.#width*1.9,this.#height*1.9);
        ctx.stroke();
        ctx.fillText(text,25,30);
        ctx.font = "34px Arial";
        ctx.fillStyle=this.#color;
        if(text==="="){
            evaluateButton=canvas;
        }
        canvas.addEventListener("click",(event)=>{
            const target=event.target;

            if(text==="back"){
                expression=expression.substring(0,expression.length-1);
                screen.innerHTML=expression;
                answer.innerHTML="";
            }
            if(text!="=" && text!="back"){
                expression+=text;
                screen.innerHTML=expression;
            }
            
           
        });
    }
}



const container=document.querySelector(".container");
//made a parent div container for holding all buttons
const container1=document.getElementById("container-1");
// Each customized container will hold all buttons of a single line
const container2=document.getElementById("container-2");
const container3=document.getElementById("container-3");
const container4=document.getElementById("container-4");
const container5=document.getElementById("container-5");

const containers=[container1,container2,container3,container4,container5];


const screen =document.getElementById("screen");
const answer=document.getElementById("answer");
var expression="";


let space=0;

var evaluateButton;

var buttons=["","","","%","/","(","7","8","9","*",")","4","5","6","-","back","1","2","3","+","","","0",".","="];
let btn_count=0;
for(let i=0;i<5;i++){
    space=0;
    for(let j=0;j<5;j++){
        var btn=new Button(10*space,10,40,40,"white");
        btn.drawButton(buttons[btn_count],containers[i]);
        space++;
        btn_count++;
    }
}

evaluateButton.addEventListener("click",()=>{
    // eval(expression);
    answer.innerHTML=eval(expression);
});


// for(let i=0;i<5;i++){
//     const a= new Button(10*i,10,40,40,'#9933CC');
//     a.drawButton(""+i,container1);
// }
// const back="back";
// const bracket_open="(";
// const bracket_close=")";
// const equals= "=";
// const percent="%";
// const divide="/";
// const multiply="X";
// const add="+";
// const minus="-";
// const point=".";
// space=0;
// const back_button= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(back,container3);
// space++;
// const bracket_open_btn= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(bracket_open,container3);
// space++;
// const bracket_close_btn= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(bracket_close,container3);
// space++;
// const percent_btn= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(percent,container3);
// space++;
// const equals_btn= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(equals,container3);
// space=0;

// const add_btn= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(add,container4);
// space++;

// const minus_btn= new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(minus,container4);
// space++;

// const multiply_btn=new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(minus,container4);
// space++;

// const point_btn=new Button(10*space,10,40,40,"#9933CC");
// back_button.drawButton(point,container4);
// space++;
// for(let j=5;j<10;j++){
//     const b= new Button(10*space,10,40,40,'#9933CC');
//     b.drawButton(""+j,container2);
//     space++;
// }









