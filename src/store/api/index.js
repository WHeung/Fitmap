import { checkResponseCode } from './responseCode'
import getTimeStampId from '~src/tool/getTimeStampId'
import weixinReload from '~src/tool/weixinReload.js'
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
    if (params && typeof params === 'object') {
      Object.assign(params, { token: token })
    }
    apiMap[apiName](params).then(res => {
      store.dispatch(Types.CLOSE_API_LOADING)
      console.log(res.data)
      if (res.data.code === 4000) {
        document.cookie = 'token=;expires=Tue, 08 Aug 2017 00:00:00 GMT;'
        const location = window.location
        const hash = location.hash.replace(/[\?|\&]redirected\=1/, '')
        location.replace(location.origin + location.pathname + hash)
        // weixinReload()
        return
      }
      const codeResult = checkResponseCode(res.data.code)
      if (codeResult.isSuccess) {
        resolve(res)
      } else {
        codeResult.data = res.data
        if (res.data.message) {
          store.dispatch(Types.OPEN_TOAST, { content: codeResult.data.message })
        }
        reject(codeResult)
      }
    }).catch(() => {
      store.dispatch(Types.CLOSE_API_LOADING)
      store.dispatch(Types.OPEN_TOAST, { content: 'http response error' })
    })
  })
}

let HTTP = 'http://api.fitmap.cn'
if (/localhost/.test(window.location.origin)) {
  HTTP = 'https://easy-mock.com/mock/59ec3faa1a3fcd087e699845/Fitmap'
}
// const token = store.state.user.user.token

apiMap[Types.FETCH_CODE_GET] = function (data) {
  return axiosRequest.get(`${HTTP}/api/code?cellphone=${data.cellphone}&token=${data.token}t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_GET] = function (data) {
  return axiosRequest.get(`${HTTP}/api/users?token=${data.token}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_UPDATE] = function ({ data, token }) {
  return axiosRequest.post(`${HTTP}/api/users`,
    JSON.stringify({
      ...data,
      token,
      t: getTimeStampId()
    })
  )
}

apiMap[Types.FETCH_USERS_OAUTH] = function (data) {
  return axiosRequest.get(`${HTTP}/api/users/oauth?code=${data.code}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_COLLECTS_GET] = function ({ data, token }) {
  const params = {
    ...data,
    token,
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
    `&token=${data.token}` +
    `&type=${data.type}` +
    `&category=${data.category}` +
    `&keyword=${data.keyword}` +
    `&lng=${data.lng}` +
    `&lat=${data.lat}` +
    `&page=${data.page}`
  )
}

apiMap[Types.FETCH_DETAIL] = function ({ type, id, token }) {
  return axiosRequest.get(`${HTTP}/api/${type}/${id}?token=${token}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_VAILD_CODE] = function ({ data, token }) {
  return axiosRequest.post(`${HTTP}/api/code`,
    JSON.stringify({
      t: getTimeStampId(),
      token,
      ...data
    })
  )
}

apiMap[Types.FETCH_WEIXIN_CONFIG] = function (data) {
  return axiosRequest.get(`${HTTP}/api/wechat_config?token=${data.token}&t=${getTimeStampId()}`)
}
