import * as Types from '~src/store/types'
import CallApi from '~src/store/api'
import AMap from 'AMap'
import icon from '~src/public/fm_map_pin@2x.png'
import onIcon from '~src/public/fm_map_pin_on@2x.png'

const State = {
  map: null, // Object
  selectedItem: null, // Object
  list: null, // Array
  userLoc: {
    lat: '',
    lng: ''
  },
  filtersForm: {
    input: '',
    selected: [0, 0]
  },
  classTypes: [
    {
      name: '商家',
      data: 'merchant'
    }, {
      name: '帖子',
      data: 'post'
    }
  ],
  classCategorys: {
    merchant: [
      {
        name: '健身房',
        data: 'gym'
      },
      {
        name: '室内设计',
        data: 'design'
      },
      {
        name: '健身培训',
        data: 'train'
      },
      {
        name: '室内器材',
        data: 'equip'
      }
    ],
    post: [
      {
        name: '场地租凭',
        data: 'lease'
      },
      {
        name: '转让信息',
        data: 'transfer'
      },
      {
        name: '人员招聘',
        data: 'recruit'
      },
      {
        name: '设计招标',
        data: 'bid'
      }
    ]
  }
}

const Mutations = {
  [Types.SET_MAP] (state, data) {
    console.log('mutation: set map')
    state.map = data
  },
  [Types.SET_MAP_LIST] (state, data) {
    console.log('mutation: set selected list')
    state.list = data
  },
  [Types.SET_MAP_SELECTED_MARKER] (state, data) {
    console.log('mutation: set selected marker')
    state.selectedItem = data
  },
  [Types.SET_MAP_FILTERS_FORM] (state, data) {
    console.log('mutation: set filtersForm')
    Object.assign(state.filtersForm, data)
  },
  [Types.SET_MAP_USER_LOCATION] (state, data) { // data: {lat, lng}
    Object.assign(state.userLoc, data)
  }
}

var dataList = [
  {
    "id": 1,
    "title": "宠物店",
    "logo": "http://xxx",
    "telephones": [
        1311,
        1312,
        1313
    ],
    "images": [
      'http://cdn01.dwfei.com/img/banner/02/mangu2.jpg',
      "http://xxx2"
    ],
    "label": "健身房",
    "content": "content",
    "star": "4",
    "location_obj": {
      "id": 1,
      "lng": "1.123450",
      "lat": "1.234550",
      "province": "广东省",
      "city": "广州市",
      "area": "海珠区",
      "address": "海宁路"
    },
    'is_collected': 1,
    "items": [
      {
          "id": 1,
          "images": [
              "http://xxx7",
              "http://xxx8"
          ],
          "title": "商品",
          "price": "10000元",
          "type": "器材",
          "brand": "nike",
          "merchant": {
              "id": 1,
              "title": "宠物店",
              "logo": "http://xxx",
              "telephones": [
                  1311,
                  1312,
                  1313
              ],
              "images": [
                  "http://xxx1",
                  "http://xxx2"
              ],
              "label": "健身房",
              "content": "content",
              "star": "4"
          }
      }
    ]
  },
  {
    'id': 5,
    'title': '商家1',
    'content': 'string',
    'area': 'string',
    'price': 'string',
    'type': 'merchant',
    "label": "健身房",
    'telephones': [
      14000000000,
      12000000000,
      13000000000
    ],
    'is_collected': 0,
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
    }
  }, {
    'id': 6,
    'title': '商家2',
    'content': 'string',
    'area': 'string',
    'price': 'string',
    'type': 'merchant',
    "label": "室内设计",
    'is_collected': 1,
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
    }
  }, {
    'id': 7,
    'title': '帖子1',
    'content': '层高6米 天河花园式创意园 各种商业配.安抚水淀粉',
    'area': 'string',
    'price': 'string',
    'created_time': '2019-02-12',
    "label": "场地租凭",
    'type': 'post',
    'is_collected': 0,
    'telephones': [
      14000000000,
      12000000000,
      13000000000
    ],
    'images': [
      'data:image/jpeg;base64,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',
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
    }
  }, {
    'id': 8,
    'title': '帖子2',
    'content': '裕晖创意产业园位于天河北商圈及天河智慧城核心区域的不知道啥地方',
    'created_time': '2017-05-13',
    'area': 'string',
    'price': 'string',
    'label': '转让信息',
    'type': 'post',
    "is_collected": 1,
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
    }
  }
]
const Actions = {
  [Types.UPDATE_MAP_SEARCH] ({ state, commit, dispatch }, data) {
    return new Promise(resolve => {
      const filtersForm = state.filtersForm
      console.log(filtersForm)
      const type = state.classTypes[filtersForm.selected[0]].data
      const category = state.classCategorys[type][filtersForm.selected[1]].name
      const keyword = filtersForm.input
      Object.assign(data, {
        type,
        category,
        keyword
      })
      CallApi(Types.FETCH_MAP_SEARCH, data).then(res => {
        const data = res.data.data
        commit(Types.SET_MAP_LIST, data)
        const location = data.map(item => {
          return item.location_obj
        })
        dispatch(Types.UPDATE_MAP_MARKERS, location)
        resolve()
      })
    })
  },
  [Types.UPDATE_MAP_MARKERS] ({ state, commit }, list) { // query: Array
    state.map.clearMap()
    for (let i = 0, item; i < list.length; i++) {
      item = list[i]
      var marker = new AMap.Marker({
        map: state.map,
        icon: Icon({
          icon: icon,
          size: size(28, 30)
        }),
        clickable: true,
        topWhenClick: true,
        offset: pixel(-14, -15),
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
  },
  [Types.UPDATE_MAP_LOCATION] ({ state, commit }, data) { // query: object
    const location = data.location_obj
    const marker = new AMap.Marker({
      map: state.map,
      icon: Icon({
        icon: onIcon,
        size: size(44, 62)
      }),
      clickable: true,
      topWhenClick: true,
      offset: pixel(-22, -57),
      position: LngLat(location.lng, location.lat),
      extData: { id: location.id }
    })
    state.map.setCenter(marker.getPosition())
    commit(Types.SET_MAP_SELECTED_MARKER, { item: data, marker })
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
