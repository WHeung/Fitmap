<template>
  <div :class="$style.main">
    <div :class="$style.info">
      <div :class="$style.avatar">
        <img src="http://cdn01.dwfei.com/img/sell/1b8295d8c49446af9954af76a7c495bb.jpg">
        <div :class="$style.moreImg">更多</div>
      </div>
      <div :class="$style.title">PumpFit泵感健PumpFit泵感健身PumpFit泵感健身（客村店）</div>
    </div>
    <div :class="$style.msg">
      <div :class="$style.msgItem">
        <div :class="[$style.msgIcon, $style.locationIcon]"></div>
        <div :class="$style.msgText">广东-广州-海珠-艺苑南路13号大院布衣港电商园11栋1楼（地铁站客村站D出口）</div>
        <div :class="$style.msgArrow"></div>
      </div>
      <p :class="$style.line"></p>
      <div :class="$style.msgItem">
        <div :class="[$style.msgIcon, $style.phoneIcon]"></div>
        <div :class="$style.msgText">
          <span>87123458</span>,
          <span>87123458</span>,
          <span>87123458</span>,
          <span>87123458</span>
        </div>
        <div :class="$style.msgArrow"></div>
      </div>
    </div>
    <div :class="$style.products">
      <div :class="$style.productsTop">
        <div :class="$style.productsTitle">在售商品</div>
        <div :class="$style.productsMore">
          <span>更多</span>
          <i :class="$style.msgArrow"></i>
        </div>
      </div>
      <p :class="$style.line"></p>
      <div :class="$style.productCon">
        <div :class="$style.productItem">
          <div :class="$style.productImg">
            <img src="http://cdn01.dwfei.com/img/sell/b5665652ea634ddd8a36d6f3142433ba.jpg">
          </div>
          <div :class="$style.productTitle">
            欧洲百年品牌 BH椭圆机欧洲百年品牌 BH椭圆机
          </div>
          <div :class="$style.productPrice">
            ¥2880.00
          </div>
        </div>
        <div :class="$style.productItem">
          <div :class="$style.productImg">
            <img src="http://cdn01.dwfei.com/img/banner/02/mangu2.jpg">
          </div>
          <div :class="$style.productTitle">
            欧洲百年品牌 BH椭圆机欧洲百年品牌 BH椭圆机
          </div>
          <div :class="$style.productPrice">
            ¥2880.00
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.intr" v-html="`所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。 “泵感”是衡量健美训练是否有效的一个标志。`"></div>
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
@import '~tool/vendor'

.info
  background $white
  margin-bottom 12px
.avatar
  position relative
  height (250/20)rem
  overflow hidden
  img
    position relative
    display block
    height 100%
    left 50%
    transform translateX(-50%)
.moreImg
  position absolute
  right 12px
  bottom 12px
  padding 6px 12px 6px 31px
  color $white
  font-size 14px
  background rgba(0, 0, 0, .6)
  border-radius 15px
  &:before
    content ''
    position absolute
    left 12px
    top 50%
    transform translateY(-50%)
    width 16px
    height 16px
    background url('~public/fm_img.svg') no-repeat
    background-size 100% 100%
.title
  padding 18px
  font-size 16px

.msg
  background $white
  margin-bottom 12px
.msgItem
  padding 12px 18px
  display flex
  align-items center
  font-size 14px
.msgIcon
  flex 0 0 auto
  margin-right (12/20)rem
  width 28px
  height 28px
  background-repeat no-repeat
  background-size 100% 100%
  &.locationIcon
    background-image url('~public/fm_list_locate.svg')
  &.phoneIcon
    background-image url('~public/fm_list_call.svg')
.msgText
  margin-right 12px
  >span
    white-space nowrap
.msgArrow
  flex 0 0 auto
  height 16px
  width 16px
  background url('~public/fm_goto.svg') no-repeat
  background-size 100% 100%
.line
  margin-left 18px
  height 1px
  background $breakline

.products
  background $white
  margin-bottom 10px
.productsTop
  padding 12px 18px
  display flex
  justify-content space-between
.productsTitle
  font-size 16px
.productsMore
  display flex
  align-items center
  >span
    color $assistText
    margin-right 6px
.productCon
  display flex
  padding 18px (18/20)rem
.productItem
  width (160/20)rem
  &:not(:first-child)
    margin-left (18/20)rem
.productImg
  height (160/20)rem
  overflow hidden
  img
    display block
    height 100%
    position relative
    left 50%
    transform translateX(-50%)
.productTitle
  margin-top 8px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  font-size 13px
.productPrice
  font-size 15px
  color $price

.intr
  padding 36px 24px
</style>
    
</style>
