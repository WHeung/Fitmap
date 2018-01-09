import * as Types from '~src/store/types'
import CallApi from '~src/store/api'
import { LngLat, normalIcon, activeIcon, LatLngBounds } from '~src/tool/mapBase'
import QMap from 'QMap'

const State = {
  map: null,
  selectedItem: null,
  list: null,
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
        name: '场地租赁',
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
  [Types.SET_MAP_USER_LOCATION] (state, data) {
    console.log('mutation: set userLoc')
    Object.assign(state.userLoc, data)
  },
  [Types.SET_MAP_PAGINATION] (state, data) {
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
      for (let i = 0; i < state.map.markers.length; i++) {
        const marker = state.map.markers[i]
        marker.setMap(null)
      }
      state.map.markers = []
    }
    const locationList = list.map(item => {
      return item.location_obj
    })
    let minLat = locationList[0].lat
    let maxLat = minLat
    let minLng = locationList[0].lng
    let maxLng = minLng
    for (let i = 0, item; i < locationList.length; i++) {
      item = locationList[i]
      item.lat < minLat && (minLat = item.lat)
      item.lat > maxLat && (maxLat = item.lat)
      item.lng < minLng && (minLng = item.lng)
      item.lng > maxLng && (maxLng = item.lng)
      const marker = new QMap.Marker({
        position: LngLat(item.lng, item.lat),
        map: state.map,
        title: 'markerPoint',
        icon: normalIcon()
      })
      marker.itemId = item.id
      QMap.event.addListener(marker, 'click', (data) => {
        dispatch(Types.UPDATE_MAP_SELECTITEM, data.target)
      })
      state.map.markers.push(marker)
    }
    const sw = LngLat(maxLng, maxLat)
    const ne = LngLat(minLng, minLat)
    const latlngBounds = LatLngBounds(ne, sw)
    state.map.fitBounds(latlngBounds)
  },
  [Types.UPDATE_MAP_SELECTITEM] ({ state, commit }, marker) {
    const oldItem = state.selectedItem
    const allData = state.list
    if (oldItem && oldItem.marker) {
      oldItem.marker.setIcon(normalIcon())
      oldItem.marker.setZIndex(0)
    }
    marker.setIcon(activeIcon())
    marker.setZIndex(1)
    const data = allData.find(val => {
      return val.location_obj.id === marker.itemId
    })
    state.map.panTo(marker.getPosition())
    commit(Types.SET_MAP_SELECTED_MARKER, { item: data, marker })
  },
  [Types.UPDATE_MAP_LOCATION] ({ state, commit }, data) { // query: object
    const location = data.location_obj
    if (state.map && state.map.markers && state.map.markers.length) {
      for (let i = 0; i < state.map.markers.length; i++) {
        const marker = state.map.markers[i]
        marker.setMap(null)
      }
    }
    state.map.markers = []
    const marker = new QMap.Marker({
      position: LngLat(location.lng, location.lat),
      map: state.map,
      title: 'markerPoint',
      icon: activeIcon()
    })
    marker.itemId = location.id
    state.map.markers.push(marker)
    state.map.setCenter(marker.getPosition())
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
