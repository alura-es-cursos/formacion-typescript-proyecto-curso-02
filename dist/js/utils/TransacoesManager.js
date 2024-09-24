const transactions = JSON.parse(localStorage.getItem('transactions'), (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
}) || [];
export const TransactionsManager = {
    registerTransaction: (newTransaction) => {
        transactions.push(newTransaction);
    },
    getTransaction: () => {
        return Array.from(transactions);
    }
};
