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
        tempNumber = ''
    }
}