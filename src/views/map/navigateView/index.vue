<template>
  <div :class="$style.main">
    <AMap v-model="map" :location="location" :citySearch="citySearch" @mapClick="mapClick"></AMap>
    <div :class="$style.bottom">
      <div :class="$style.location">
        <div :class="$style.locCon">
          <div :class="$style.title">{{item.title}}</div>
          <div :class="$style.address">{{item.distance}} {{item.location}}</div>
        </div>
        <div :class="$style.locBtn" @click="findRoute">
          <i :class="$style.locIcon"></i>
          <span>线路</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
import * as Types from '~src/store/types'

export default {
  name: 'navigate-view',
  data () {
    return {
      item: {}
    }
  },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      }
    }
  },
  methods: {
    findRoute () {
      const locObj = this.item.location_obj
      window.location.href = '//m.amap.com/navi/?start=' +
        `&dest=${locObj.lng},${locObj.lat}` +
        `&destName=${this.item.title}` +
        '&naviBy=car' +
        '&key=056a8882dfde3770452da397d2eb6e83'
    },
    getUserLocation () {
      this.map.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: false, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: false, // 显示定位按钮，默认：true
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: false // 定位成功后将定位到的位置作为地图中心点，默认：true
        })
        this.map.addControl(geolocation)
        geolocation.getCurrentPosition((status, res) => {
          console.log(status, res)
          if (status === 'complete') {
            // map.setCenter(res.position)
            this.$store.commit(Types.SET_MAP_USER_LOCATION, res)
          } else {
            this.$store.dispatch(Types.OPEN_TOAST, '获取不到定位')
          }
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch(Types.FALL_BUCKET, { id: 'MAP_LOCATION' }).then(data => {
      console.log(data)
      if (data) {
        this.item = data
        this.$store.dispatch(Types.UPDATE_MAP_LOCATION, data)
        this.getUserLocation()
      } else {
        this.$router.back()
      }
    })
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.bottom
  position absolute
  bottom 0
  width 100%
  background $white

.location
  display flex

.locCon
  padding 18px 0
  padding-left 18px
  width 80%
  box-sizing border-box
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  font-size 15px
.title
  font-weight 500
.address
  margin-top 6px
  color $assistText
.locBtn
  flex 1 1
  display inline-flex
  flex-direction column
  align-items center
  justify-content center
  color $white
  background $blueBtn
.locIcon
  width 24px
  height 24px
  background url('~public/fm_route.svg') no-repeat
  background-size 100% 100%
  
</style>
