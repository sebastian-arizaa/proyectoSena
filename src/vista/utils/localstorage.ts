type LocalStorageData = {isLogged: boolean}

export const getLocalStorage = (item: string) => {
  let data: LocalStorageData = JSON.parse(localStorage.getItem(item) ?? '{}')
  if(!Object.keys(data).length) {
    data = {isLogged: false}
    localStorage.setItem(item, JSON.stringify(data))
  }
  return data
}

export const setLocalStorage = (item: string, value: LocalStorageData) => {
  // let data: LocalStorageData = JSON.parse(localStorage.getItem(item) ?? '{}')
  // console.log('from setlocatlroeage:', value, data)
  // if(!Object.keys(data).length) {
  //   console.log('isnot here')
  //   data = value
  //   localStorage.setItem(item, JSON.stringify(data))
  // }
  //   localStorage.setItem(item, JSON.stringify(data))
  //   console.log(' hereeee!isnot here')
  localStorage.setItem(item, JSON.stringify(value))

}