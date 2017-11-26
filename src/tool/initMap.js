import QMap from 'QMap'

export function initMap () {
  return new Promise(resolve => {
    const map = new QMap.Map(document.getElementById('allmap'), {
      // 地图的中心地理坐标。
      zoom: 10,
      mapTypeId: QMap.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false, // true,
      zoomControlOptions: {
        position: QMap.ControlPosition.BOTTOM_RIGHT,
        style: QMap.ZoomControlStyle.DEFAULT
      }
    })
    map.markers = []
    resolve(map)
    window.map = map
  })
}
