const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let secondNumber = "";
let currentOperation = "equals";
let delayClear = false;

const numbers = document.querySelectorAll(".number");
numbers.forEach((number) => number.addEventListener("click", numberInput));

const operators = document.querySelectorAll(".operator");
operators.forEach((operator) => operator.addEventListener("click", process));

const allClear = document.querySelector(".all-clear");
allClear.addEventListener("click", clearDisplay);

const deleteLastDigit = document.querySelector("#delete");
deleteLastDigit.addEventListener("click", deleteDigit);

buttons.forEach((button) => {
  if (button.className.includes("orange-button")) {
    button.addEventListener("click", () => {
      button.classList.toggle("orange-button-onclick");
      setTimeout(function () {
        button.classList.toggle("orange-button-onclick");
      }, 150);
    });
  } else {
    button.addEventListener("click", () => {
      button.classList.toggle("button-onclick");
      setTimeout(function () {
        button.classList.toggle("button-onclick");
      }, 150);
    });
  }
});

function clearDisplay() {
  display.textContent = "";
  secondNumber = "";
  firstNumber = "";
  currentOperation = "equals";
}

function deleteDigit() {
  if (delayClear) return;
  display.textContent = display.textContent.slice(
    0,
    display.textContent.length - 1
  );
}

function operate(oper, a, b) {
  if (oper == "addition") {
    return a + b;
  } else if (oper == "subtraction") {
    return a - b;
  } else if (oper == "multiplication") {
    return a * b;
  } else if (oper == "division") {
    return a / b;
  } else if (oper == "percentage") {
    return (a / 100) * b;
  } else {
    return display.textContent;
  }
}

function numberInput(e) {
  if (delayClear) {
    display.textContent = "";
    delayClear = false;
  }
  if (display.textContent.length >= 8) return;
  const digit = e.target.textContent;
  if (digit == "." && display.textContent.includes(".")) return;
  display.textContent += digit;
}

function process(e) {
  secondNumber = display.textContent;
  let result = +operate(currentOperation, +firstNumber, +secondNumber);
  if (result.toString().length >= 8) {
    result = result.toPrecision(4);
  }
  display.textContent = result.toString();
  firstNumber = result;
  delayClear = true;
  currentOperation = e.target.id;
}
