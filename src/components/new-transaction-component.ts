import { Transaction } from '../types/Transaction'
import { TransactionType } from '../types/TransactionType'
import BalanceComponent from './balance-component'
import Account from '../types/Account'
import StatementComponent from './statement-component'

const elementForm = document.querySelector(
  '.block-new-transaction form'
) as HTMLFormElement
elementForm.addEventListener('submit', function (event) {
  try {
    event.preventDefault()
    if (!elementForm.checkValidity()) {
      alert('¡Por favor, complete todos los campos de la transacción!')
      return
    }

    const inputTransactionType = elementForm.querySelector(
      '#transactionType'
    ) as HTMLSelectElement
    const inputAmount = elementForm.querySelector('#value') as HTMLInputElement
    const inputDate = elementForm.querySelector('#date') as HTMLInputElement

    let transactionType: TransactionType =
      inputTransactionType.value as TransactionType
    let amount: number = inputAmount.valueAsNumber
    let date: Date = new Date(inputDate.value + ' 00:00:00')

    const newTransaction: Transaction = {
      transactionType: transactionType,
      value: amount,
      date: date,
    }

    Account.registerTransaction(newTransaction)
    BalanceComponent.update()
    StatementComponent.update()
    elementForm.reset()
  } catch (error) {
    alert(error.message)
  }
})
