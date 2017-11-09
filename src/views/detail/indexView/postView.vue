<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <SwipeImg type="post" v-if="data.label !== '人员招聘'" :imgs="data.images"></SwipeImg>
      <div :class="$style.titleMsg">
        <div :class="$style.title">{{data.title}}</div>
        <div :class="$style.date">{{data.created_at}}</div>
      </div>
    </div>
    <AroundMsg :class="$style.item" :aroundMsg="aroundMsg"></AroundMsg>
    <ContactItem :class="$style.item" @toMap="toMap"
    :location="data.location" :telephones="data.telephones"></ContactItem>
    <template v-if="data.label === '人员招聘'">
      <TextItem :class="$style.textItem" title="岗位介绍" :content="data.job_content"></TextItem>
      <TextItem :class="$style.textItem" title="任职要求" :content="data.job_content"></TextItem>
      <TextItem :class="$style.textItem" title="公司介绍" :content="data.content"></TextItem>
      <CompanyCard :class="$style.companyCard" :data="data.merchant"></CompanyCard>
    </template>
    <template v-else>
      <div :class="$style.intr" v-html="data.content"></div>
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
  props: ['data'],
  data () {
    return {
      postType: '' // lease, transfer, recruit, bid
    }
  },
  computed: {
    aroundMsg () {
      let msg = null
      if (this.data) {
        if (this.data.label === '场地租赁' || this.data.label === '转让信息') {
          msg = [
            {
              name: '面积',
              value: this.data.area
            }, {
              name: '价格',
              value: this.data.price,
              color: 'red'
            }, {
              name: '位置',
              value: this.data.position_content
            }
          ]
        }
        if (this.data.label === '设计招标') {
          msg = [
            {
              name: '面积',
              value: this.data.area
            }, {
              name: '位置',
              value: this.data.position_content
            }
          ]
        }
        if (this.data.label === '人员招聘') {
          msg = [
            {
              name: '薪资',
              value: this.data.price,
              color: 'red'
            }, {
              name: '位置',
              value: this.data.position_content
            }
          ]
        }
      }
      return msg
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    toMap () {
      this.$store.dispatch(Types.FILL_BUCKET, {
        id: 'MAP_LOCATION',
        data: this.data
      })
      this.$router.push({ name: 'mapNavigateView' })
    }
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
    