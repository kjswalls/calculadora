$(function() {
    // keep track of buttons, inputs
    var stack = {
        history: [],
        
    }
    
    // listen for clicks on all calculator buttons
    $('button').on('click', function() {
        
        // find out what button was clicked, and the previous input
        var ident = this.id;
        
        // add the input to the list
        inputs.push(ident);
        
        // if a number is clicked
        if (isNumber(ident)) {
            // if the previous input was an operator 
            if (isOp(prev)) {
                //perform the operation
                // update the output
                // update the history
            }
            // else if the previous input was a number or decimal, or nothing
            else {
                //concat it with the old number
                // update the output
            }
        }
        // if a decimal is clicked
        if (isDecimal(ident)) {
            // if the previous input was a number
            if (isNumber(prev)) {
                //concat it with the new number
                // update the output
            }
            // if the previous input was an operator
            if (isOp(prev)) {
                //add to inputs and update ouput
            }
        }
        // if an operator is clicked
        if (isOp(ident)) {
            //if the previous input was an operator
            if (isOp(prev)) {
                //change the operator
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