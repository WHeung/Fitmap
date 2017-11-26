import getTimeStampId from './getTimeStampId'
import { isWeixin } from './containerDetect'
import { outRouteParams } from './inRouteAndOutRoute'
import _ from 'underscore'

export default function weixinReload () {
  if (isWeixin()) {
    const location = window.location
    const params = outRouteParams(location.search)
    Object.assign(params, { t: getTimeStampId() })
    const searchList = _.map(params, function (val, key) {
      return `${key}=${val}`
    })
    const search = '?' + searchList.join('&')
    location.href = location.origin +
      location.pathname +
      search +
      `&t=${getTimeStampId()}` +
      location.hash
  }
}

