<template>
  <div id="amap" :style="mapStyle">
  </div>
</template>

<script>
import AMap from 'AMap'
import * as Types from '~src/store/types'

export default {
  name: 'A-Map',
  data () {
    return {
      mapStyle: {
        width: window.screen.width + 'px',
        height: window.innerHeight + 'px',
        '-webkit-overflow-scrolling': 'touch' // 加上这个IOS顺滑的实现
      }
    }
  },
  mounted () {
    this.$store.dispatch(Types.CLOSE_LOADING)
    const map = new AMap.Map('amap', { // 创建Map实例
      resizeEnable: true,
      mapStyle: 'amap://styles/7b3dbe0900deae4bcbe445c95b0df7f3'
    })
    map.plugin(['AMap.ToolBar'], function () {
      var toolBar = new AMap.ToolBar({
        offset: new AMap.Pixel(10, 10),
        ruler: false,
        noIpLocate: true,
        locate: true,
        direction: false,
        position: 'LB',
        liteStyle: true
      })
      map.addControl(toolBar)
    })
    map.setZoomAndCenter(14, [113.263406, 23.132208]) // 初始化地图,设置中心点坐标和地图级别
    window.map = map // 方便调试
  },
  methods: {
  }
}
</script>
<style lang="stylus">
.amap-logo
.amap-copyright
.anchorBL
  display none !important

#app .amap-zoomcontrol
  position fixed
  right 10px
  bottom 10px

#amap
  transform translateZ(0)
  opacity 1


</style>
