import AMap from 'AMap'
import Store from '~src/store/index.js'
import * as Types from '~src/store/types.js'

export function initMap () {
  return new Promise(resolve => {
    const map = new AMap.Map('allmap', { // 创建Map实例
      resizeEnable: true,
      mapStyle: 'amap://styles/7b3dbe0900deae4bcbe445c95b0df7f3'
    })
    map.plugin(['AMap.ToolBar'], () => {
      var toolBar = new AMap.ToolBar({
        ruler: false,
        noIpLocate: true,
        locate: true,
        direction: false,
        position: 'RB',
        liteStyle: true
      })
      toolBar.on('location', ({ type, lnglat }) => {
        Store.commit(Types.SET_MAP_USER_LOCATION, lnglat)
      })
      map.addControl(toolBar)
      map.toolBar = toolBar
      resolve(map)
      window.map = map
    })
  })
}
