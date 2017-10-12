<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <SwipeImg type="post" v-if="postType !== 'bid'"></SwipeImg>
      <div :class="$style.titleMsg">
        <div :class="$style.title">PumpFit泵感健PumpFit泵感健身PumpFit泵感健身（客村店）</div>
        <div :class="$style.date">2017-09-10</div>
      </div>
    </div>
    <AroundMsg :class="$style.item" :aroundMsg="aroundMsg"></AroundMsg>
    <ContactItem :class="$style.item"></ContactItem>
    <template v-if="postType === 'bid'">
      <TextItem :class="$style.textItem" title="岗位介绍" content="所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。"></TextItem>
      <TextItem :class="$style.textItem" title="公司介绍" content="所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。"></TextItem>
      <CompanyCard :class="$style.companyCard"></CompanyCard>
    </template>
    <template v-else>
      <div :class="$style.intr" v-html="`所谓泵感，就是目标肌肉在相当强度的抗阻力训练后，导致大量的血液涌向目标肌肉，此时，肌肉会产生膨胀的感觉，称为泵感，这个过程称为泵血。 “泵感”是衡量健美训练是否有效的一个标志。`"></div>
    </template>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import TextItem from '../components/textItem.vue'
import CompanyCard from '../components/companyCard.vue'
import SwipeImg from '../components/swipeImg.vue'
import AroundMsg from '../components/aroundItem.vue'
import ContactItem from '../components/contactItem.vue'

export default {
  name: 'bid-View',
  components: { TextItem, CompanyCard, SwipeImg, AroundMsg, ContactItem },
  data () {
    return {
      postType: 'lease' // lease, transfer, recruit, bid
    }
  },
  computed: {
    aroundMsg () {
      return [
        {
          name: '面积',
          value: '100㎡'
        }, {
          name: '价格',
          value: '¥ 10000/月',
          color: 'red'
        }, {
          name: '位置',
          value: '广州-番禺'
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
.date
  margin-top 12px
  font-size 12px
  color $assistText

.productMsg
  margin-bottom 12px
  padding 18px 0
  display flex
  justify-content space-around
  background $white
.productItem
  flex 1 1 auto
  display inline-flex
  flex-direction column
  align-items center
  &:not(:first-child)
    border-left 1px solid $breakline
.productName
  margin-bottom 8px
  font-size 12px
  color $assistText
.productCon
  font-size 14px

.textItem
  margin-bottom 12px

.intr
  background $white
  padding 36px (24/20)rem

</style>
    