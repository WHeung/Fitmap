<template>
  <div id="allmap" :style="mapStyle">
  </div>
</template>

<script>
import QMap from 'QMap'
import * as Types from '~src/store/types'

export default {
  name: 'Q-Map',
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
    const map = new QMap.Map(document.getElementById('allmap'), {
      // 地图的中心地理坐标。
      zoom: 10,
      mapTypeId: QMap.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: QMap.ControlPosition.BOTTOM_RIGHT,
        style: QMap.ZoomControlStyle.DEFAULT
      }
    })
    this.$emit('input', map)
    window.map = map
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
