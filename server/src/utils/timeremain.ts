function timeDifference(now, savedDate) {
  const towDays = 60 * 60 * 48 * 1000
  const valid = now - savedDate < towDays
  return valid
}

export default timeDifference
