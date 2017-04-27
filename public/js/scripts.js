// keep track of inputs, current total
var inputs = [0];
var total = 0;

$(function() {
    
    // listen for clicks on all calculator buttons
    $('button').on('click', function() {
        
        // find out what button was clicked, and the previous input
        var ident = this.id;
        var prev = inputs[inputs.length - 1];
        
        // add the input to the list
        inputs.push(ident);
        
        // if a number or decimal is clicked
        if (isNumber(ident) || isDecimal(ident)) {
            // if the previous input was a number or decimal
            if (isNumber(prev) || isDecimal(prev)) {
                // if this is the first button press
                if (inputs[0] === 0 && inputs.length === 2) {
                    // remove the first 0 from the inputs list
                    inputs.shift();
                    // update the Output
                    updateOutput(inputs[inputs.length - 1]);
                }
                else {
                    // concatenate the previous and new numbers
                    var combined = concat(prev, ident);
                    // replace the previous number with the new combined number
                    inputs[inputs.length - 2] = combined;
                    // remove the new number from the end of the list
                    inputs.pop();
                    // update the output
                    updateOutput(inputs[inputs.length - 1]); 
                }
            }
            // if the previous input was an operator 
            if (isOp(prev)) {
                // update the output
                updateOutput(ident);
            }
            // if the previous input was equals
            if (isEquals(prev)) {
                // do nothing (this should never happen)
            }
            // else if this is a new sequence
            // else if (inputs[0] === 0) {
            //     // update the output
            //     updateOutput(ident);
                
            //     // if this is truly the first entry
            //     if (inputs.length === 1) {
            //         // remove the first 0 from the inputs list
            //         inputs.shift();
            //         // replace the previous number with the new number
            //         inputs[0] = ident;
            //         // update the output
            //         updateOutput(inputs[inputs.length - 1]);
            //     }
            // }
        }

        // if an operator is clicked
        if (isOp(ident)) {
            // if the last button pressed was equals
            if (inputs[0] === 0 && inputs[1] > 0) {
                // remove the first zero
                inputs.shift();
            }
            // if the previous input was an operator
            if (isOp(prev)) {
                // change the operator
                inputs[inputs.length - 2] = ident;
                // remove the new operator from the end of the list
                inputs.pop();
                //update on-screen history
                updateHistory();
            }
            // else if the previous input was a number and the one before that was an operator
            if (isNumber(prev) && isOp(inputs[inputs.length - 3])) {
                // perform operation
                var firstNum = total === 0 ? inputs[inputs.length - 4] : total;
                var operator = inputs[inputs.length - 3];
                var result = operate(Number(firstNum), operator, Number(prev));
                total = result;
                // update the output
                updateOutput(total);
                // update the history
                updateHistory();
            }
            // else just update the history
            else {
                updateHistory();
            }
        }
        // if the clear button is clicked
        if (isClear(ident)) {
            // empty the inputs array
            inputs = [];
            updateHistory();
            // set output to 0
            inputs = [0];
            updateOutput('0');
            total = 0;
        }
        // if equals button is clicked
        if (isEquals(ident)) {
            // if the previous input was a number and the one before that was an operator
            if (isNumber(prev) && isOp(inputs[inputs.length - 3])) {
                // perform operation
                var firstNum = total === 0 ? inputs[inputs.length - 4] : total;
                var operator = inputs[inputs.length - 3];
                var result = operate(Number(firstNum), operator, Number(prev));
                total = result;
                // update the output
                updateOutput(total);
                // clear inputs
                inputs = [];
                // update the history
                updateHistory();
                // re-add total for future calculations, unless the total was 0
                inputs = total === 0 ? [0] : [0, total];
            }
            else {
                // clear equals from inputs
                inputs.pop();
            }
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
    return /\C/.test(id);
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
    // downsize the result font size every 9 chars
    // if (result.length > 8 && result.length % 9 === 0) {
    //     var current = $('.output').css('font-size');
    //     var regexp = /[0-9]+/;
    //     var num = regexp.exec(current)[0];
    //     $('.output').css('font-size', Number(num) / 2);
    // }
    $('.output').text(result);
}

function updateHistory() {
    var current = inputs.join(' ');
    $('.history').text(current);
}

function concat(a, b) {
    return String(a) + String(b);
}