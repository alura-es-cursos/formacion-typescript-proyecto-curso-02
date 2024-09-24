import { TransactionType } from './TransactionType'

export type Transaction = {
  transactionType: TransactionType
  value: number
  date: Date
}
