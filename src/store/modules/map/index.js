import * as Types from '~src/store/types'
import CallApi from '~src/store/api'
import AMap from 'AMap'
import icon from '~src/public/fm_map_pin@2x.png'
import onIcon from '~src/public/fm_map_pin_on@2x.png'

const State = {
  map: null, // Object
  selectedMarker: null, // Object
  filtersForm: {
    input: '',
    selected: [0, 0]
  }
}

const Mutations = {
  [Types.SET_MAP] (state, data) {
    console.log('mutation: set map')
    state.map = data
  },
  [Types.SET_MAP_SELECTED_MARKER] (state, marker) {
    console.log('mutation: set selected marker')
    state.selectedMarker = marker
  },
  [Types.SET_MAP_FILTERS_FORM] (state, data) {
    console.log('mutation: set filtersForm')
    Object.assign(state.filtersForm, data)
  }
}

const Actions = {
  [Types.ADD_MAP_MARKERS] ({ state, commit }, list) { // query: Array
    for (let i = 0, item; i < list.length; i++) {
      item = list[i]
      var marker = new AMap.Marker({
        map: state.map,
        icon: Icon({
          icon: icon,
          size: size(24, 26)
        }),
        clickable: true,
        topWhenClick: true,
        offset: pixel(-12, -13),
        position: LngLat(item.lng, item.lat),
        extData: { id: item.id }
      })
      const store = arguments[0]
      marker.on('click', ({ lnglat, pixel, target }) => {
        const marker = target
        store.state.map.setCenter(marker.getPosition())
        marker.setIcon(Icon({
          icon: onIcon,
          size: size(44, 62)
        }))
        marker.setOffset(new AMap.Pixel(-22, -57))
        store.commit(Types.SET_MAP_SELECTED_MARKER, marker)
      }, arguments[0])
    }
  }
}

export default {
  state: State,
  actions: Actions,
  mutations: Mutations
}

function Icon ({ icon, size }) {
  return new AMap.Icon({
    image: icon,
    size: size,
    imageSize: size
  })
}
function size (width, height) {
  return new AMap.Size(width, height)
}

function pixel (left, right) {
  return new AMap.Pixel(left, right)
}

function LngLat (lng, lat) {
  return new AMap.LngLat(lng, lat)
}
