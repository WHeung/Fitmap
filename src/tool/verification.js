// @config Array
/*
example
[{
  case: 'noBlank',
  data: [this.leaveFlightNo, this.backFlightNo, this.price],
  errorMsg:['请填写去程航班号', '请填写返程航班号', '请填写个人票价']
},
{
  case: 'flightNo',
  data: [this.leaveFlightNo, this.backFlightNo]
  errorMsg:['去程航班号填写有误，例子：CZ361', '返程航班号填写有误，例子：CZ364']
}]
*/

const caseMap = {}

export default function valid (data, config) {
  const result = {
    error: {
      count: 0,
      msg: []
    }
  }

  config.every(valid => {
    if (caseMap[valid.case]) {
      valid.data.every((key, i) => {
        const val = data[key]
        if (!caseMap[valid.case](val)) {
          result.error.count += 1
          result.error.msg.push(valid.errorMsg[i])
        }
        return true
      })
    }
    return true
  })

  return result
}

caseMap.noBlank = function (str) {
  if (typeof str === 'number' || typeof str === 'string') {
    return /.+/.test(str + '')
  } else {
    return false
  }
}

caseMap.flightNo = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  return /^\d?[a-z]{1,3}\d{3,4}$/i.test(String(str))
}

caseMap.dateYYYYMMDD = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  return /^\d{4}[-]\d{2}[-]\d{2}$/i.test(String(str))
}

caseMap.price = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  return /^[1-9]\d{0,6}$/.test(String(str))
}

caseMap.mobilePhone = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  return /^1[3|4|5|7|8][0-9]{9}$/.test(String(str))
}

caseMap.email = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  if (String(str).length > 40) {
    return false
  }
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(String(str))
}

caseMap.englishName = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  return /^[a-z]{1,12}$/i.test(String(str))
}

caseMap.noInfant = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  const today = new Date()
  const cYear = today.getFullYear() - 2
  const cMonth = today.getMonth()
  const cDate = today.getDate()
  const twoYearAgo = new Date(cYear, cMonth, cDate)
  return (new Date(str)) < twoYearAgo
}

caseMap.name = function (str) {
  if (!caseMap.noBlank(str)) {
    return false
  }
  return String(str).length <= 10
}
