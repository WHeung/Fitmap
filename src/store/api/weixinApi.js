import wx from 'weixin-js-sdk'
import { isWeixin } from '~src/tool/containerDetect'
export function weixinConfig (config) {
  if (isWeixin()) {
    wx.config({
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: config.jsApiList
    })
  }
}
export function weixinReady (apiLsit, callback) {
  wx.ready(function () {
    callback && callback()
  })
}
export function weixinShare (shareData, callback) {
  if (isWeixin()) {
    if (typeof shareData.txtIndex !== 'number') {
      shareData.txtIndex = 0
    }
    wx.onMenuShareTimeline({
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
    wx.onMenuShareAppMessage({
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
        type: 'gcj02',
        success: function (res) {
          callback && callback({
            lat: res.latitude,
            lng: res.longitude
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
        let sure = ''
        if (typeof checkResult === 'string') {
          const result = JSON.parse(checkResult)
          sure = result && result.geoLocation === true
        }
        if (typeof checkResult === 'object') {
          sure = checkResult.getLocation === true
        }
        if (sure) {
          wx.getLocation({
            type: 'gcj02',
            success: function (res) {
              callback && callback({
                lat: res.latitude,
                lng: res.longitude
              })
            }
          })
        } else {
          weixinReady(function () {
            wx.getLocation({
              type: data.type || 'gcj02',
              success: function (res) {
                callback && callback({
                  lat: res.latitude,
                  lng: res.longitude
                })
              }
            })
          })
        }
      }
    })
  }
}
