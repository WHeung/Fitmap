<template>
  <div :class="$style.main">
    <swiper :class="$style.containerClass" :options="swiperOption" ref="swiper">
      <swiperSlide :class="{[$style.square]: type === 'product'}" v-for="img in imgs" :key="img.id">
        <img :src="img.url" @load="imgLoad">
        <div :class="$style.shadow"></div>
      </swiperSlide>
      <div :class="$style.swiperPagination" slot="pagination" id="pagination"></div>
    </swiper>
  </div> 
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'swipe-img',
  components: { swiper, swiperSlide },
  props: ['type', 'imgs'],
  data () {
    return {
      swiperOption: {
        initialSlide: 0,
        debugger: true,
        pagination: '#pagination'
      }
    }
  },
  created () {
    Object.assign(this.swiperOption, { // 需要用到this的属性
      slideClass: this.$style.slideClass,
      wrapperClass: this.$style.swiperWrapper,
      paginationCurrentClass: this.$style.currentPagination
    })
  },
  methods: {
    imgLoad (e) {
      const img = e.path[0]
      let scale = 1.5
      if (this.type === 'product') {
        scale = 1
      }
      if (img.width / img.height < scale) {
        Object.assign(img.style, {
          height: 'auto',
          width: '100%',
          left: 'unset',
          top: '50%',
          transform: 'translateY(-50%)'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.swiper-pagination-bullet.swiper-pagination-bullet-active
  border-width 2px
  background #fff
</style>
<style lang="stylus" module>
@import '~tool/vendor'
  
.containerClass
  position relative
  overflow hidden
.swiperWrapper
  display flex
.slideClass
  flex 0 0 auto
  position relative
  width 100%
  height (250/20)rem
  overflow hidden
  &.square
    height (375/20)rem
  img
    position absolute
    display block
    height 100%
    left 50%
    transform translateX(-50%)
    z-index 1

.swiperPagination
  display flex
  align-items center
  position absolute
  left 50%
  transform translateX(-50%)
  bottom (24/20)rem
  z-index 3
  >span
    width 5px
    height 5px
    border 1px solid $white
    &:not(:first-child)
      margin-left 6px

.currentPagination
  border-width 2px

.shadow
  position absolute
  width 100%
  height 120px
  bottom 0
  background-image linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.15) 100%)
  z-index 2
</style>
