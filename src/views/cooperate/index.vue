<template>
  <div :class="$style.main">
    <div :class="$style.topImg">
      <img src="~public/fm_contactus@2x.jpg">
    </div>
    <div :class="$style.title">
      联系我们
    </div>
    <div :class="$style.contact">
      <div :class="$style.contactItem">
        <span>赢商合作：</span>
        <span>138888888818</span>
      </div>
      <div :class="$style.contactItem">
        <span>电子邮箱：</span>
        <span>Chinafitmap@163.com</span>
      </div>
    </div>
    <div :class="$style.qcode">
      <img src="~public/about/fm_aboutus_qcode.jpg">
    </div>
  </div>  
</template>

<script>
import * as Types from '~src/store/types'

export default {
  name: 'cooperate-view',
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
    this.$store.dispatch(Types.CHANGE_NAV, { title: `商务合作` })
  }
}
</script>

<style lang="stylus" module>
$link = #57ABFF

.main
  background #FFF
.topImg
  overflow hidden
  img
    display block
    width 100%
.title
  margin-top 18px
  text-align center
  font-size 17px
  font-weight 600
.contact
  margin 24px auto
  font-size 15px
  line-height 24px
  width max-content
.contactItem
  >span:last-child
    color $link
.qcode
  margin 0 auto
  height 180px
  width 180px
  img
    display block
    width 100%
</style>
