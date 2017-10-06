<template>
  <div :class="$style.main">
    <div :class="$style.infoGroup">
      <Item title="姓名">
        <input v-model="form.name" placeholder="请填写真实姓名" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="城市">
        <div :class="$style.select">
          请选择
        </div>
      </Item>
    </div>
    <div :class="$style.infoGroup">
      <Item title="公司">
        <input v-model="form.company" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="职务">
        <div :class="$style.select">
          请选择
        </div>
      </Item>
    </div>
    <Btn :class="$style.btn" type="blue" title="提交"></Btn>
    <div :class="$style.maskLayer">
      <div :class="$style.mask">
      </div>
      <div :class="$style.multiPicker">
        <div :class="$style.pickerBtns">
          <button>取消</button>
          <button>确定</button>
        </div>
        <div :class="$style.pickerCon">
          <swiper :options="provOption" ref="provSwiper">
            <swiperSlide v-for="(province,key) in provinces" :key="key">{{province}}</swiperSlide>
          </swiper>
          <swiper :options="cityOption" ref="citySwiper">
            <swiperSlide v-for="(city,key) in citys" :key="key">{{city}}</swiperSlide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import area from 'china-area-data'
import Item from './components/item.vue'
import valid from '~src/tool/verification'
import Btn from '~src/components/Btn.vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

const mobileConfig = [
  {
    case: 'noBlank',
    data: ['mobile'],
    errorMsg: ['请填手机号码']
  },
  {
    case: 'mobilePhone',
    data: ['mobile'],
    errorMsg: ['手机号码格式错误']
  }
]

export default {
  name: 'baseinfo-view',
  components: { Item, Btn, swiper, swiperSlide },
  data () {
    return {
      cityForm: {
        provinceKey: '',
        cityKey: ''
      },
      form: {
        name: '',
        city: '',
        company: '',
        job: ''
      },
      inSeconds: '',
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        direction: 'vertical',
        centeredSlides: true,
        slideToClickedSlide: true,
        debugger: true,
        slidesPerView: 'auto',
      },
      provOption: {},
      cityOption: {},
      provIndex: 0
    }
  },
  computed: {
    provinces () {
      return area[86]
    },
    citys () {
      const keys = Object.keys(area[86])
      return area[keys[this.provIndex]]
    },
    provSwiper () {
      return this.$refs.provSwiper ? this.$refs.provSwiper.swiper : {}
    },
    citySwiper () {
      return this.$refs.citySwiper ? this.$refs.citySwiper.swiper : {}
    }
  },
  watch: {
    'provSwiper.activeIndex': (val) => {
      console.log(val)
    }
  },
  created () {
    Object.assign(this.swiperOption, { // 需要用到this的属性
      slideClass: this.$style.slideClass,
      slideActiveClass: this.$style.slideActiveClass,
      wrapperClass: this.$style.swiperWrapper
    })
    Object.assign(this.provOption, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.provIndex = swiper.activeIndex
      }
    })
    Object.assign(this.cityOption, this.swiperOption)
    this.$store.dispatch(Types.CLOSE_LOADING)
    console.log(Object.keys(area[86]))
  },
  methods: {
    getCode () {
      if (valid({mobile: this.dcellphone}, mobileConfig)) {
        this.inSeconds = 60
        let interval = setInterval(() => {
          this.inSeconds--
          if (this.inSeconds === 0) {
            clearInterval(interval)
            interval = null
          }
        }, 1000)
      }
      this.$store.dispatch(Types.OPEN_POPUP, {
        title: '验证码错误',
        word: '您输入的验证码有误，请重新输入',
        leftMsg: '确定'
      })
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

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
  >div
    width 50%
.slideClass
  text-align center
  line-height 36px
  box-sizing border-box
  color $assistText
.slideActiveClass
  color $mainText

</style>
