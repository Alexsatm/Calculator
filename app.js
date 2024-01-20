const calculator = document.querySelector('.calculator');
const history = [];
let tempNumber = '';
let operationType;

calculator.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('col')) {
        const data = target.dataset.type;
        operation(data);
        console.log(tempNumber);
    }
})
