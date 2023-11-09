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
        //draw the buttons using the height width and color provided
       
        ctx.fillRect(0,0,this.#width*1.99,this.#height*2.2);
        ctx.strokeStyle="white";
        ctx.stroke();
        
        ctx.font="30px Arial";
        if(text==="Back"){
            ctx.font="20px Arial"
            ctx.fillStyle = "white"
            ctx.fillText(text,this.#width/2.5,this.#height/0.8);
        }else if(text==="0"){
            ctx.fillStyle = "white"
            ctx.fillText(text,this.#width,this.#height/0.8);
        }else{
            ctx.fillStyle = "white"
            ctx.fillText(text,this.#width/1.5,this.#height/0.8);
        }
        
        // ctx.fillStyle=this.#color;
        
        if(text==="="){
            evaluateButton=canvas;
        }
        canvas.addEventListener("click",(event)=>{
            const target=event.target;

            if(text==="Back"){
                //if back button is pressed, delete the last character, also erase the answer
                expression=expression.substring(0,expression.length-1);
                screen.textContent=expression;
                answer.textContent="";
            }
            else if(text==="X"){
                expression+="*";
                screen.textContent=expression;
            }
            else if(text==="C"){
                //clear screen once C is clicked
                expression="";
                screen.textContent="";
                answer.textContent=""
            } else if(text==="="){
                //evaluate the expression keeping the expression as it is
                screen.textContent=expression;
            }
            else{
                //update the expression depending on the button pressed and update the display text
                expression+=text;
                screen.textContent=expression;
            }
            if(text!="="){
                answer.textContent="";
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
//defined buttons array for all the buttons
var buttons=["C","","","%","/","(","7","8","9","X",")","4","5","6","-","Back","1","2","3","+","0",".","="];

let btn_count=0;
for(let i=0;i<5;i++){
    //iterate through rows
    space=0;
    for(let j=0;j<5;j++){
        var btn_color
        //iterate over every button
        if(j!=4 && i>0){
            btn_color="#787a7e"
            //button color for central buttons
        }
        else if(i==0 & j<4){
            btn_color="#5e6066"
        //button color for first row buttons
        }else{
            btn_color="orange"
            //button colors for 5th column
        }
        if(buttons[btn_count]==="0"){
            var btn=new Button(10*space,10,120,40,btn_color);
            btn.drawButton(buttons[btn_count],containers[i]);
            j=j+2;
            //stretch the 0 character button
        }else{
            var btn=new Button(10*space,10,40,40,btn_color);
            btn.drawButton(buttons[btn_count],containers[i]);
            //draw the buttons by calculating the width
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
    //multiplication and divison are given first priority then add, subtract
    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
    };

    const output = [];   // Output queue for postfix notation
  const operationsStack = []; // Stack for operators

  for (let i=0;i<tokens.length;i++) {
    const token=tokens[i];
    if (!isNaN(token)) {
      // If the token is a number, add it to the output queue
      output.push(token);
    } else if (token === "(") {
      // If it's an opening parenthesis, push it to the operator stack
      operationsStack.push(token);
      if(tokens[i+1]==="-"&& !isNaN(tokens[i+2])){
       //If a negative number is present inside () then push that negative number in output stack
        const neg="-"+tokens[i+2];
        output.push(neg);
        i=i+2;
      }
    } else if (token === ")") {
      // If it's a closing parenthesis, pop operators from the stack to output until an opening parenthesis is encountered
      while (operationsStack.length > 0 && operationsStack[operationsStack.length - 1] !== "(") {
        output.push(operationsStack.pop());
      }
      if (operationsStack[operationsStack.length - 1] === "(") {
        operationsStack.pop(); // Discard the opening parenthesis
      }
    } else {
      // If it's an operator, handle operator precedence and push to the stack accordingly
      while (operationsStack.length > 0 && precedence[operationsStack[operationsStack.length - 1]] >= precedence[token]) {
        output.push(operationsStack.pop());
      }
      operationsStack.push(token);
    }
  }
  console.log("operator:"+operationsStack);
  console.log("output:"+output);
  // Pop any remaining operators from the stack to the output queue
  while (operationsStack.length > 0) {
    output.push(operationsStack.pop());
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
      if(!isNaN(stack[0])){
        return stack[0];
      }else{
        return "Invalid Expression";
      }
      
    } else {
      throw new Error("Invalid expression");
    }
  }

const btn_holder= document.querySelector(".buttons");

for(let i=0;i<3;i++){
    const canvas=document.createElement("canvas");
    canvas.setAttribute("height",""+20);
    canvas.setAttribute("width",""+20);
    canvas.style.marginTop = "5px";
    canvas.style.marginLeft = "10px";
    btn_holder.appendChild(canvas);
    const cvs= canvas.getContext("2d");
    cvs.arc(10, 10, 10, 0, 2 * Math.PI, false);
    if(i===0){
        cvs.fillStyle = 'red';
    }else if(i===1){
        cvs.fillStyle = '#d4c555';
    }else{
        cvs.fillStyle = 'green';
    }
    
    cvs.fill();

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









