import * as Types from '~src/store/types'
import CallApi from '~src/store/api'
import AMap from 'AMap'
import icon from '~src/public/fm_map_pin@2x.png'
import onIcon from '~src/public/fm_map_pin_on@2x.png'

const State = {
  map: null, // Object
  selectedItem: null, // Object
  list: null, // Array
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
  [Types.SET_MAP_SELECTED_MARKER] (state, data) {
    console.log('mutation: set selected marker')
    state.selectedItem = data
  },
  [Types.SET_MAP_FILTERS_FORM] (state, data) {
    console.log('mutation: set filtersForm')
    Object.assign(state.filtersForm, data)
  }
}

const Actions = {
  [Types.UPDATE_MAP_SEARCH] ({ state, dispatch }, data) {
    new Promise(resolve => {
      state.list = [
        {
          'id': 5,
          'title': '商家1',
          'content': 'string',
          'area': 'string',
          'price': 'string',
          'type': 'merchant',
          'telephones': [
            14000000000,
            12000000000,
            13000000000
          ],
          'images': [
            'http://cdn01.dwfei.com/img/sell/1b8295d8c49446af9954af76a7c495bb.jpg',
            'http://xxx1'
          ],
          'job_content': 'string',
          'position_content': 'string',
          'distance': '600米',
          'location': '东莞庄路120号',
          'location_obj': {
            id: 3,
            lng: 113.264296,
            lat: 23.12541,
            province: 'string',
            city: 'string',
            area: 'string',
            location: 'string'
          },
          'is_collected': 0
        }, {
          'id': 6,
          'title': '商家2',
          'content': 'string',
          'area': 'string',
          'price': 'string',
          'type': 'merchant',
          'telephones': [
            14000000000,
            12000000000,
            13000000000
          ],
          'images': [
            'http://cdn01.dwfei.com/img/country/new/yuenan@2x.png',
            'http://xxx1'
          ],
          'job_content': 'string',
          'position_content': 'string',
          'distance': '500米',
          'location': '仓边路199号',
          'location_obj': {
            id: 2,
            lng: 113.264843,
            lat: 23.133402,
            province: 'string',
            city: 'string',
            area: 'string',
            location: 'string'
          },
          'is_collected': 0
        }, {
          'id': 7,
          'title': '帖子1',
          'content': '层高6米 天河花园式创意园 各种商业配.安抚水淀粉',
          'area': 'string',
          'price': 'string',
          'created_time': '2019-02-12',
          'type': 'post',
          'telephones': [
            14000000000,
            12000000000,
            13000000000
          ],
          'images': [
            '',
            'http://xxx1'
          ],
          'job_content': 'string',
          'position_content': 'string',
          'distance': 'string',
          'location': '广州市第十人们医院',
          'location_obj': {
            id: 4,
            lng: 113.25582,
            lat: 23.125193,
            province: 'string',
            city: 'string',
            area: 'string',
            location: 'string'
          },
          'is_collected': 0
        }, {
          'id': 8,
          'title': '帖子2',
          'content': '裕晖创意产业园位于天河北商圈及天河智慧城核心区域的不知道啥地方',
          'created_time': '2017-05-13',
          'area': 'string',
          'price': 'string',
          'type': 'post',
          'telephones': [
            14000000000,
            12000000000,
            13000000000
          ],
          'images': [
            'http://xxx',
            'http://xxx1'
          ],
          'job_content': 'string',
          'position_content': 'string',
          'distance': 'string',
          'location': '天河-裕晖创意产业园',
          'location_obj': {
            id: 5,
            lng: 113.275669,
            lat: 23.126535,
            province: 'string',
            city: 'string',
            area: 'string',
            location: 'string'
          },
          'is_collected': 0
        }
      ]
      const location = state.list.map(item => {
        return item.location_obj
      })
      dispatch(Types.UPDATE_MAP_MARKERS, location)
      resolve()
    })
  },
  [Types.UPDATE_MAP_MARKERS] ({ state, commit }, list) { // query: Array
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
        const oldItem = store.state.selectedItem
        const allData = store.state.list
        if (oldItem && oldItem.marker) {
          oldItem.marker.setIcon(Icon({
            icon: icon,
            size: size(24, 26)
          }))
          oldItem.marker.setOffset(new AMap.Pixel(-12, -13))
        }
        marker.setIcon(Icon({
          icon: onIcon,
          size: size(44, 62)
        }))
        const data = allData.find(val => {
          return val.location_obj.id === marker.getExtData().id
        })
        marker.setOffset(new AMap.Pixel(-22, -57))
        store.state.map.setCenter(marker.getPosition())
        store.commit(Types.SET_MAP_SELECTED_MARKER, { item: data, marker })
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
