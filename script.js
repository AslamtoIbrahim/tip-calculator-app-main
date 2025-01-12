const billInput = document.getElementById('bill-input');
const percentage = document.querySelector('.percentage');
const buttons = percentage.querySelectorAll('button');
const customTip = document.getElementById('custom');
const billError = document.getElementById('billError');
const peopleError = document.getElementById('peopleError');
const numberOfPeople = document.getElementById('numb-people');
const resultAmount = document.querySelector('.result-amount');
const resultTotal = document.querySelector('.result-total');
const restButton = document.querySelector('.rest');
let bill;
let tip;
let numberPeople;

billInput.addEventListener('input', function(e){
    numberPeople = getNumberPeopleValue();
    bill = getBillValue();
    tip = getTipValue();
    calculateTipAndTotal();
    showErrorBorder(customTip);
});


getTipValue();

customTip.addEventListener('input', function (event) {
    tip = event.target.value;
    hideErrorBorder(customTip);
    resetButtonsColor();

    numberPeople = getNumberPeopleValue();
    bill = getBillValue();
    calculateTipAndTotal();
});

numberOfPeople.addEventListener('input', function (event) {
    numberPeople = getNumberPeopleValue();
    bill = getBillValue();
    tip = getTipValue();
    calculateTipAndTotal();
});


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



function getTipValue() {
    const value = getvalueFromButtons();
    
    console.log('before', value);
    if (value === 0) {
        showErrorBorder(customTip);
        return 0;
    }
    
    console.log('after', value);
    hideErrorBorder(customTip);
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

function getNumberPeopleValue() {
    if (isEmpty(numberOfPeople)) {
        showErrorBorder(numberOfPeople);
        showErrorMessage(peopleError);
        return 0;
    }

    hideErrorBorder(numberOfPeople);
    hideErrorMessage(peopleError);
    return numberOfPeople.value;
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


// calculate tip and total for person

function calculateTipAndTotal() {
    if (bill === 0 || numberPeople === 0 || tip === 0) {
        console.log(tip);
        return;
    }

    const tipAmount = (bill * tip) / 100; 
    const perPersonAmount = tipAmount / numberPeople;

    const totalAmount = bill + tipAmount;

    resultAmount.textContent = `$${perPersonAmount.toFixed(2)}`;
    resultTotal.textContent = `$${totalAmount.toFixed(2)}`;
}