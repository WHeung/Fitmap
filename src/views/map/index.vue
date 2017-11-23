<template>
  <div :class="$style.main">
    <QMapComponent v-model="map"></QMapComponent>
    <transition :name="transName" mode="in-out">
      <keep-alive>
        <router-view :class="$style.mapView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import AMapComponent from '~src/components/AMap.vue'
import QMapComponent from '~src/components/QMap.vue'
import { weixinConfig, weixinGetLocation } from '~src/store/api/weixinApi'
import * as Types from '~src/store/types'

export default {
  name: 'map',
  components: { QMapComponent },
  data () {
    return {
      transName: '',
      initRequset: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.transName = ''
    if (from.name === 'mapIndexView' && to.name === 'mapListView') {
      this.transName = 'trans'
    }
    next()
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
    if (this.map) {
      const markers = this.map.getAllOverlays('marker')
      this.map.setFitView(markers)
      this.initRequset = false
    }
    weixinLocation(this)
  },
  computed: {
    map: {
      get () {
        const map = this.$store.state.map.map
        if (map) {
          return this.$store.state.map.map
        }
      },
      set (val) {
        console.log('set_map')
        this.$store.commit(Types.SET_MAP, val)
        if (this.initRequset) {
          this.firstRequest()
        }
      }
    },
    userLoc () {
      const userLoc = this.$store.state.map.userLoc
      if (userLoc.lat && userLoc.lng) {
        return userLoc
      }
    }
  },
  methods: {
    firstRequest () {
      if (this.map && this.userLoc) {
        this.initRequset = false
        this.$store.dispatch(Types.UPDATE_MAP_SEARCH).then(() => {
          const markers = this.map.getAllOverlays('marker')
          this.map.setFitView(markers)
        })
      }
    }
  }
}

function weixinLocation (self) {
  self.$store.dispatch(Types.UPDATE_WEIXIN_CONFIG).then(data => {
    weixinConfig(data.data)
    weixinGetLocation({}, ({ lat, lng }) => {
      self.$store.commit(Types.SET_MAP_USER_LOCATION, { lat, lng })
      if (self.initRequset) {
        self.firstRequest()
      }
    })
  })
}
</script>

<style lang="stylus" module>
.main
  position relative

.mapView
  position absolute
  top 0
  left 0
  width 100%
  height 100%
</style>
