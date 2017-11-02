<template>
  <div :class="$style.main">
    <div :class="$style.itemImg">
      <img src="">
    </div>
    <div :class="$style.first">
      <div :class="$style.firstTxt1">
        <p>对健身，你是怎么看的？</p>
        <p>是一种运动的方式？</p>
        <p>是考验耐力与坚持？</p>
        <p>是要更完美的自己？</p>
      </div>
      <div :class="$style.dividerImg">
        <img src="~public/about/fm_divider.svg">
      </div>
      <div :class="$style.firstTxt2">健身爱好者&从业者，有更深的解读！</div>
    </div>
    <div :class="$style.second">
      <div :class="$style.secondTxt1">
        健身地图是为健身爱好者及商家，提供高效解决方案的服务商。
      </div>
      <div :class="$style.secondTxt2">
        ——健身地图发起人<br>M.Soong
      </div>
    </div>
    <div :class="$style.itemImg">
      <img src="">
    </div>
    <Item icon="~public/about/fm_aboutus_01.svg">
    </Item>
    <!-- <div :class="$style.thrid">
      <div :class="$style.about01Img">
        <img src="~public/about/fm_aboutus_01.svg">
      </div>
      <div :class="$style.thridTxt1">
        <p>投资/运营健身房，</p>
        <p>Boss们最关注什么？</p>
      </div>
      <div :class="$style.thridTxt2">
        商圈竞争如何布局？
      </div>
      <div :class="$style.dividerImg">
        <img src="~public/about/fm_divider.svg">
      </div>
    </div> -->
    <div :class="$style.itemImg">
      <img src="">
    </div>
    <div :class="$style.fourth">
      <div :class="$style.fourthTxt">
        <p>使用健身地图的用户，能第一时间通过“查找”快速“搜索”了解“最近健身房”信息。</p>
        <p>协助区域经营布局，门店特色化经营规划，健身房线下信息一键获取</p>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'

export default {
  name: 'about-us',
  components: { Item },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
$white = #FFF
$black = #25272B
$breakline = #9DA2AB
$grey = #E1E5EB

img
  display block
  width 100%
.dividerImg img
  height 6px
.about01Img img
  height 30px

.main
  font-size 15px
.first
  padding 24px 0 46px
  text-align center
  font-size 15px
  color $black
  background $white
.firstTxt1
  margin-bottom 18px
  letter-spacing 0
  font-weight 300
  line-height 24px
  >p:first-child
    font-weight 500
.firstTxt2
  margin-top 18px
  line-height 24px
  font-weight 600

.second
  padding 24px 0
  font-size 15px
  background $black
  color $white
.secondTxt1
  margin 0 24px 18px
  line-height 24px
.secondTxt2
  text-align center
  font-weight 500
  line-height 24px

.thrid
  padding 18px 24px
  text-align center
  background $white
.thridTxt1
  margin-top 12px
  padding-bottom 6px
  font-size 17px
  line-height 20px
  font-weight 600
  color $black
  border-bottom 1px solid $breakline
.thridTxt2
  margin 18px 0

.fourth
  padding 24px 0
  background $grey
.fourthTxt
  padding 0 24px
  line-height 24px
  >p
    position relative
    padding-left 14px
    &:before
      content ''
      position absolute
      width 8px
      height 8px
      background url('~public/about/fm_bullet.svg') no-repeat
      background-size 100% 100%
      left 0
      top 8px
  
</style>
