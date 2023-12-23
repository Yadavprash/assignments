/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
    result = 0;
    add(num){
        this.result += parseFloat(num);
    }
    subtract(num){
        this.result -= parseFloat(num);
    }
    multiply(num){
        this.result *= parseFloat(num);
    }
    divide(num){
        if(num == 0){
            throw new Error("Cannot divide by zero");
        }
        this.result /= parseFloat(num);
    }
    clear(){
        this.result = 0;
    }
    getResult(){
        return this.result;
    }
    checkPrecedence(op){
        switch (op) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default:
                return null;
        }
    }
    performOp(num1,num2,op){
        this.clear();
        this.add(num1);
        if(op === '+'){
            this.add(num2);
        }
        else if( op === '-'){
            this.subtract(num2)
        }
        else if( op === '*'){
            this.multiply(num2);
        }
        else if( op === '/'){
            this.divide(num2);
        }
        return this.getResult();
    }
    calculate(string){
        const regex = /[+\-*/()0-9.]/;
        const numregex =/[0-9.]/;
        let expString = "";
        for(let ch of string){
            if(regex.test(ch)){
                expString += ch;
            }
            else if(ch !== " "){
                throw new Error('Invalid Exp');
            }
        }
        //check if the parenthesis are balanced;
        let stack = [];
        for(let ch of expString){
            if(ch === '('){
                stack.push(')');
            }else if(ch === ')'){
                if(stack.length === 0 || stack.pop()!== ')'){
                    throw new Error("Invalid Parenthesis");
                }
            }
        }
        if(stack.length !== 0){
            throw new Error("Invalid Parenthesis");
        }
        // console.log(expString);
        let opt =[];
        let opr =[];
        let pt=0;
        let digit ="";
        //This makes string like "-10-2" to be "0-10-2"
        if(expString[0] === "-")expString = "0" +expString ;
        for(let i=0;i< expString.length;i++){
            let ch = expString[i];
            if(numregex.test(ch)){
                digit+=ch;
                // console.log(digit)
                if(i+1 === expString.length || !numregex.test(expString[i+1])){
                    opr.push(digit);
                    // console.log(digit);
                    digit="";
                }
            }else{
                //it's an operator
                if(ch === '('){
                    opt.push(ch);
                }
                else if(ch === ')'){
                    while(opt[opt.length-1] !== '('){
                        const ot1 = opt.pop();
                        const op1 = opr.pop();
                        const op2 = opr.pop();
                        opr.push(this.performOp(op2,op1,ot1));
                    }
                    opt.pop();
                }
                else if(opt.length === 0){
                    opt.push(ch);
                    // console.log("hi");
                }
                else if(this.checkPrecedence(opt[opt.length-1]) >= this.checkPrecedence(ch)){
                    //perform operations
                    while(opt.length > 0 && this.checkPrecedence(opt[opt.length-1]) >= this.checkPrecedence(ch)){
                        const ot1 = opt.pop();
                        const op1 = opr.pop();
                        const op2 = opr.pop();
                        opr.push(this.performOp(op2,op1,ot1));
                    }
                    opt.push(ch);
                }else{
                    opt.push(ch);
                }
            }
        }
        while(opt.length>0){
            const ot1 = opt.pop();
            const op1 = opr.pop();
            const op2 = opr.pop();
            opr.push(this.performOp(op2,op1,ot1));
        }
        this.result = opr.pop();
        // console.log(this.result);
        return this.result;
    }
}

//need to fix for strings like "-90-10"

// const calcy = new Calculator();
// const result = calcy.calculate('-80-88');
// console.log(result);
module.exports = Calculator;
