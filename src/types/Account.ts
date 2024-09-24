import { Transaction } from './Transaction.js'
import { GroupTransaction } from './GroupTransaction.js'
import { TransactionType } from './TransactionType.js'
import { Storage } from './Storage.js'

export class Account {
  // atributos - datos
  protected name: string
  protected balance: number = Storage.read<number>('balance') || 0
  private transactions: Transaction[] =
    Storage.read<Transaction[]>(
      'transactions',
      (key: string, value: string) => {
        if (key === 'date') {
          return new Date(value)
        }

        return value
      }
    ) || []

  constructor(name: string) {
    this.name = name
  }

  // metodos - funciones

  getName() {
    return this.name
  }

  getBalance() {
    return this.balance
  }

  getAccessDate(): Date {
    return new Date()
  }

  private debit(value: number): void {
    if (value <= 0) {
      throw new Error('El valor a ser debitado debe ser mayor que cero!')
    }
    if (value > this.balance) {
      throw new Error('Saldo insuficiente!')
    }

    this.balance -= value
    Storage.save('balance', this.balance.toString())
  }

  private deposit(value: number): void {
    if (value <= 0) {
      throw new Error('El valor a ser depositado debe ser mayor que cero!')
    }

    this.balance += value
    Storage.save('balance', this.balance.toString())
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
    Storage.save('transactions', JSON.stringify(this.transactions))
  }
}

export default new Account('Juana Ferreira')

export class AccountPremium extends Account {
  protected premiumBonus: number
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
