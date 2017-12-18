<template>
  <div :class="$style.main">
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
import * as Types from '~src/store/types'
import { initMap, getLocation } from '~src/tool/mapBase.js'
import { weixinConfig, weixinGetLocation } from '~src/store/api/weixinApi'

export default {
  name: 'navigate-view',
  data () {
    return {
      item: {}
    }
  },
  computed: {
    userLoc () {
      const userLoc = this.$store.state.map.userLoc
      if (userLoc.lat && userLoc.lng) {
        return userLoc
      }
    },
    map () {
      const map = this.$store.state.map.map
      if (map) {
        return this.$store.state.map.map
      }
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
    },
    fallBucket () {
      this.$store.dispatch(Types.FALL_BUCKET, { id: 'MAP_LOCATION' }).then(data => {
        if (data) {
          this.item = data
          this.$store.dispatch(Types.UPDATE_MAP_LOCATION, data)
          if (!this.userLoc) {
            // weixinLocation(this)
            getLocation().then(position => {
              this.$store.commit(Types.SET_MAP_USER_LOCATION, { lat: position.lat, lng: position.lng })
            })
          }
        } else {
          this.$router.back()
        }
      })
    }
  },
  mounted () {
    this.$store.dispatch(Types.CHANGE_NAV, { title: '地图定位' })
    if (!this.map) {
      initMap().then(map => {
        this.$store.commit(Types.SET_MAP, map)
        this.fallBucket()
      })
    } else {
      this.fallBucket()
    }
  }
}

function weixinLocation (self) {
  self.$store.dispatch(Types.UPDATE_WEIXIN_CONFIG).then(data => {
    weixinConfig(data.data)
    weixinGetLocation({}, ({ lat, lng }) => {
      self.$store.commit(Types.SET_MAP_USER_LOCATION, { lat, lng })
    })
  })
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  pointer-events none !important// 点击穿透属性，使地图可以拖到
.bottom
  pointer-events visible // 之后的容器不需要继承点击穿透
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
