const calculator = document.querySelector('.calculator');
let history = [];
let tempNumber = '';
let operationType = '';
let isPersent = false;
let isEqual = false;

calculator.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('col')) {
        const data = target.dataset.type;
        operationTypeHandling(data)
        renderTotal(tempNumber)
        renderHistory(history)
    }
})


//Обработка клавиш нажатых на клавиатуре
function operationTypeHandling(data) {
    if (data > 0) {
        operationType = 'number';
        tempNumber = tempNumber === '0' ? data: tempNumber + data;
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
        tempNumber = tempNumber.substring(0, tempNumber.length - 1);
        tempNumber = tempNumber ? tempNumber: '0';
    }

    if (['+', '-', '/', '*'].includes(data) &&tempNumber) {
        operationType = data;
        history.push(tempNumber, operationType);
        tempNumber = '';
    }

    if (data === 'clear') {
        history = [];
    }

    if (data === '+' && tempNumber) {
        operationType = data;
        history.push(tempNumber, '+');
        tempNumber = '';
    }

    if(data === '=') {
        history.push(tempNumber);
        const total = calculate(history);
        renderTotal(total)
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

//подчет конечного значения
function calculate(historyArray) {
    let total = 0;

    historyArray.forEach((item, idx) => {
        item = parseFloat(item)
        if(idx === 0) {
            total = item;
        }

        if(idx - 2 > 0) {
            const prevItem= historyArray[idx - 1]
            if(item > 0) {
                if (prevItem === '+') {
                    total = total + item;
                }

                if (prevItem === '-') {
                    total = total - item;
                }

                if (prevItem === '*') {
                    total = total + item;
                }

                if (prevItem === '*') {
                    total = total + item;
                }

                if (prevItem === '%') {
                    total = total / 100 * item;
                }
            }
        }
    })
    return total;
}