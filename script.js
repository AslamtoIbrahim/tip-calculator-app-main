const billInput = document.getElementById('bill-input');
const percentage = document.querySelector('.percentage');
const buttons = percentage.querySelectorAll('button');
const customTipInput = document.getElementById('custom');
const billError = document.getElementById('billError');
const peopleError = document.getElementById('peopleError');
const numberOfPeopleInput = document.getElementById('numb-people');
const resultAmount = document.querySelector('.result-amount');
const resultTotal = document.querySelector('.result-total');
const restButton = document.querySelector('.rest');
let bill = 0.00;
let tip = 0.00;
let numberPeople = 0;


function calculateAll() {
    console.log('bill: ', bill);
    console.log('tip: ', tip);
    console.log('numberPeople: ', numberPeople);

    getBillValue();
    getTipValue();
    getNumberPeopleValue();
    calculateTipAndTotal();
}
billInput.addEventListener('input', function (e) {
    calculateAll();
});


getvalueFromButtons();

customTipInput.addEventListener('input', function (event) {
    tip = parseFloat(customTipInput.value);
    calculateAll();
    resetButtonsColor();

});

numberOfPeopleInput.addEventListener('input', function (event) {
    calculateAll();
});


function getBillValue() {
    if (isEmpty(billInput)) {
        showErrorBorder(billInput);
        showErrorMessage(billError);
        return;
    }

    hideErrorBorder(billInput);
    hideErrorMessage(billError);
    bill = parseFloat(billInput.value);
}



function getTipValue() {

    //📗 this is if the custom input is empty and the buttons are not clicked
    if (isEmpty(customTipInput) && tip === 0) {
        showCustomBorder();
        return;
    }

    hideCustomBorder();
}
function getvalueFromButtons() {

    const percent = [5.00, 10.00, 15.00, 25.00, 50.00];
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            tip = parseFloat(percent[index]);

            changeButtonsColor(button);
            hideCustomBorder();
            customTipInput.value = '';
            calculateAll();
        });
    });



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

function getNumberPeopleValue() {
    if (isEmpty(numberOfPeopleInput)) {
        showErrorBorder(numberOfPeopleInput);
        showErrorMessage(peopleError);
        return;
    }

    hideErrorBorder(numberOfPeopleInput);
    hideErrorMessage(peopleError);
    numberPeople = parseInt(numberOfPeopleInput.value);
}

function isEmpty(ele) {
    return ele.value.trim() == '' || ele.value.trim() == 0;
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

// chang custom border
function showCustomBorder() {
    customTipInput.style.border = '0.125rem solid var( --color-error)';
}
function hideCustomBorder() {
    customTipInput.style.border = 'none';
}


// calculate tip and total for person

function calculateTipAndTotal() {
    if (bill === 0 || numberPeople === 0 || tip === 0) {
        return;
    }

    const tipAmount = (bill * tip) / 100;
    const perPersonAmount = tipAmount / numberPeople;

    const totalAmount = (bill + tipAmount) / numberPeople;


    if (!isNaN(perPersonAmount) && !isNaN(totalAmount)) {
        resultAmount.textContent = `$${perPersonAmount.toFixed(2)}`;
        resultTotal.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        resultAmount.textContent = `Error`;
        resultTotal.textContent = `Error`;
    }
}


// reset everything

restButton.addEventListener('click', function () {
    bill = 0.00;
    tip = 0.00;
    numberPeople = 0;
    billInput.value = '';
    customTipInput.value = '';
    numberOfPeopleInput.value = '';
    billError.textContent = '';
    peopleError.textContent = '';
    resultAmount.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
    resetButtonsColor();
});