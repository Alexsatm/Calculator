const calculator = document.querySelector('.calculator');
const clear = document.getElementById('clear');
let allHistory = [];
let history = [];
let tempNumber = '';
let operationType = '';
let isPersent = false;
let isEqual = false;

calculator.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('col')) {
        const data = target.dataset.type;
        const totalBlock = calculator.querySelector('.total');
        const historyBlock = calculator.querySelector('.history')
        operationTypeHandling(date);
        totalBlock.innerHTML = tempNumber;
        historyBlock.innerHTML = renderHistory(history)
        historyPanelRender(allHistory);
    }
})


//Обработка клавиш нажатых на клавиатуре
function operationTypeHandling(data) {
    if (data !== 'clear' & data !== 'history') {
        clear.innerHTML = 'C';
    }

    if(data >= 0) {
        operationType = 'number';
        tempNumber = tempNumber === '0' ? data: tempNumber + data;
    }

    if (data === 'float') {
        operationType = 'number';
        if(!/\./.test(tempNumber)) {
            if(tempNumber) {
                tempNumber = tempNumber + '.'
            } else {
                tempNumber = '0.'
            }
        }
    }

    if (data === 'delete' && operationType === 'number') {
        tempNumber = tempNumber.substring(0, tempNumber.length - 1);
        tempNumber = tempNumber ? tempNumber: '0';
        isPersent =false;
    }

    if (['+', '-', '/', '*'].includes(data) && tempNumber) {
        operationType = data;
        history.push(tempNumber, operationType);
        tempNumber = '';
        isPersent = false
    }

    if (data === 'clear') {
        history = [];
        tempNumber = '0';
        isPersent = false;
        if(clear.innerText === 'C') {
            clear.innerHTML = 'CA';
        } else {
            clear.innerHTML = 'C';
            allHistory = []
        }
    }

    if (data === 'history') {
        openHistoryPanel()
    }

    if (data === '%') {
        history.push(tempNumber);
        isPersent = true;
        isEqual = false;
        tempNumber = calculate(history, isPersent, isEqual);
    }

    if(data === '=') {
        history.push(tempNumber);
        isEqual = true;
        tempNumber = calculate(history, isPersent, isEqual);
        history = [];
    }

    if (data === '+' && tempNumber) {
        operationType = data;
        history.push(tempNumber, '+');
        tempNumber = '';
    }
}

//отрисовка текущего значения на экране калькулятора
function renderTotal(value) {
    const totalBlock = calculator.querySelector('.total');
    totalBlock.innerHTML = value;
}


//форматирование HTML кода вывода блока истории операций
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