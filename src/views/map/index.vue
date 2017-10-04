<template>
  <div :class="$style.main">
    <BMap v-model="map"></BMap>
    <transition name="view" mode="out-in">
      <keep-alive>
        <router-view :class="$style.mapView"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import BMap from '~src/components/BMap.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map',
  components: { BMap },
  data () {
    return {
    }
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
