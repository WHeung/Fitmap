import * as Types from '~src/store/types'
import CallApi from '~src/store/api'
import QMap from 'QMap'
import icon from '~src/public/fm_map_pin@2x.png'
import onIcon from '~src/public/fm_map_pin_on@2x.png'

const State = {
  map: null, // Object
  selectedItem: null, // Object
  list: null, // Array
  pagination: {},
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
        name: '健身器材',
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
    console.log('mutation: set userLoc')
    Object.assign(state.userLoc, data)
  },
  [Types.SET_MAP_PAGINATION] (state, data) { // data: {lat, lng}
    console.log('mutation: set pagination')
    state.pagination = data
  }
}

const Actions = {
  [Types.UPDATE_MAP_SEARCH] ({ state, commit, dispatch }, data) {
    return new Promise(resolve => {
      const filtersForm = state.filtersForm
      const type = state.classTypes[filtersForm.selected[0]].data
      const category = state.classCategorys[type][filtersForm.selected[1]].name
      const keyword = filtersForm.input
      const userLoc = state.userLoc
      const stateData = {
        type: type,
        category: category,
        keyword: keyword,
        lng: userLoc.lng,
        lat: userLoc.lat
      }
      const reqData = Object.assign(stateData, data)
      CallApi(Types.FETCH_MAP_SEARCH, reqData).then(res => {
        const data = res.data.data
        if (data.pagination && data.pagination.current_page > 1 && data.list) {
          commit(Types.SET_MAP_LIST, state.list.concat(data.list))
        } else {
          commit(Types.SET_MAP_LIST, data.list)
        }
        commit(Types.SET_MAP_PAGINATION, data.pagination)
        dispatch(Types.UPDATE_MAP_MARKERS, data.list)
        resolve(data.list)
      })
    })
  },
  [Types.UPDATE_MAP_MARKERS] ({ state, commit, dispatch }, list) { // query: Array
    if (state.pagination && state.pagination.current_page === 1) {
      state.map && state.map.remove(state.map.getAllOverlays())
    }
    const locationList = list.map(item => {
      return item.location_obj
    })
    for (let i = 0, item; i < locationList.length; i++) {
      item = locationList[i]
      // var marker = new AMap.Marker({
      //   map: state.map,
      //   icon: Icon({
      //     icon: icon,
      //     size: size(28, 30)
      //   }),
      //   clickable: true,
      //   topWhenClick: true,
      //   offset: pixel(-14, -15),
      //   position: LngLat(item.lng, item.lat),
      //   extData: { id: item.id }39.913889
      // })
      const marker = new QMap.Marker({
        //设置Marker的位置坐标
        position: LngLat(116.415396, 39.913889),
        //设置显示Marker的地图
        map: state.map,
        icon: normalIcon(),
      });
      marker.itemId = item.id
      marker.on('click', ({ lnglat, pixel, target }) => {
        dispatch(Types.UPDATE_MAP_SELECTITEM, target)
      }, arguments[0])
    }
  },
  [Types.UPDATE_MAP_SELECTITEM] ({ state, commit }, marker) {
    const oldItem = state.selectedItem
    const allData = state.list
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
    state.map.setCenter(marker.getPosition())
    commit(Types.SET_MAP_SELECTED_MARKER, { item: data, marker })
  },
  [Types.UPDATE_MAP_LOCATION] ({ state, commit }, data) { // query: object
    const location = data.location_obj
    // const marker = new AMap.Marker({
    //   map: state.map,
    //   icon: Icon({
    //     icon: onIcon,
    //     size: size(44, 62)
    //   }),
    //   clickable: true,
    //   topWhenClick: true,
    //   offset: pixel(-22, -57),
    //   position: LngLat(location.lng, location.lat),
    //   extData: { id: location.id }
    // })
    state.map.setCenter(marker.getPosition())
    commit(Types.SET_MAP_SELECTED_MARKER, { item: data, marker })
  },
  [Types.UPDATE_WEIXIN_CONFIG] ({ state, commit }, data) {
    return new Promise(resolve => {
      CallApi(Types.FETCH_WEIXIN_CONFIG, data).then(res => {
        resolve(res.data)
      })
    })
  }
}

export default {
  state: State,
  actions: Actions,
  mutations: Mutations
}

function normalIcon () {
  const size = Size(28, 30)
  const origin = Point(0, 0)
  const anchor = Point(0, 0)
  return new QMap.MarkerImage(icon, size, origin, anchor)
}

function Icon ({ icon, size }) {
  return new AMap.Icon({
    image: icon,
    size: size,
    imageSize: size
  })
}
function Size (width, height) {
  return new QMap.Size(width, height)
}

function Point (x, y) {
  return new QMap.Point(x, y)
}
function pixel (left, right) {
  return new AMap.Pixel(left, right)
}

function LngLat (lng, lat) {
  return new QMap.LngLat(lng, lat)
}
