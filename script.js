const billInput = document.getElementById('bill-input');
const percentage = document.querySelector('.percentage');
const buttons = percentage.querySelectorAll('button');
const custom = document.getElementById('custom');
const billError = document.getElementById('billError');
const peopleError = document.getElementById('peopleError');
const numbPeople = document.getElementById('numb-people');
const resultAmount = document.querySelector('.result-amount');
const resultTotal = document.querySelector('.result-total');
const restButton = document.querySelector('.rest');
let bill;
let tip;

numbPeople.addEventListener('input', function (event) {
    bill = getBillValue();
    tip = getTipValue();
    resultTotal.textContent = tip;
})


function getBillValue() {
    if (isEmpty(billInput)) {
        showErrorBorder(billInput);
        showErrorMessage(billError);
        return 0;
    }


    hideErrorBorder(billInput);
    hideErrorMessage(billError);
    return billInput.value;
}

getTipValue();

function getTipValue() {
    const value = getvalueFromButtons();
    if (value === 0) {
        showErrorBorder(custom);
    }
    custom.addEventListener('input', function (event) {
        value = event.target.value;
        hideErrorBorder(custom);
        resetButtonsColor();
    });

    return value;
}
function getvalueFromButtons() {
    let value = 0;
    const percent = [5, 10, 15, 25, 50];
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            value = percent[index];
            changeButtonsColor(button);
        });
    });

    return value;
}

function changeButtonsColor(button) {
    buttons.forEach((b) => {
        b.style.backgroundColor = 'hsl(183, 100%, 15%)';
        b.style.color = 'white';
    });
    button.style.backgroundColor = 'hsl(172, 67%, 45%)';
    button.style.color = 'hsl(183, 100%, 15%)';
}
function resetButtonsColor() {
    buttons.forEach((b) => {
        b.style.backgroundColor = 'hsl(183, 100%, 15%)';
        b.style.color = 'white';
    });
}

function isEmpty(ele) {
    return ele.value.trim() == '';
}

function showErrorBorder(input) {
    input.classList.add('border-error');
}
function hideErrorBorder(input) {
    input.classList.remove('border-error');
}

function showErrorMessage(ele, message = 'can\'t be zero') {
    ele.style.display = 'inline-block';
    ele.classList.remove('shake');
    void ele.offsetWidth;
    ele.classList.add('shake');
    ele.textContent = message;
}
function hideErrorMessage(ele) {
    ele.style.display = 'none';
}