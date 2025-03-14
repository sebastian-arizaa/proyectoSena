import { useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage'

export function useLocalStorage() {
  const [localStorageData, setLocalStorageData] = useState(getLocalStorage('proyectoSena'))

  const saveItemData = (item, value) => {
    console.log('from useLocaltstore', item, value)
    setLocalStorage(item, value)
    setLocalStorageData(value)
  }

  return {localStorageData, saveItemData} 
}
