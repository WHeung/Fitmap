<template>
  <div :class="$style.main" :style="style">
    <div :class="$style.item" v-for="(pic,index) in picList" :key="pic" @click="preview" @animationend="animationend($event, pic, index)">
      <img :src="pic.url">
    </div>
    <div :class="$style.mask" v-if="previewData.show" @click="closeMask">
      <!-- <img :src="previewData.src"> -->
      <swiper :class="$style.containerClass" :options="option" ref="swiper">
        <swiperSlide v-for="pic in picList" :key="pic">
          <img :src="pic.url">
        </swiperSlide>
      </swiper>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'pic-View',
  components: { swiper, swiperSlide },
  data () {
    return {
      style: null,
      previewData: {
        show: false,
        src: ''
      },
      picList: [],
      lockPreview: false,
      option: {}
    }
  },
  created () {
    this.style = {
      'min-height': window.innerHeight + 'px'
    }
    this.option = {
      initialSlide: 0,
      debugger: true,
      slideClass: this.$style.slideClass,
      wrapperClass: this.$style.swiperWrapper
    }
    this.$store.dispatch(Types.FALL_BUCKET, { id: 'MERCHANT_PIC' }).then(data => {
      if (data && data.length) {
        this.picList = data
        this.$store.dispatch(Types.CHANGE_NAV, { title: `${data.label} Fit-map` })
        this.$store.dispatch(Types.CLOSE_LOADING)
      } else {
        this.$router.back()
      }
    })
  },
  methods: {
    preview (e) {
      if (this.lockPreview) {
        return
      }
      const el = e.path[1]
      el.className += ' ' + this.$style.animat
      this.lockPreview = true
    },
    animationend (e, pic, index) {
      this.option.initialSlide = index
      Object.assign(this.previewData, {
        show: true,
        src: pic
      })
      e.target.className = this.$style.item
      this.lockPreview = false
    },
    closeMask () {
      this.previewData = {
        show: false,
        src: ''
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  column-count 2
  column-gap (6/20)rem
  width 100%
  padding 0 (6/20)rem
  overflow hidden
  box-sizing border-box
  background $blackBg

.item
  break-inside avoid
  box-sizing border-box
  padding-top 6px
  >img
    display block
    width 100%

@keyframes preview
  from
    position fixed
    top 50%
    left 50%
    width 0%
    transform translateY(-50%)
    z-index 10
  to
    position fixed
    width 100%
    top 50%
    left 0
    transform translateY(-50%)
    z-index 10

.animat
  animation preview 1s

.mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0 ,.5)
  z-index 11

.containerClass
  height 100%
  display flex
.swiperWrapper
  display flex
  height 100%
  align-items center
.slideClass
  img
    display block
    width 100%
</style>
