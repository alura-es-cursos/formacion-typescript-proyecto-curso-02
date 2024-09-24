import { Transaction } from './Transaction.js'

export type GroupTransaction = {
  label: string
  transactions: Transaction[]
}
