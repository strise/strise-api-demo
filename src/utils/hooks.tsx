import React from 'react'

export const useLocalStorageState = <T extends string>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState<T>(() => window.localStorage.getItem(key) as T ?? defaultValue)
  return [value, (valueOrFn: React.SetStateAction<T>) => {
    if (typeof valueOrFn === 'function') {
      setValue((prevValue) => {
        const newValue = valueOrFn(prevValue)
        window.localStorage.setItem(key, newValue)
        return newValue
      })
    } else {
      window.localStorage.setItem(key, valueOrFn)
      setValue(valueOrFn)
    }
  }]
}