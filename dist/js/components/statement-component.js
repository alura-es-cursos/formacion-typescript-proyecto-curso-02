import Account from '../types/Account.js';
import { FormatDate } from '../types/FormatDate.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';
const transactionRecordElement = document.querySelector('.statement .register-transactions');
renderStatement();
function renderStatement() {
    const transactionGroups = Account.getTransactionGroups();
    transactionRecordElement.innerHTML = '';
    let htmlTransactionRecord = '';
    for (let transactionGroup of transactionGroups) {
        let htmlTransactionItem = '';
        for (let transaction of transactionGroup.transactions) {
            htmlTransactionItem += `
                  <div class="transaction-item">
                    <div class="transaction-info">
                        <span class="type">${transaction.transactionType}</span>
                        <strong class="value">${formatCurrency(transaction.value)}</strong>
                    </div>
                    <time class="date">${formatDate(transaction.date, FormatDate.DAY_MONTH)}</time>
                </div>
            `;
        }
        htmlTransactionRecord += `
            <div class="transactions-group">
                <strong class="month-group">${transactionGroup.label}</strong>
                ${htmlTransactionItem}
            </div>
        `;
    }
    if (htmlTransactionRecord === '') {
        htmlTransactionRecord = '<div>No hay transacciones registradas.</div>';
    }
    transactionRecordElement.innerHTML = htmlTransactionRecord;
}
const StatementComponent = {
    update() {
        renderStatement();
    },
};
export default StatementComponent;
