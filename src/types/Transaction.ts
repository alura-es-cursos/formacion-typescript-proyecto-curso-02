import { TransactionType } from './TransactionType.js'

export type Transaction = {
  transactionType: TransactionType
  value: number
  date: Date
}
