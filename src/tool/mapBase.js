import QMap from 'QMap'
import icon from '~src/public/fm_map_pin@2x.png'
import onIcon from '~src/public/fm_map_pin_on@2x.png'

function Size (width, height) {
  return new QMap.Size(width, height)
}

export function Point (x, y) {
  return new QMap.Point(x, y)
}

export function LngLat (lng, lat) {
  return new QMap.LatLng(lat, lng)
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
