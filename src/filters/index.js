import util from '@/providers/utils'

const translateDictValue = (value, dict) => {
  if (!dict || dict.length === 0) {
    return ''
  }
  const target = dict.find(item => item.value === value)
  return target ? target.label : ''
}

const formatDate = util.formatDate
const formatDateRange = util.formatDateRange

export {
  translateDictValue,
  formatDate,
  formatDateRange
}