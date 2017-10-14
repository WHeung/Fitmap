<template>
  <div :class="$style.main">
    <AMap v-model="map" @mapClick="mapClick"></AMap>
    <transition :name="transName" :mode="transName === 'trans' ? 'in-out' : 'out-in'">
      <keep-alive>
        <router-view :class="$style.mapView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import AMap from '~src/components/AMap.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map',
  components: { AMap },
  data () {
    return {
      transName: 'view'
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.transName = 'view'
    if (from.name === 'mapIndexView' && to.name === 'mapListView') {
      this.transName = 'trans'
    }
    next()
  },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      },
      set (val) {
        console.log(val)
        this.$store.commit(Types.SET_MAP, val)
      }
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    mapClick () {
      this.$store.commit(Types.SET_MAP_SELECTED, { id: 1 })
    }
  }
}
</script>

<style lang="stylus" module>
.main
  position fixed
  top 0
  left 0
  bottom 0
  right 0

.mapView
  position absolute
  width 100%
  height 100%
  top 0
  z-index 1
</style>
