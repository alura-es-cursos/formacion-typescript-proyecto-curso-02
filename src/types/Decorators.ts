export function DebitValidation(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  descriptor.value = function (debitValue: number) {
    if (debitValue <= 0) {
      throw new Error('El valor a ser debitado debe ser mayor que cero!')
    }

    if (debitValue > this.balance) {
      throw new Error('Saldo insuficiente!')
    }

    return originalMethod.apply(this, [debitValue])
  }

  return descriptor
}

export function DepositValidation(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  descriptor.value = function (depositValue: number) {
    if (depositValue <= 0) {
      throw new Error('El valor a ser depositado debe ser mayor que cero!')
    }

    return originalMethod.apply(this, [depositValue])
  }

  return descriptor
}