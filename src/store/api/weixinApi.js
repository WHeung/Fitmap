import wx from 'weixin-js-sdk'
import { isWeixin } from '~src/tool/containerDetect'

export function weixinConfig (config) {
  if (isWeixin()) {
    wx.config({
      // debug: true,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: config.jsApiList
    })
  }
}

export function weixinReady (apiLsit, callback) { // Array
  wx.ready(function () {
    callback && callback()
  })
}

export function weixinShare (shareData, callback) {
  if (isWeixin()) {
    if (typeof shareData.txtIndex !== 'number') {
      shareData.txtIndex = 0
    }
    wx.onMenuShareTimeline({ // 分享到朋友圈
      title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      success: function () {
        callback && callback({
          index: shareData.txtIndex,
          destination: 'TIMELINE'
        })
      }
    })
    wx.onMenuShareAppMessage({ // 分享给朋友
      desc: shareData.desc,
      title: shareData.title,
      link: shareData.link,
      imgUrl: shareData.imgUrl,
      success: function () {
        callback && callback({
          index: shareData.txtIndex,
          destination: 'APP_MESSAGE'
        })
      }
    })
  }
}

export function weixinGetLocation (data, callback) {
  if (isWeixin()) {
    wx.ready(function () {
      wx.getLocation({
        type: data.type || 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          callback && callback({
            lat: res.latitude, // 纬度，浮点数，范围为90 ~ -90
            lng: res.longitude // 经度，浮点数，范围为180 ~ -180。
          })
        }
      })
    })
  }
}

export function onlyLoacation (data, callback) {
  if (isWeixin()) {
    wx.checkJsApi({
      jsApiList: ['getLocation'],
      success: function ({ checkResult, errMsg }) {
        console.info(checkResult)
        const result = JSON.parse(checkResult)
        if (result && result.geoLocation === true) {
          wx.getLocation({
            type: data.type || 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              callback && callback({
                lat: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                lng: res.longitude // 经度，浮点数，范围为180 ~ -180。
              })
            }
          })
        } else {
          console.warn(errMsg)
          weixinReady(function () {
            wx.getLocation({
              type: data.type || 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                callback && callback({
                  lat: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                  lng: res.longitude // 经度，浮点数，范围为180 ~ -180。
                })
              }
            })
          })
        }
      }
    })
  }
}
