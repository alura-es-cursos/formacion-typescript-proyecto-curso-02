import { Transaction } from './Transaction'

export type GroupTransaction = {
  label: string
  transactions: Transaction[]
}
