import { Transaction } from './Transaction'
import { TransactionType } from './TransactionType'
import { GroupTransaction } from './GroupTransaction'

let balance: number = JSON.parse(localStorage.getItem('balance')) || 0
const transactions: Transaction[] =
  JSON.parse(
    localStorage.getItem('transactions'),
    (key: string, value: string) => {
      if (key === 'date') {
        return new Date(value)
      }

      return value
    }
  ) || []

function debit(value: number): void {
  if (value <= 0) {
    throw new Error('El valor a ser debitado debe ser mayor que cero!')
  }
  if (value > balance) {
    throw new Error('Saldo insuficiente!')
  }

  balance -= value
  localStorage.setItem('balance', balance.toString())
}

function deposit(value: number): void {
  if (value <= 0) {
    throw new Error('El valor a ser depositado debe ser mayor que cero!')
  }

  balance += value
  localStorage.setItem('balance', balance.toString())
}

const Account = {
  getBalance() {
    return balance
  },

  getAccessDate(): Date {
    return new Date()
  },

  getTransactionGroups(): GroupTransaction[] {
    const transactionGroups: GroupTransaction[] = []
    const transactionList: Transaction[] = structuredClone(transactions)
    const sortedTransactions: Transaction[] = transactionList.sort(
      (t1, t2) => t2.date.getTime() - t1.date.getTime()
    )
    let currentGroupLabel: string = ''

    for (let transaction of sortedTransactions) {
      let groupLabel: string = transaction.date.toLocaleDateString(
        'es-ES',
        { month: 'long', year: 'numeric' }
      )
      if (currentGroupLabel !== groupLabel) {
        currentGroupLabel = groupLabel
        transactionGroups.push({
          label: groupLabel,
          transactions: [],
        })
      }
      transactionGroups.at(-1).transactions.push(transaction)
    }

    return transactionGroups
  },

  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType == TransactionType.DEPOSIT) {
      deposit(newTransaction.value)
    } else if (
      newTransaction.transactionType == TransactionType.TRANSFER ||
      newTransaction.transactionType == TransactionType.BILL_PAYMENT
    ) {
      debit(newTransaction.value)
      newTransaction.value *= -1
    } else {
      throw new Error('Tipo de Transacción es inválido!')
    }

    transactions.push(newTransaction)
    console.log(this.getTransactionGroups())
    localStorage.setItem('transactions', JSON.stringify(transactions))
  },
}

export default Account