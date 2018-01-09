<template>
  <transition name="mask-layer">
    <div :class="$style.maskLayer" v-if='mask'>
      <div :class="$style.mask" @click="closeMask"></div>
      <div :class="$style.multiPicker">
        <div :class="$style.pickerBtns">
          <button @click="closeMask">取消</button>
          <button @click="clickEnsure">确定</button>
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
  </transition>
</template>
<script>
import area from 'china-area-data'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'bottom-mask',
  components: { swiper, swiperSlide },
  props: ['mask', 'province', 'city', 'position'],
  data () {
    return {
      swiperOption: null,
      provOption: null,
      cityOption: null,
      jobOption: null,
      provIndex: 0,
      cityIndex: 0,
      jobIndex: 0,
      jobs: ['Boss', '教练', '运营']
    }
  },
  computed: {
    provinces () {
      return area[86]
    },
    provinceKeys () {
      return Object.keys(area[86])
    },
    provinceKey () {
      return this.provinceKeys[this.provIndex]
    },
    citys () {
      return area[this.provinceKey]
    },
    cityKeys () {
      return Object.keys(this.citys)
    },
    cityKey () {
      return this.cityKeys[this.cityIndex]
    }
  },
  created () {
    this.swiperOption = {
      notNextTick: true,
      initialSlide: 0,
      direction: 'vertical',
      centeredSlides: true,
      slideToClickedSlide: true,
      debugger: true,
      slidesPerView: 'auto',
      slideClass: this.$style.slideClass,
      slideActiveClass: this.$style.slideActiveClass,
      wrapperClass: this.$style.swiperWrapper,
      containerModifierClass: this.$style.containerClass
    }
    this.provOption = Object.assign({}, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.provIndex = swiper.activeIndex
      }
    })
    if (this.province) {
      const provIndex = this.provinceKeys.findIndex(item => {
        return this.provinces[item] === this.province
      })
      this.provIndex = provIndex
      this.provOption.initialSlide = provIndex || 0
    }
    this.cityOption = Object.assign({}, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.cityIndex = swiper.activeIndex
      }
    })
    if (this.city) {
      const cityIndex = this.cityKeys.findIndex(item => {
        return this.citys[item] === this.city
      })
      this.cityIndex = cityIndex
      this.cityOption.initialSlide = cityIndex || 0
    }
    this.jobOption = Object.assign({}, this.swiperOption, {
      onSlideChangeEnd: (swiper) => {
        this.jobIndex = swiper.activeIndex
      }
    })
    if (this.position) {
      const positionIndex = this.jobs.findIndex(item => {
        return item === this.position
      })
      this.jobOption.initialSlide = positionIndex || 0
    }
  },
  methods: {
    closeMask () {
      this.$emit('maskClose')
    },
    clickEnsure () {
      if (this.mask === 'area') {
        if (this.provinceKey && this.cityKey) {
          const selectedArea = {
            province: area[86][this.provinceKey],
            city: area[this.provinceKey][this.cityKey]
          }
          this.provOption.initialSlide = this.provIndex
          this.cityOption.initialSlide = this.cityIndex
          this.$emit('maskEnsure', { type: 'area', data: selectedArea })
        }
      }
      if (this.mask === 'job') {
        const job = this.jobs[this.jobIndex]
        this.$emit('maskEnsure', { type: 'position', data: { position: job }})
      }
      this.closeMask()
    }
  }
}
</script>
<style lang="stylus" module>
@import '~tool/vendor'
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
<style lang="stylus">
.mask-layer-enter-active
  transition all .3s ease
.mask-layer-leave-active
  transition all .3s ease
.mask-layer-enter,
.mask-layer-leave-active
  opacity 0
</style>
