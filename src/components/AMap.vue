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
    // map.setZoomAndCenter(14, [113.263406, 23.132208]) // 初始化地图,设置中心点坐标和地图级别
    map.plugin(['AMap.ToolBar'], () => {
      var toolBar = new AMap.ToolBar({
        // offset: new AMap.Pixel(10, 10),
        ruler: false,
        noIpLocate: true,
        locate: true,
        direction: false,
        position: 'RB',
        liteStyle: true
        // autoPosition: true
      })
      toolBar.on('location', ({ type, lnglat }) => {
        console.log(lnglat)
        this.$store.commit(Types.SET_MAP_USER_LOCATION, lnglat)
      })
      toolBar.doLocation()
      map.addControl(toolBar)
      map.toolBar = toolBar
    })
    /**
    map.plugin('AMap.Geolocation', () => {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: false, // 是否使用高精度定位，默认:true
        timeout: 10000, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: false, // 显示定位按钮，默认：true
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true // 定位成功后将定位到的位置作为地图中心点，默认：true
      })
      map.addControl(geolocation)
      map.geolocation = geolocation
      // geolocation.getCurrentPosition((status, res) => {
      //   console.log(status, res)
      //   if (status === 'complete') {
      //     this.$store.commit(Types.SET_MAP_USER_LOCATION, res)
      //   } else {
      //     map.plugin('AMap.CitySearch', () => {
      //       const city = new AMap.CitySearch()
      //       city.getLocalCity((status, res) => {
      //         console.log(status, res)
      //         map.setCity(res.adcode)
      //         this.$store.commit(Types.SET_MAP_USER_LOCATION, res)
      //       })
      //     })
      //   }
      // })
    })
    */
    map.plugin('AMap.CitySearch', () => {
      const citySearch = new AMap.CitySearch()
      map.addControl(citySearch)
      map.citySearch = citySearch
    })
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
