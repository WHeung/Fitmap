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
        width: window.screen.width + 'px',
        height: window.screen.height + 'px'
      }
    }
  },
  props: ['stores'],
  watch: {
    stores: {
      handler (val) {
      }
    }
  },
  mounted () {
    const map = new AMap.Map('allmap', { // 创建Map实例
      resizeEnable: true,
      zoom: 14
    })
    map.setZoomAndCenter(14, [113.263406, 23.132208]) // 初始化地图,设置中心点坐标和地图级别
    // AMap.plugin(['AMap.ToolBar'], function () {
    //   map.addControl(new AMap.ToolBar({
    //     position: 'RB'
    //   }))
    // })
    this.$emit('input', map)
    window.map = map // 方便调试
  },
  methods: {
    handleClick (marker) {
      this.$emit('mapClick', marker)
    }
  }
}
</script>
<style lang="stylus">
.amap-logo
.amap-copyright
.anchorBL
  display none !important


</style>
