import { Transaction } from './Transaction'
import { GroupTransaction } from './GroupTransaction'
import { TransactionType } from './TransactionType'

export class Account {
  // atributos - datos
  name: string
  balance: number
  transactions: Transaction[]

  constructor(name: string) {
    this.name = name

    const savedBalance = localStorage.getItem('balance')
    this.balance = savedBalance ? JSON.parse(savedBalance) : 0

    const savedTransactions = localStorage.getItem('transactions')
    this.transactions = savedTransactions
      ? JSON.parse(savedTransactions, (key: string, value: string) => {
          if (key === 'date') {
            return new Date(value)
          }

          return value
        })
      : []
  }

  // metodos - funciones

  getBalance() {
    return this.balance
  }

  getAccessDate(): Date {
    return new Date()
  }

  debit(value: number): void {
    if (value <= 0) {
      throw new Error('El valor a ser debitado debe ser mayor que cero!')
    }
    if (value > this.balance) {
      throw new Error('Saldo insuficiente!')
    }

    this.balance -= value
    localStorage.setItem('balance', this.balance.toString())
  }

  deposit(value: number): void {
    if (value <= 0) {
      throw new Error('El valor a ser depositado debe ser mayor que cero!')
    }

    this.balance += value
    localStorage.setItem('balance', this.balance.toString())
  }

  getTransactionGroups(): GroupTransaction[] {
    const transactionGroups: GroupTransaction[] = []
    const transactionList: Transaction[] = structuredClone(this.transactions)
    const sortedTransactions: Transaction[] = transactionList.sort(
      (t1, t2) => t2.date.getTime() - t1.date.getTime()
    )
    let currentGroupLabel: string = ''

    for (let transaction of sortedTransactions) {
      let groupLabel: string = transaction.date.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric',
      })
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
  }

  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType == TransactionType.DEPOSIT) {
      this.deposit(newTransaction.value)
    } else if (
      newTransaction.transactionType == TransactionType.TRANSFER ||
      newTransaction.transactionType == TransactionType.BILL_PAYMENT
    ) {
      this.debit(newTransaction.value)
      newTransaction.value *= -1
    } else {
      throw new Error('Tipo de Transacción es inválido!')
    }

    this.transactions.push(newTransaction)
    console.log(this.getTransactionGroups())
    localStorage.setItem('transactions', JSON.stringify(this.transactions))
  }
}

export default new Account('Juana Ferreira')

export class AccountPremium extends Account {
  premiumBonus: number
  constructor(name: string, bonus: number) {
    super(name)
    this.premiumBonus = bonus
  }

  registerTransaction(newTransaction: Transaction): void {
    if (newTransaction.transactionType === TransactionType.DEPOSIT) {
      newTransaction.value += this.premiumBonus
    }
    super.registerTransaction(newTransaction)
  }
}

const luis = new AccountPremium('Luis López', 100)
