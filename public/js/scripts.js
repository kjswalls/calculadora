$(function() {
    // keep track of buttons, inputs
    var inputs = [];
    
    // listen for clicks on all calculator buttons
    $('button').on('click', function() {
        
        // find out what button was clicked, and the previous input
        var ident = this.id;
        var prev = inputs[inputs.length - 1];
        var operand = inputs[inputs.length - 2];
        
        // add the input to the list
        inputs.push(ident);
        
        // if a number is clicked
        if (isNumber(ident)) {
            // if the previous input was an operator 
            if (isOp(prev)) {
                //perform the operation
                var result = operate(ident, prev, operand)
                // update the output
                updateOutput(result);
                updateHistory(ident);
                inputs.push(result);
            }
            // else if the previous input was a number or decimal, or nothing
            else {
                //concat it with the old number
                inputs[inputs.length - 2] = concat(inputs[inputs.length - 2], ident);
                updateOutput(ident);
            }
        }
        // if a decimal is clicked
        if (isDecimal(ident)) {
            // if the previous input was a number
            if (isNumber(prev)) {
                //concat it with the new number
                inputs[inputs.indexOf(prev)] = concat(prev, ident);
                // update the output
                updateOutput(concat(prev, ident));
            }
            // if the previous input was an operator
            if (isOp(prev)) {
                //add to inputs and update ouput
                inputs.push(ident);
                updateOutput(concat(0, ident));
            }
        }
        // if an operator is clicked
        if (isOp(ident)) {
            //if the previous input was an operator
            if (isOp(prev)) {
                //change the operator
                inputs[inputs.indexOf(prev)] = ident;
            }
            // else if the previous input was a number
            if (isNumber(prev)) {
                //add to inputs
                
            }
        }
        // if the clear button is clicked
        if (isClear) {
            // empty the inputs array
            // set output to 0
        }
        // if equals button is clicked
        if (isEquals) {
            // update output
        }
    });
})

function isNumber(id) {
    return /[0-9]/.test(id);
}

function isOp(id) {
    return /[\+\-\/x]/.test(id);
}

function isClear(id) {
    return /C/.test(id);
}

function isDecimal(id) {
    return /\./.test(id);
}

function isEquals(id) {
    return /\=/.test(id);
}

function operate(a, op, b) {
    switch(op) {
        case 'x':
            return a * b;
        case '/':
            return a / b;
        case '+':
            return a + b;
        case '-':
            return a - b;
    }
}

function updateOutput(result) {
    $('.output').text(result);
}

function updateHistory(item) {
    var current = $('.history').text();
    $('.history').text(current + ' ' + item);
}

function concat(a, b) {
    return Number(String(a) + String(b));
}