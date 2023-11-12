export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  // Invalid Date
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  return new Intl.DateTimeFormat('ja', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date)
}

export const formatDateTimeForInput = (dateString: string): string => {
  const date = new Date(dateString)
  // Invalid Date
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().slice(0, 16)
}
