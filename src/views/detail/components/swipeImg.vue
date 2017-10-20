<template>
  <div :class="$style.main">
    <swiper :class="$style.containerClass" :options="swiperOption" ref="swiper">
      <swiperSlide :class="{[$style.square]: type === 'product'}" v-for="img in imgs" :key="img">
        <img :src="img">
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

.swiperPagination
  display flex
  align-items center
  position absolute
  left 50%
  transform translateX(-50%)
  bottom (24/20)rem
  >span
    width 5px
    height 5px
    border 1px solid $white
    &:not(:first-child)
      margin-left 6px

.currentPagination
  border-width 2px
</style>
