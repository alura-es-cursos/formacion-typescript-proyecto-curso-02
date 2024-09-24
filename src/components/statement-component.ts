import Account from '../types/Account'
import { FormatDate } from '../types/FormatDate'
import { GroupTransaction } from '../types/GroupTransaction'
import { formatCurrency, formatDate } from '../utils/formatters'

const transactionRecordElement: HTMLElement = document.querySelector(
  '.statement .register-transactions'
)

renderStatement()
function renderStatement(): void {
  const transactionGroups: GroupTransaction[] = Account.getTransactionGroups()
  transactionRecordElement.innerHTML = ''
  let htmlTransactionRecord: string = ''

  for (let transactionGroup of transactionGroups) {
    let htmlTransactionItem: string = ''
    for (let transaction of transactionGroup.transactions) {
      htmlTransactionItem += `
                  <div class="transaction-item">
                    <div class="transaction-info">
                        <span class="type">${transaction.transactionType}</span>
                        <strong class="value">${formatCurrency(
                          transaction.value
                        )}</strong>
                    </div>
                    <time class="date">${formatDate(
                      transaction.date,
                      FormatDate.DAY_MONTH
                    )}</time>
                </div>
            `
    }

    htmlTransactionRecord += `
            <div class="transactions-group">
                <strong class="month-group">${transactionGroup.label}</strong>
                ${htmlTransactionItem}
            </div>
        `
  }

  if (htmlTransactionRecord === '') {
    htmlTransactionRecord = '<div>No hay transacciones registradas.</div>'
  }

  transactionRecordElement.innerHTML = htmlTransactionRecord
}

const StatementComponent = {
  update(): void {
    renderStatement()
  },
}

export default StatementComponent
