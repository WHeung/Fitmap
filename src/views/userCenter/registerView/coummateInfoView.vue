<template>
  <div :class="$style.main">
    <div :class="$style.infoGroup">
      <Item title="姓名">
        <input v-model="user.name" placeholder="请填写真实姓名" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="城市">
        <div :class="$style.select" @click="openMask('area')">
          <template v-if="!positionData">
            请选择
          </template>
          <template v-else>
            {{positionData}}
          </template>
        </div>
      </Item>
    </div>
    <div :class="$style.infoGroup">
      <Item title="公司">
        <input v-model="user.company" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="职务">
        <div :class="$style.select" @click="openMask('job')">
          <template v-if="!user.position">
            请选择
          </template>
          <template v-else>
            {{user.position}}
          </template>
        </div>
      </Item>
    </div>
    <Btn :class="$style.btn" type="blue" title="提交" :disabled="disabled" @clickBtn="clickBtn"></Btn>
    <BottomMask
      :province="user.province" :city="user.city"
      :position="user.position" @maskClose="maskClose" :mask="mask"
      @maskEnsure="maskEnsure"></BottomMask>
  </div>
</template>
<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'
import Btn from '~src/components/Btn.vue'
import routerReplace from '~src/tool/routerReplace.js'
import BottomMask from '../components/bottomMask.vue'
export default {
  name: 'coummateInfo-view',
  components: { Item, Btn, BottomMask },
  data () {
    return {
      user: {
        name: '',
        province: '',
        city: '',
        company: '',
        position: ''
      },
      mask: ''
    }
  },
  computed: {
    positionData () {
      if (this.user.province && this.user.city) {
        return `${this.user.province}-${this.user.city}`
      } else {
        return ''
      }
    },
    disabled () {
      let disabled = true
      if (this.user.name && this.positionData && this.user.company && this.user.position) {
        disabled = false
      }
      return disabled
    }
  },
  created () {
    this.$store.dispatch(Types.CHANGE_NAV, { title: `完善信息 Fit-map` })
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    openMask (type) {
      this.mask = type
    },
    maskClose () {
      this.mask = ''
    },
    maskEnsure ({ type, data }) {
      if (type === 'position') {
      }
      if (type === 'area') {
      }
      Object.assign(this.user, data)
    },
    clickBtn () {
      this.$store.dispatch(Types.UPDATE_USER, { data: this.user }).then(() => {
        this.$store.commit(Types.SET_USER, { 'is_company_checked': true })
        if (this.$route.query.toRoute) {
          const toRoute = JSON.parse(this.$route.query.toRoute)
          routerReplace(this, toRoute)
          return
        }
        routerReplace(this, { name: 'mapIndexView' })
      })
    }
  }
}
</script>
<style lang="stylus" module>
@import '~tool/vendor'
.main
  background $mainBg
.line
  height 1px
  margin-left 18px
  background $breakline
.infoGroup
  background $white
  margin-bottom 12px
  input
    width 100%
.select
  flex-grow 1
  position relative
  &:after
    content ''
    position absolute
    width 16px
    height 16px
    background url('~src/public/fm_dropdown.svg') no-repeat
    background-size 100% 100%
    top 50%
    right 0
    transform translateY(-50%)
.code
  display inline-flex
  justify-content space-between
  >button
    padding 5px 0
    width (96/20)rem
    font-size 12px
    border 1px solid $mainText
    border-radius 100px
.notClick
  opacity .3
.btn
  margin-top 36px !important
.maskLayer
  position fixed
  top 0
  left 0
  right 0
  bottom 0
.mask
  position absolute
  width 100%
  height 100%
  background rgba(0, 0, 0, .5)
  z-index 0
.multiPicker
  position absolute
  bottom 0
  width (375/20)rem
  font-size 16px
  background $white
  z-index 1
.pickerBtns
  display flex
  justify-content space-between
  box-sizing border-box
  border-bottom 1px solid $breakline
  >button
    color $link
    padding 13px 18px
    &:active
      opacity .6
.pickerCon
  position relative
  display flex
  height 252px
  overflow hidden
  &:after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
    height 36px
    width 100%
    box-sizing border-box
    border-top 1px solid $breakline
    border-bottom 1px solid $breakline
.containerClass
  flex 1 1 0
.slideClass
  text-align center
  line-height 36px
  box-sizing border-box
  color $assistText
.slideActiveClass
  color $mainText
</style>
