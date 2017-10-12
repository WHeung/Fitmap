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
      const codeResult = checkResponseCode(res.data.state.code)
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

apiMap[Types.FETCH_CODE_GET] = function (phone) {
  return axiosRequest.get(`/code?cellphone=${phone}&t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_GET] = function () {
  return axiosRequest.get(`/users?t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_UPDATE] = function (data) {
  return axiosRequest.put(`/users`,
    JSON.stringify({
      id: getTimeStampId(),
      data
    })
  )
}

apiMap[Types.FETCH_USERS_OAUTH] = function (data) {
  return axiosRequest.post(`/users/oauth`,
    JSON.stringify({
      id: getTimeStampId(),
      data
    })
  )
}

apiMap[Types.FETCH_USERS_COLLECTS_GET] = function () {
  return axiosRequest.get(`/users/collects?t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_USERS_COLLECTS_POST] = function (data) {
  return axiosRequest.post(`/users/collects`,
    JSON.stringify({
      id: getTimeStampId(),
      data
    })
  )
}

apiMap[Types.FETCH_USERS_COLLECTS_DEL] = function () {
  return axiosRequest.delete(`/users/collects?t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_MAP_SEARCH] = function () {
  return axiosRequest.get(`/map/search?t=${getTimeStampId()}`)
}

apiMap[Types.FETCH_DETAIL] = function ({ type, id }) {
  return axiosRequest.get(`/${type}/${id}?t=${getTimeStampId()}`)
}
