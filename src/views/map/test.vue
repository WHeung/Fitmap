<template>
  <div :class="$style.main">
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
  height 5px
  background #fab
</style>
