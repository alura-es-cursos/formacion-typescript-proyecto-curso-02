export class Storage {
  private constructor() {}

  static save(key: string, value: any): void {
    const valueToString = JSON.stringify(value)
    localStorage.setItem(key, valueToString)
  }

  static read(key: string, restore?: (this: any, key: string, value: any) => any) {
    const value = localStorage.getItem(key)

    if (value === null) {
      return null
    }

    if (restore) {
      return JSON.parse(value, restore)
    }

    return JSON.parse(value)
  }
}
