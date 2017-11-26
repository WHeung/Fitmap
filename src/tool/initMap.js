import QMap from 'QMap'
import Store from '~src/store/index.js'
import * as Types from '~src/store/types.js'

export function initMap () {
  return new Promise(resolve => {
    const map = new QMap.Map(document.getElementById('allmap'), {
      // 地图的中心地理坐标。
      zoom: 10,
      mapTypeId: QMap.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: QMap.ControlPosition.BOTTOM_RIGHT,
        style: QMap.ZoomControlStyle.DEFAULT
      }
    })
    resolve(map)
    window.map = map
  })
}
