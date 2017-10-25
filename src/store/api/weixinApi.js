import wx from 'weixin-js-sdk'
import { isWeixin } from '~src/tool/containerDetect'

export function weixinShareConfig (config) {
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

export function weixinShare (shareData, callback) {
  if (isWeixin()) {
    if (typeof shareData.txtIndex !== 'number') {
      shareData.txtIndex = 0
    }

    wx.ready(function () {
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
    })
  }
}
