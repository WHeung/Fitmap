<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <SwipeImg type="product" :imgs="data.images"></SwipeImg>
      <div :class="$style.titleMsg">
        <div :class="$style.title">{{data.title}}</div>
        <div :class="$style.price">{{data.price}}</div>
      </div>
    </div>
    <CompanyCard :class="$style.item" :data="data.merchant"></CompanyCard>
    <AroundMsg :class="$style.item" :aroundMsg="aroundMsg"></AroundMsg>
    <div :class="$style.intr" v-if="data.content" v-html="data.content"></div>
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
  props: ['data'],
  computed: {
    aroundMsg () {
      return [
        {
          name: '商品类型',
          value: this.data.type
        }, {
          name: '品牌',
          value: this.data.brand
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
    