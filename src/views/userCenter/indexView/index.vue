<template>
  <div :class="$style.main">
    <div :class="$style.info">
      <div :class="$style.avatar">
        <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
      </div>
      <div :class="$style.name">用户昵称</div>
      <button :class="$style.editBtn">个人信息</button>
    </div>
    <div :class="$style.list">
      <div :class="[$style.item, $style.store]" @click="clickCon('item')">
        <div>我收藏的商品</div>
        <div :class="$style.itemCon">
          <span>12</span>
          <i></i>
        </div>
      </div>
      <div :class="$style.line"></div>
      <div :class="[$style.item, $style.business]" @click="clickCon('merchant')">
        <div>我收藏的商家</div>
        <div :class="$style.itemCon">
          <span>14</span>
          <i></i>
        </div>
      </div>
      <div :class="$style.line"></div>
      <div :class="[$style.item, $style.post]" @click="clickCon('post')">
        <div>我收藏的帖子</div>
        <div :class="$style.itemCon">
          <span>9</span>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'

export default {
  name: 'user-View',
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  clickCon (type) {
    this.$router.push({ name: 'userfavoritesView', params: { type, id: this.$route.id }})
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.info
  padding (36/20)rem 0
  text-align center
  background url('~public/fm_user_bg@2x.png') no-repeat
  background-size 100% 100%

.avatar
  margin 0 auto
  width 96px
  height 96px
  overflow hidden
  background #fff
  border 3px solid #fff
  box-shadow 0 4px 12px 0 rgba(0,0,0,0.10)
  border-radius 100px
  img
    position relative
    display block
    width 100%
    top 50%
    transform translateY(-50%)

.name
  margin 20px 0
  font-size 16px

.editBtn
  padding 5px 20px
  border-radius 100px
  border 1px solid $mainText

.list
  margin-top 18px

.item
  position relative
  display flex
  justify-content space-between
  padding 16px 18px 16px 58px
  font-size 16px
  &:before
    content ''
    position absolute
    left 18px
    top 50%
    width 28px
    height 28px
    transform translateY(-50%)
    background #abf
.store:before
  background url('~public/fm_list_favitem.svg') no-repeat
  background-size 100% 100%
.business:before
  background url('~public/fm_list_favbusiness.svg') no-repeat
  background-size 100% 100%
.post:before
  background url('~public/fm_list_favpost.svg') no-repeat
  background-size 100% 100%

.itemCon
  display inline-flex
  align-items center
  color $assistText
  >i
    margin-left 6px
    height 16px
    width 16px
    background url('~public/fm_goto.svg') no-repeat
    background-size 100% 100%

.line
  margin-left 10px
  height 1px
  background $breakline
</style>
