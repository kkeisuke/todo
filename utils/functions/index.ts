const TIME_ZONE = 9

export const formatDateTime = (dateString: string): string => {
  const date = getDate(dateString)
  if (isInvalidDate(date)) {
    return dateString
  }
  return new Intl.DateTimeFormat('ja', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date)
}

export const formatDateTimeForInput = (dateString: string): string => {
  const date = getDate(dateString)
  if (isInvalidDate(date)) {
    return dateString
  }
  return toISOStringWithTimezone(date).slice(0, 16)
}

function getDate(dateString: string) {
  const date = new Date(dateString)
  if (date.getTimezoneOffset() === 0) {
    date.setHours(date.getHours() + TIME_ZONE)
  }
  return date
}

function isInvalidDate(date: Date) {
  return Number.isNaN(date.getTime())
}

function toISOStringWithTimezone(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString()
}
