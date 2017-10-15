<template>
  <div :class="$style.main">
    <div :class="$style.infoGroup">
      <Item title="姓名">
        <input v-model="form.name" placeholder="请填写真实姓名" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="城市">
        <div :class="$style.select" @click="openMask('area')">
          <template v-if="!form.area">
            请选择
          </template>
          <template v-else>
            {{form.area}}
          </template>
        </div>
      </Item>
    </div>
    <div :class="$style.infoGroup">
      <Item title="公司">
        <input v-model="form.company" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="职务">
        <div :class="$style.select" @click="openMask('job')">
          <template v-if="!form.job">
            请选择
          </template>
          <template v-else>
            {{form.job}}
          </template>
        </div>
      </Item>
    </div>
    <Btn :class="$style.btn" type="blue" title="提交" :disabled="disabled" @clickBtn="clickBtn"></Btn>
    <div :class="$style.maskLayer" v-if="mask">
      <div :class="$style.mask">
      </div>
      <div :class="$style.multiPicker">
        <div :class="$style.pickerBtns">
          <button @click="closeMask">取消</button>
          <button @click="selectArea">确定</button>
        </div>
        <div :class="$style.pickerCon" v-if="mask === 'area'">
          <swiper :class="$style.containerClass" :options="provOption" ref="provSwiper">
            <swiperSlide v-for="(province,key) in provinces" :key="key">{{province}}</swiperSlide>
          </swiper>
          <swiper :class="$style.containerClass" :options="cityOption" ref="citySwiper">
            <swiperSlide v-for="(city,key) in citys" :key="key">{{city}}</swiperSlide>
          </swiper>
        </div>
        <div :class="$style.pickerCon" v-if="mask === 'job'">
          <swiper :class="$style.containerClass" :options="jobOption" ref="jobSwiper">
            <swiperSlide v-for="(job, key) in jobs" :key="key">{{job}}</swiperSlide>
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

const validConfig = [
  {
    case: 'name',
    data: ['name'],
    errorMsg: ['姓名字符过长']
  }
]

export default {
  name: 'coummateInfo-view',
  components: { Item, Btn, swiper, swiperSlide },
  data () {
    return {
      form: {
        name: '',
        area: '',
        company: '',
        job: ''
      },
      swiperOption: {
        notNextTick: true,
        initialSlide: 0,
        direction: 'vertical',
        centeredSlides: true,
        slideToClickedSlide: true,
        debugger: true,
        slidesPerView: 'auto'
      },
      provOption: {},
      cityOption: {},
      jobOption: {},
      selectedArea: {},
      provIndex: 0,
      cityIndex: 0,
      jobIndex: 0,
      mask: null,
      jobs: ['Boss', '教练', '运营']
    }
  },
  watch: {
    selectedArea: {
      handler (val) {
        if (val.prov && val.city) {
          this.form.area = `${val.prov.name}-${val.city.name}`
        }
      }
    }
  },
  computed: {
    provinces () {
      return area[86]
    },
    provinceKey () {
      const keys = Object.keys(area[86])
      return keys[this.provIndex]
    },
    citys () {
      const keys = Object.keys(area[86])
      return area[this.provinceKey]
    },
    cityKey () {
      const keys = Object.keys(this.citys)
      return keys[this.cityIndex]
    },
    provSwiper () {
      return this.$refs.provSwiper ? this.$refs.provSwiper.swiper : {}
    },
    citySwiper () {
      return this.$refs.citySwiper ? this.$refs.citySwiper.swiper : {}
    },
    disabled () {
      let disabled = true
      if (this.form.name && this.form.area && this.form.company && this.form.job) {
        disabled = false
      }
      return disabled
    }
  },
  created () {
    Object.assign(this.swiperOption, { // 需要用到this的属性
      slideClass: this.$style.slideClass,
      slideActiveClass: this.$style.slideActiveClass,
      wrapperClass: this.$style.swiperWrapper,
      containerModifierClass: this.$style.containerClass
    })
    Object.assign(this.provOption, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.provIndex = swiper.activeIndex
      }
    })
    Object.assign(this.cityOption, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.cityIndex = swiper.activeIndex
      }
    })
    Object.assign(this.jobOption, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.jobIndex = swiper.activeIndex
      }
    })
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    openMask (type) {
      this.mask = type
    },
    closeMask () {
      this.mask = null
    },
    selectArea () {
      if (this.mask === 'area') {
        if (this.provinceKey && this.cityKey) {
          this.selectedArea = {
            prov: {key: this.provinceKey, name: area[86][this.provinceKey]},
            city: {key: this.cityKey, name: area[this.provinceKey][this.cityKey]}
          }
          this.provOption.initialSlide = this.provIndex
          this.cityOption.initialSlide = this.cityIndex
        }
      }
      if (this.mask === 'job') {
        this.form.job = this.jobs[this.jobIndex]
      }
      this.closeMask()
    },
    clickBtn () {
      this.$router.push({ name: 'mapIndexView' })
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
