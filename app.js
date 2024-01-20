const calculator = document.querySelector('.calculator');

calculator.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('col')) {
        console.log('col');
    }
})