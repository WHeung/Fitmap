<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <div :class="$style.avatar">
        <img :src="data.images[0]">
        <div :class="$style.moreImg" v-if="data.label !== 'equip'" @click="seeMorePic">更多</div>
      </div>
      <div :class="$style.title">{{data.title}}</div>
    </div>
    <ContactItem :class="$style.item" @toMap="toMap"
    :location="data.location_obj" :telephones="data.telephones"></ContactItem>
    <div :class="$style.item" v-if="data.label === 'equip'">
      <div :class="$style.productsTop">
        <div :class="$style.productsTitle">在售商品</div>
        <div :class="$style.productsMore">
          <span>更多</span>
          <i :class="$style.msgArrow"></i>
        </div>
      </div>
      <p :class="$style.line"></p>
      <div :class="$style.productCon">
        <div :class="$style.productItem" @click="toProduct(item.id)"
        v-for="item in data.items.slice(0, 2)" :key="item.id">
          <div :class="$style.productImg">
            <img :src="item.images[0]">
          </div>
          <div :class="$style.productTitle">
            {{item.title}}
          </div>
          <div :class="$style.productPrice">
            {{item.price}}
          </div>
        </div>
      </div>
    </div>
    <div :class="[$style.item, $style.intr]" v-html="data.content"></div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import ContactItem from '../components/contactItem.vue'

export default {
  name: 'merchant-View',
  components: { ContactItem },
  props: ['data'],
  data () {
    return {
      merchantType: '' // gym, design, train, equip
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    seeMorePic () {
      this.$store.dispatch(Types.FILL_BUCKET, {
        id: 'MERCHANT_PIC',
        data: this.data.images
      })
      this.$router.push({ name: 'detailPicView', params: { id: this.data.id, type: 'merchant' }})
    },
    toProduct (id) {
      this.$router.push({ name: 'detailView', params: { type: 'product', id: id }})
    },
    toMap () {
      this.$store.dispatch(Types.FILL_BUCKET, {
        id: 'MAP_LOCATION',
        data: this.data
      })
      this.$router.push({ name: 'mapIndexView' })
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.item
  margin-bottom 12px
  background $white

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
.intr
  padding 36px 24px
</style>
