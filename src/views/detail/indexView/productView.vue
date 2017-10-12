<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <SwipeImg type="product"></SwipeImg>
      <div :class="$style.titleMsg">
        <div :class="$style.title">PumpFit泵感健PumpFit泵感健身PumpFit泵感健身（客村店）</div>
        <div :class="$style.price">¥ 1280.00</div>
      </div>
    </div>
    <CompanyCard :class="$style.item"></CompanyCard>
    <AroundMsg :class="$style.item" :aroundMsg="aroundMsg"></AroundMsg>
    <div :class="$style.intr" v-html="`所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。 “泵感”是衡量健美训练是否有效的一个标志。`"></div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import CompanyCard from '../components/companyCard.vue'
import SwipeImg from '../components/swipeImg.vue'
import AroundMsg from '../components/aroundItem.vue'

export default {
  name: 'product-View',
  components: { CompanyCard, SwipeImg, AroundMsg },
  computed: {
    aroundMsg () {
      return [
        {
          name: '商品类型',
          value: '有氧健身器材'
        }, {
          name: '品牌',
          value: '必艾奇BH'
        }
      ]
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.item
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
.titleMsg
  padding 18px
.title
  font-size 16px
.price
  margin-top 12px
  font-size 20px
  color $price

.intr
  background $white
  padding 36px (24/20)rem

</style>
    