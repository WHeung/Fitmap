<template>
  <div :class="$style.main">
    <BMap v-model="map"></BMap>
    <transition name="view" mode="out-in">
      <keep-alive>
        <router-view></router-view>
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
      map: null
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
.main
  background #bfa
  position fixed
  top 0
  left 0
  bottom 0
  right 0
</style>
