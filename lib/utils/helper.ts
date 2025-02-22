export function timestampConvertDate(time: string | number | Date) {
  const dateObj = new Date(time)
  const year=dateObj.getFullYear()
  const month = dateObj.getMonth()+1
  const date = dateObj.getDate() 
  // const hours = dateObj.getHours()
  // const minutes = dateObj.getMinutes()

  return {year,month, date}
}