import QMap from 'QMap'
import icon from '~src/public/fm_map_pin@2x.png'
import onIcon from '~src/public/fm_map_pin_on@2x.png'
import locateIcon from '~src/public/loc.png'

export function initMap () {
  return new Promise(resolve => {
    const map = new QMap.Map(document.getElementById('allmap'), {
      zoom: 10,
      mapTypeId: QMap.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
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

export function Size (width, height) {
  return new QMap.Size(width, height)
}

export function Point (x, y) {
  return new QMap.Point(x, y)
}

export function LngLat (lng, lat) {
  return new QMap.LatLng(lat, lng)
}

export function LatLngBounds (ne, sw) {
  return new QMap.LatLngBounds(ne, sw)
}

export function locIcon () {
  const size = Size(23, 23)
  const scaleSize = size
  const origin = Point(0, 0)
  const anchor = Point(17, 17)
  return new QMap.MarkerImage(locateIcon, size, origin, anchor, scaleSize)
}

export function normalIcon () {
  const size = Size(28, 30)
  const scaleSize = size
  const origin = Point(0, 0)
  const anchor = Point(14, 15)
  return new QMap.MarkerImage(icon, size, origin, anchor, scaleSize)
}

export function activeIcon () {
  const size = Size(44, 62)
  const scaleSize = size
  const origin = Point(0, 0)
  const anchor = Point(22, 50)
  return new QMap.MarkerImage(onIcon, size, origin, anchor, scaleSize)
}

export function getLocation () {
  const geo = new QMap.Geolocation()
  return new Promise((resolve, reject) => {
    geo.getLocation(function (position) {
      console.log('succ', position)
      resolve(position)
    }, function (err) {
      console.log(err)
      reject()
    }, {
      timeout: 9000
    })
  })
}
