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

export default function callApi (apiName, params, closeLoading) {
  return new Promise((resolve, reject) => {
    if (!closeLoading) {
      store.dispatch(Types.OPEN_API_LOADING)
    }
    const token = store.state.user.user.token
    params = params || {}
    Object.assign(params, { token: token })
    console.log(params)
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
// const token = store.state.user.user.token

apiMap[Types.FETCH_CODE_GET] = function (phone) {
  return axiosRequest.get(`${HTTP}/api/code?cellphone=${phone}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_GET] = function (data) {
  return axiosRequest.get(`${HTTP}/api/users?token=${data.token}t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_UPDATE] = function ({ data }) {
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

apiMap[Types.FETCH_USERS_COLLECTS_POST] = function (data) {
  return axiosRequest.post(`${HTTP}/api/users/collect`,
    JSON.stringify({
      id: getTimeStampId(),
      type: data.type,
      target_id: data.id,
      token: data.token
    })
  )
}

apiMap[Types.FETCH_USERS_COLLECTS_DEL] = function (data) {
  return axiosRequest.post(`${HTTP}/api/users/un_collect`,
  JSON.stringify({
    t: getTimeStampId(),
    type: data.type,
    target_id: data.id,
    token: data.token
  })
)
}

apiMap[Types.FETCH_MAP_SEARCH] = function (data) {
  return axiosRequest.get(
    `${HTTP}/api/map/search?t=${getTimeStampId()}` +
    `&type=${data.type}` +
    `&category=${data.category}` +
    `&keyword=${data.keyword}` +
    `&lng=${data.lng}` +
    `&lat=${data.lat}`
  )
}

apiMap[Types.FETCH_DETAIL] = function ({ type, id }) {
  return axiosRequest.get(`${HTTP}/api/${type}/${id}?t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_VAILD_CODE] = function (data) {
  return axiosRequest.post(`${HTTP}/api/code`,
    JSON.stringify({
      t: getTimeStampId(),
      ...data
    })
  )
}

function localhost () {
  if (window.location.hostname === 'localhost') {
    
  }
}
