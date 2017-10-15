<template>
  <div :class="$style.main">
    <div :class="$style.tip">地址失效，找不到页面哦～</div>
    <div :class="$style.btn" @click="goIndex()">去首页看看吧&nbsp;&gt;&gt;&gt;</div>
  </div>
</template>
<script>
import * as Types from '~src/store/types'
export default {
  name: 'no-found',
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    goIndex () {
      this.$router.push('/map/index')
    }
  }
}
</script>
<style lang="stylus" module>
@import '~tool/vendor'
.main
  background $white
  position absolute
  width 100%
  height 100%

.tip
  padding 100px 0
  text-align center
  font-size 14px

.btn
  height 40px
  line-height 40px
  margin-top 40px
  margin 0 auto
  width 150px
  background $blueBtn
  font-size 15px
  color $white
  text-align center
  border-radius 24px
</style>
