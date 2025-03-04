export function timestampConvertDate(time: string | number | Date) {
  const date = new Date(time)
  return date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/')
}