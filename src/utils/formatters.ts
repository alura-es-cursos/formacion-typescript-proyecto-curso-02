import { FormatDate } from '../types/FormatDate.js'

export function formatCurrency(valor: number): string {
  return valor.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
}

export function formatDate(
  date: Date,
  format: FormatDate = FormatDate.DEFAULT
): string {
  if (format === FormatDate.WEEKDAY_DAY_MONTH_YEAR) {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } else if (format === FormatDate.DAY_MONTH) {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
    })
  }

  return date.toLocaleDateString('es-ES')
}
