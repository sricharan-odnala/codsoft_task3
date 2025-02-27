// Select elements
const resultDisplay = document.getElementById("result");
let currentInput = "";
let operator = null;
let previousInput = "";

// Function to update the display
function updateDisplay(value) {
    resultDisplay.value = value;
}

// Function to handle button clicks
function handleButtonClick(value) {
    if (value === "C") {
        // Clear the display
        currentInput = "";
        previousInput = "";
        operator = null;
        updateDisplay("0");
    } else if (value === "=") {
        // Perform the calculation
        if (operator && previousInput !== "") {
            currentInput = calculate(previousInput, currentInput, operator);
            previousInput = "";
            operator = null;
            updateDisplay(currentInput);
        }
    } else if (["+", "-", "*", "/"].includes(value)) {
        // Set the operator and store the current input as previous input
        if (currentInput !== "") {
            previousInput = currentInput;
            currentInput = "";
            operator = value;
        }
    } else {
        // Append the clicked number or decimal
        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else {
            currentInput += value;
        }
        updateDisplay(currentInput);
    }
}

// Function to perform calculation
function calculate(prev, curr, operator) {
    prev = parseFloat(prev);
    curr = parseFloat(curr);
    
    switch (operator) {
        case "+":
            return (prev + curr).toString();
        case "-":
            return (prev - curr).toString();
        case "*":
            return (prev * curr).toString();
        case "/":
            if (curr !== 0) {
                return (prev / curr).toString();
            } else {
                alert("Cannot divide by zero");
                return "0";
            }
        default:
            return curr.toString();
    }
}

// Event listener for buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        handleButtonClick(value);
    });
});

// Initialize display
updateDisplay("0");
