import { TransactionType } from './TransactionType';
let balance = JSON.parse(localStorage.getItem('balance')) || 0;
const transactions = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
}) || [];
function debit(amount) {
    if (amount <= 0) {
        throw new Error('El valor a ser debitado debe ser mayor que cero!');
    }
    if (amount > balance) {
        throw new Error('Saldo insuficiente!');
    }
    balance -= amount;
    localStorage.setItem('balance', balance.toString());
}
function deposit(amount) {
    if (amount <= 0) {
        throw new Error('El valor a ser depositado debe ser mayor que cero!');
    }
    balance += amount;
    localStorage.setItem('balance', balance.toString());
}
const Account = {
    getBalance() {
        return balance;
    },
    getAccessDate() {
        return new Date();
    },
    getTransactionGroups() {
        const transactionGroups = [];
        const transactionList = structuredClone(transactions);
        const sortedTransactions = transactionList.sort((t1, t2) => t2.date.getTime() - t1.date.getTime());
        let currentGroupLabel = '';
        for (let transaction of sortedTransactions) {
            let groupLabel = transaction.date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
            if (currentGroupLabel !== groupLabel) {
                currentGroupLabel = groupLabel;
                transactionGroups.push({
                    label: groupLabel,
                    transactions: [],
                });
            }
            transactionGroups.at(-1).transactions.push(transaction);
        }
        return transactionGroups;
    },
    registerTransaction(newTransaction) {
        if (newTransaction.transactionType == TransactionType.DEPOSIT) {
            deposit(newTransaction.value);
        }
        else if (newTransaction.transactionType == TransactionType.TRANSFER ||
            newTransaction.transactionType == TransactionType.BILL_PAYMENT) {
            debit(newTransaction.value);
            newTransaction.value *= -1;
        }
        else {
            throw new Error('Tipo de Transacción es inválido!');
        }
        transactions.push(newTransaction);
        console.log(this.getTransactionGroups());
        localStorage.setItem('transactions', JSON.stringify(transactions));
    },
};
export default Account;
