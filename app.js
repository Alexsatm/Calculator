const calculator = document.querySelector('.calculator');
const history = [];
let tempNumber = '';
let operationType = '';

calculator.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('col')) {
        const data = target.dataset.type;
        operation(data);
        console.log(tempNumber);
        renderTotal(tempNumber)
    }
})

function operation(data) {
    if (data > 0) {
        operationType = 'number';
        tempNumber = tempNumber + data;
    }

    if (data === 'float') {
        operationType = 'number';
        if(!/\./.test(tempNumber)) {
            if(tempNumber) {
                tempNumber = tempNumber + '';
            } else {
                tempNumber = '0'
            }
        }
    }

    if (data === 'delete' && operationType === 'number') {
        tempNumber = tempNumber.substring(0, tempNumber.length - 1)
    }

    if (data === '+' && tempNumber) {
        operationType = data;
        history.push(tempNumber, '+');
        tempNumber = '';
    }
}

function renderTotal(value) {
    const totalBlock = calculator.querySelector('.total');
    totalBlock.innerHTML = value;
}

function renderHistory(historyArray) {
    const historyBlock = calculator.querySelector('.history');
    let htmlElements = '';

    historyArray.forEach((item) => {
        if (item > 0) {
            htmlElements = htmlElements + `<span>${item}</span>`
        }

        if (['+', '-', '/', '*'].includes(item)) {
            htmlElements = htmlElements + `&nbsp<strong>${item}</strong>`;
        }
    });
    historyBlock.innerHTML = htmlElements;
}