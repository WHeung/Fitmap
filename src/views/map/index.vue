<template>
  <div :class="$style.main">
    <transition :name="transName" mode="in-out">
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
      transName: ''
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
  }
}
</script>

<style lang="stylus" module>
.main
  width 100%
  height 100%
</style>
