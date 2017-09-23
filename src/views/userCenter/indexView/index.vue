<template>
  <div :class="$style.main">
    <div :class="$style.avatar">
      <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
    </div>
    <div :class="$style.name">用户昵称</div>
    <div :class="$style.item">
      我收藏的商品
    </div>
    <div :class="$style.item">
      我收藏的商家
    </div>
    <div :class="$style.item">
      我收藏的帖子
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'

export default {
  name: 'user-View',
  created() {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
.avatar
  position relative
  margin 15px auto 0 auto
  width 100px
  height 100px
  overflow hidden
  background #fff
  border 2px solid #fff
  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
  border-radius 100px
  img
    display block
    position absolute
    width 100%

.name
  margin 20px 0 50px
  text-align center
  font-size 18px

.item
  margin-bottom 5px
  padding 5px 10px
  border 1px solid #000


</style>
