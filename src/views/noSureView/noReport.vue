<template>
  <div :class="$style.main">
    <div :class="$style.img">
      <img src="~public/fm_empty_report@2x.png">
    </div>
    <div :class="$style.text">尚无可用评估报告</div>
    <div :class="$style.tips">
      你尚未<span>参加体测体验</span><br>
      请尽快到所在健身房完成体测<br>
      <span>建立属于你的健身报告</span>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'

export default {
  name: 'noPlan-view',
  created () {
    this.$store.dispatch(Types.CHANGE_NAV, { title: `我的健康报告` })
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  padding-top 120px
.img
  margin 0 auto
  width 128px
  img
    display block
    width 100%

.text
.tips
  margin-top 12px
  text-align center
  color $assistText
.tips
  margin-top 24px
  line-height 24px
  span
    color #000024
    font-weight 500
</style>
