import { checkResponseCode } from './responseCode'
import getTimeStampId from '~src/tool/getTimeStampId'
import * as Types from '../types'
import Axios from 'axios'
import store from '../'

const axiosRequest = Axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})
const apiMap = {
}

export default function callApi (apiName, params) {
  return new Promise((resolve, reject) => {
    store.dispatch(Types.OPEN_API_LOADING)
    apiMap[apiName](params).then(res => {
      store.dispatch(Types.CLOSE_API_LOADING)
      console.log(res.data)
      const codeResult = checkResponseCode(res.data.code)
      if (codeResult.isSuccess) {
        resolve(res)
      } else {
        reject(codeResult)
      }
    }).catch(() => {
      store.dispatch(Types.CLOSE_API_LOADING)
      store.dispatch(Types.OPEN_TOAST, { content: 'http response error' })
    })
  })
}

const HTTP = 'http://fitmap.deexcul.com'

apiMap[Types.FETCH_CODE_GET] = function (phone) {
  return axiosRequest.get(`${HTTP}/api/code?cellphone=${phone}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_GET] = function () {
  return axiosRequest.get(`${HTTP}/api/users?t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_UPDATE] = function ({ data }) {
  console.log(data)
  return axiosRequest.post(`${HTTP}/api/users`,
    JSON.stringify({
      t: getTimeStampId(),
      ...data
    })
  )
}

apiMap[Types.FETCH_USERS_OAUTH] = function (data) {
  return axiosRequest.get(`${HTTP}/api/users/oauth?code=${data.code}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_COLLECTS_GET] = function ({ data }) {
  const params = {
    ...data,
    t: getTimeStampId()
  }
  return axiosRequest.get(`${HTTP}/api/users/collects`, {
    params: params
  })
}

apiMap[Types.FETCH_USERS_COLLECTS_POST] = function ({ type, id }) {
  return axiosRequest.post(`${HTTP}/api/users/collect`,
    JSON.stringify({
      id: getTimeStampId(),
      type: type,
      target_id: id
    })
  )
}

apiMap[Types.FETCH_USERS_COLLECTS_DEL] = function ({ type, id }) {
  return axiosRequest.post(`${HTTP}/api/users/un_collect`,
  JSON.stringify({
    t: getTimeStampId(),
    type: type,
    target_id: id
  })
)
}

apiMap[Types.FETCH_MAP_SEARCH] = function (data) {
  return axiosRequest.get(
    `${HTTP}/api/map/search?t=${getTimeStampId()}` +
    `&type=${data.type}` +
    `&category=${data.category}` +
    `&keyword=${data.keyword}`
  )
}

apiMap[Types.FETCH_DETAIL] = function ({ type, id }) {
  return axiosRequest.get(`${HTTP}/api/${type}/${id}?t=${getTimeStampId()}`)
}

function localhost () {
  if (window.location.hostname === 'localhost') {
    
  }
}
