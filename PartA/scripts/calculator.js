$(document).ready(() => {
    // Display welcome message with username from localStorage
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }
    $('#welcomeUser').text(`Welcome, ${username}!`);

    // Simple Calculator Implementation
    const validateNumber = (value, fieldId) => {
        const errorElement = $(`#${fieldId}Error`);
        errorElement.text('');
        
        if (!value.trim()) {
            errorElement.text('This field is required');
            return false;
        }
        
        if (!/^-?\d*\.?\d*$/.test(value)) {
            errorElement.text('Only numbers and decimal points allowed');
            return false;
        }
        
        const num = parseFloat(value);
        if (!isFinite(num)) {
            errorElement.text('Value is too large');
            return false;
        }
        
        return true;
    };

    // Single arrow function for all calculations
    const calculate = (operation) => {
        const num1 = $('#number1').val().trim();
        const num2 = $('#number2').val().trim();
        
        // Validate inputs
        const isNum1Valid = validateNumber(num1, 'number1');
        const isNum2Valid = validateNumber(num2, 'number2');
        
        if (!isNum1Valid || !isNum2Valid) {
            return;
        }

        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        let result;

        switch(operation) {
            case 'add':
                result = n1 + n2;
                break;
            case 'subtract':
                result = n1 - n2;
                break;
            case 'multiply':
                result = n1 * n2;
                break;
            case 'divide':
                if (n2 === 0) {
                    $('#resultError').text('Cannot divide by zero');
                    return;
                }
                result = n1 / n2;
                break;
        }

        if (!isFinite(result)) {
            $('#resultError').text('Result is too large');
            $('#result').val('');
            return;
        }

        $('#resultError').text('');
        $('#result').val(result.toFixed(4));
    };

    // Event handlers for simple calculator
    $('.operation-btn').click(function() {
        const operation = $(this).data('operation');
        calculate(operation);
    });

    // Advanced Calculator Implementation
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let shouldResetScreen = false;

    const updateDisplay = () => {
        $('#currentOperand').text(currentOperand);
        $('#previousOperand').text(previousOperand);
    };

    const appendNumber = (number) => {
        if (shouldResetScreen) {
            currentOperand = '';
            shouldResetScreen = false;
        }
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand === '0' && number !== '.') {
            currentOperand = number;
        } else {
            currentOperand += number;
        }
        updateDisplay();
    };

    const chooseOperation = (op) => {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = op;
        previousOperand = `${currentOperand} ${operation}`;
        currentOperand = '';
        updateDisplay();
    };

    const compute = () => {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    computation = 'Error';
                } else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        
        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        shouldResetScreen = true;
        updateDisplay();
    };

    // Event Listeners for advanced calculator
    $('.number').click(function() {
        appendNumber($(this).text());
    });

    $('.operator').click(function() {
        chooseOperation($(this).data('operator'));
    });

    $('[data-action="calculate"]').click(() => {
        compute();
    });

    $('[data-action="clear"]').click(() => {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
        updateDisplay();
    });

    $('[data-action="percentage"]').click(() => {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateDisplay();
    });

    $('[data-action="backspace"]').click(() => {
        currentOperand = currentOperand.toString().slice(0, -1);
        if (currentOperand === '') currentOperand = '0';
        updateDisplay();
    });

    // Keyboard support for advanced calculator
    $(document).keydown((e) => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            appendNumber(e.key);
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            const opMap = { '+': '+', '-': '-', '*': '×', '/': '÷' };
            chooseOperation(opMap[e.key]);
        } else if (e.key === 'Enter' || e.key === '=') {
            compute();
        } else if (e.key === 'Backspace') {
            $('[data-action="backspace"]').click();
        } else if (e.key === 'Escape') {
            $('[data-action="clear"]').click();
        }
    });

    // Initialize displays
    updateDisplay();
});