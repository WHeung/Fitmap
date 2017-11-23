<template>
  <div id="allmap" :style="mapStyle">
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
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px',
        '-webkit-overflow-scrolling': 'touch' // 加上这个IOS顺滑的实现
      }
    }
  },
  mounted () {
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
        this.$store.commit(Types.SET_MAP_USER_LOCATION, lnglat)
      })
      map.addControl(toolBar)
      map.toolBar = toolBar
      this.$emit('input', map)
      window.map = map
    })
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

.amap-geo
  display block !important
// #app .amap-zoomcontrol
//   position fixed
//   right 10px
//   bottom 10px

#allmap
  transform translateZ(0)
  opacity 1


</style>
