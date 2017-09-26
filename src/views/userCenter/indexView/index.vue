<template>
  <div :class="$style.main">
    <div :class="$style.info">
      <div :class="$style.avatar">
        <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
      </div>
      <div :class="$style.name">用户昵称</div>
      <button :class="$style.editBtn">编辑信息</button>
    </div>
    <div :class="$style.list">
      <div :class="$style.item">
        <div>我收藏的商品</div>
        <div>12</div>
      </div>
      <div :class="$style.line"></div>
      <div :class="$style.item">
        <div>我收藏的商家</div>
        <div>14</div>
      </div>
      <div :class="$style.line"></div>
      <div :class="$style.item">
        <div>我收藏的帖子</div>
        <div>9</div>
      </div>
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
$color = #000

.main
  color $color

.info
  padding 40px 0 50px
  text-align center

.avatar
  position relative
  margin 0 auto
  width 100px
  height 100px
  overflow hidden
  background #fff
  border 4px solid #fff
  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
  border-radius 100px
  img
    display block
    position absolute
    width 100%

.name
  margin 20px 0
  font-size 18px

.editBtn
  padding 5px 20px
  border 1px solid $color
  border-radius 100px

.list
  padding 5px 0

.item
  position relative
  display flex
  padding 15px 10px 15px (10+30)px
  justify-content space-between
  background #999
  &:before
    content ''
    position absolute
    left 10px
    top 50%
    width 25px
    height 25px
    transform translateY(-50%)
    background #abf

.line
  margin-left 10px
  height 1px
  background $color
</style>
