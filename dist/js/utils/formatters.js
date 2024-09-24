import { FormatDate } from '../types/FormatDate.js';
export function formatCurrency(valor) {
    return valor.toLocaleString('es-ES', { style: 'currency', currency: 'USD' });
}
export function formatDate(date, format = FormatDate.DEFAULT) {
    if (format === FormatDate.WEEKDAY_DAY_MONTH_YEAR) {
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    else if (format === FormatDate.DAY_MONTH) {
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
        });
    }
    return date.toLocaleDateString('es-ES');
}
