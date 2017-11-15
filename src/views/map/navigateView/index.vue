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
import AMap from '~src/components/AMap.vue'
import * as Types from '~src/store/types'

export default {
  name: 'navigate-view',
  components: { AMap },
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
