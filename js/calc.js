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
        ctx.fillStyle = this.#color;
       
        ctx.fillRect(0,0,this.#width*1.99,this.#height*2.2);
        ctx.strokeStyle="white";
        ctx.stroke();
        
        ctx.font="30px Arial";
        if(text==="Back"){
            ctx.font="20px Arial"
        }
        ctx.fillStyle = "white"
        // ctx.fillStyle=this.#color;
        ctx.fillText(text,this.#width/1.5,this.#height/0.8);
        if(text==="="){
            evaluateButton=canvas;
        }
        canvas.addEventListener("click",(event)=>{
            const target=event.target;

            if(text==="Back"){
                expression=expression.substring(0,expression.length-1);
                screen.textContent=expression;
                answer.textContent="";
            }
            else if(text==="X"){
                expression+="*";
                screen.textContent=expression;
            }
            else if(text==="C"){
                expression="";
                screen.textContent="";
                answer.textContent=""
            } else if(text==="="){
                screen.textContent=expression;
            }
            else{
                expression+=text;
                screen.textContent=expression;
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

var buttons=["C","","","%","/","(","7","8","9","X",")","4","5","6","-","Back","1","2","3","+","0",".","="];
let btn_count=0;
for(let i=0;i<5;i++){
    space=0;
    for(let j=0;j<5;j++){
        var btn_color
        if(j!=4 && i>0){
            btn_color="#787a7e"
        }
        else if(i==0 & j<4){
            btn_color="#5e6066"
        }else{
            btn_color="orange"
        }
        if(buttons[btn_count]==="0"){
            var btn=new Button(10*space,10,120,40,btn_color);
            btn.drawButton(buttons[btn_count],containers[i]);
            j=j+2;
        }else{
            var btn=new Button(10*space,10,40,40,btn_color);
            btn.drawButton(buttons[btn_count],containers[i]);
        }
        space++;
        btn_count++;
    }
}

evaluateButton.addEventListener("click",()=>{
    // eval(expression);
    
    answer.textContent=calculate(expression);
});

// Function to calculate the result of a mathematical expression
function calculate(expression) {
    try {
      const tokens = tokenize(expression);
      const postfix = infixToPostfix(tokens);
      const result = evaluatePostfix(postfix);
      return result;
    } catch (error) {
      return "Error: " + error.message;
    }
  }

  function tokenize(expression) {
    // Tokenize the input expression using regex
    return expression.match(/\d+\.\d+|\d+|[+\-*/()]|-\d+|\d+/g);
    // return expression.match(/(\d+\.\d+|\d+|[-+*/()])/g);
  }
  
  function infixToPostfix(tokens) {
    // Operator precedence
    console.log(tokens);
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    const output = [];   // Output queue for postfix notation
  const operators = []; // Stack for operators

  for (let token of tokens) {
    if (!isNaN(token)) {
      // If the token is a number, add it to the output queue
      output.push(token);
    } else if (token === "(") {
      // If it's an opening parenthesis, push it to the operator stack
      operators.push(token);
    } else if (token === ")") {
      // If it's a closing parenthesis, pop operators from the stack to output until an opening parenthesis is encountered
      while (operators.length > 0 && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      if (operators[operators.length - 1] === "(") {
        operators.pop(); // Discard the opening parenthesis
      }
    } else {
      // If it's an operator, handle operator precedence and push to the stack accordingly
      while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[token]) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  }
  console.log("operator:"+operators);
  console.log("output:"+output);
  // Pop any remaining operators from the stack to the output queue
  while (operators.length > 0) {
    output.push(operators.pop());
  }

  return output; // Return the postfix notation
}

// Function to evaluate a postfix expression
function evaluatePostfix(tokens) {
    const stack = [];
  
    for (let token of tokens) {
      if (!isNaN(token)) {
        // If it's a number, push it to the stack
        stack.push(parseFloat(token));
      } else {
        // If it's an operator, pop two operands from the stack, perform the operation, and push the result back to the stack
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            stack.push(a / b);
            break;
        }
      }
    }
  
    if (stack.length === 1) {
      // If there's a single value in the stack, that's the result
      return stack[0];
    } else {
      throw new Error("Invalid expression");
    }
  }


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









