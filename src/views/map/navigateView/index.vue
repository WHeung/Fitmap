<template>
  <div :class="$style.main">
    <AMapComponent v-model="map"></AMapComponent>
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
import AMapComponent from '~src/components/AMap.vue'
import AMap from 'AMap'
import * as Types from '~src/store/types'
import onIcon from '~src/public/fm_map_pin_on@2x.png'

export default {
  name: 'navigate-view',
  components: { AMapComponent },
  data () {
    return {
      item: {},
      map: {},
      marker: {}
    }
  },
  computed: {
    userLoc () {
      return this.$store.state.map.userLoc
    }
  },
  methods: {
    findRoute () {
      if (this.userLoc.lng && this.userLoc.lat) {
        const locObj = this.item.location_obj
        window.location.href = '//m.amap.com/navi/?' +
          `start=${this.userLoc.lng},${this.userLoc.lat}` +
          `&dest=${locObj.lng},${locObj.lat}` +
          `&destName=${this.item.title}` +
          '&naviBy=car' +
          '&key=056a8882dfde3770452da397d2eb6e83'
      } else {
        this.$store.dispatch(Types.OPEN_POPUP, {
          title: '提示',
          word: '无法获取您的位置信息，请检查你的设置',
          leftMsg: '确定'
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch(Types.CHANGE_NAV, { title: '地图定位' })
    this.$store.dispatch(Types.FALL_BUCKET, { id: 'MAP_LOCATION' }).then(data => {
      if (data) {
        this.item = data
        // this.$store.dispatch(Types.UPDATE_MAP_LOCATION, data)
        const location = data.location_obj
        this.marker = new AMap.Marker({
          map: this.map,
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
        this.map.toolBar.doLocation()
        this.map.setCenter(this.marker.getPosition())
        this.map.toolBar.setOffset(pixel(10, 200))
      } else {
        this.$router.back()
      }
    })
  },
  watch: {
    userLoc: { // fixe 第一次进入页面获取定位过慢
      handler (val) {
        this.map.setCenter(this.marker.getPosition())
        this.map.setZoom(10)
      },
      deep: true
    }
  }
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
