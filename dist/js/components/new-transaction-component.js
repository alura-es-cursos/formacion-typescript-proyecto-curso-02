import BalanceComponent from './balance-component';
import Account from '../types/Account';
import StatementComponent from './statement-component';
const elementForm = document.querySelector('.block-new-transaction form');
elementForm.addEventListener('submit', function (event) {
    try {
        event.preventDefault();
        if (!elementForm.checkValidity()) {
            alert('¡Por favor, complete todos los campos de la transacción!');
            return;
        }
        const inputTransactionType = elementForm.querySelector('#transactionType');
        const inputAmount = elementForm.querySelector('#value');
        const inputDate = elementForm.querySelector('#date');
        let transactionType = inputTransactionType.value;
        let amount = inputAmount.valueAsNumber;
        let date = new Date(inputDate.value + ' 00:00:00');
        const newTransaction = {
            transactionType: transactionType,
            value: amount,
            date: date,
        };
        Account.registerTransaction(newTransaction);
        BalanceComponent.update();
        StatementComponent.update();
        elementForm.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
