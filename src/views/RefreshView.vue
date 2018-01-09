<template>
  <div :class="$style.main">
    <div :class="$style.loading">
      <svg viewBox="25 25 50 50" :class="$style.circular">
        <circle cx="50" cy="50" r="20" fill="none" :class="$style.path"></circle>
      </svg>
    </div>
  </div>
</template>
<script>
import * as Types from '~src/store/types'
export default {
  name: 'redirect',
  beforeMount () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>
<style lang="stylus" module>
@import '~tool/vendor'
.main
  background #fff
  position absolute
  width 100%
  height 100%
.loading
  top 50%
  left 0
  margin-top -21px
  width 100%
  text-align center
  position fixed
  z-index 100
.circular
  width 60px
  height 60px
  animation loading-rotate 2s linear infinite
.path
  animation loading-dash 1.5s ease-in-out infinite
  stroke-dasharray 90,150
  stroke-dashoffset 0
  stroke-width 2
  stroke $blueBtn
  stroke-linecap round
@keyframes loading-dash
  0%
    stroke-dasharray 1,200
    stroke-dashoffset 0
  50%
    stroke-dasharray 90,150
    stroke-dashoffset -40px
  to
    stroke-dasharray 90,150
    stroke-dashoffset -120px
@keyframes loading-rotate
  to
    transform rotate(1turn)
</style>
