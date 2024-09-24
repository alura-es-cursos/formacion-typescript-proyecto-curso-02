import { formatDate, formatCurrency } from '../utils/formatters'
import { FormatDate } from '../types/FormatDate'
import Account from '../types/Account'

const balanceElement = document.querySelector(
  '.balance-value .value'
) as HTMLElement
const accessDateElement = document.querySelector(
  '.block-balance time'
) as HTMLElement

if (accessDateElement != null) {
  accessDateElement.textContent = formatDate(
    Account.getAccessDate(),
    FormatDate.WEEKDAY_DAY_MONTH_YEAR
  )
}

renderBalance()
function renderBalance(): void {
  if (balanceElement != null) {
    balanceElement.textContent = formatCurrency(Account.getBalance())
  }
}

const BalanceComponent = {
  update() {
    renderBalance()
  },
}

export default BalanceComponent