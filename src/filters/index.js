const translateDictValue = (value, dict) => {
  if (!dict || dict.length === 0) {
    return ''
  }
  const target = dict.find(item => item.value === value)
  return target ? target.label : ''
}

export {
  translateDictValue,
}