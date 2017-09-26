<template>
  <div :class="$style.main">
    <router-view></router-view>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
export default {
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
