<template>
  <div :class="$style.main" :style="style">
    <waterfall :class="$style.waterfall"
      :line-gap="remTopx(187.5/20)"
      align="left"
      @reflowed="reflowed"
      :watch="update">
      <waterfall-slot
        :class="$style.waterfallSlot"
        v-for="(pic,index) in picList"
        :width="remTopx(178.5/20)"
        :height="imgH(pic.url, remTopx(178.5/20))"
        :order="index"
        :key="index">
      <!-- <div :class="$style.imgDiv"> -->
        <img :src="pic.url" @click="clickImg(pic.url, index)">
      <!-- </div> -->
      </waterfall-slot>
    </waterfall>
    <!-- <div :class="$style.list" ref="list">
      <div :class="$style.item"
      v-for="(pic,index) in picList" :key="index" ref="items">
        <div :class="$style.imgDiv">
          <img :src="pic.url" @click="clickImg(pic.url, index)">
        </div>
      </div>
    </div> -->
    <div :class="$style.mask" v-if="activePic || previewData.show">
      <img :src="activePic.url" :class="$style.animat"
      v-if="activePic && activePic.url" @animationend="animationend">
      <div :class="$style.container" v-if="previewData.show" @click="closeMask">
        <swiper :class="$style.containerClass" :options="option" ref="swiper">
          <swiperSlide v-for="(pic,index) in picList" :key="index">
            <img :src="pic.url">
          </swiperSlide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import { Waterfall, WaterfallSlot } from 'vue-waterfall'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'pic-View',
  components: { swiper, swiperSlide, Waterfall, WaterfallSlot },
  props: ['data'],
  data () {
    return {
      style: null,
      previewData: {
        show: false
      },
      activePic: null,
      picList: [],
      lockPreview: false,
      option: {},
      update: 0
    }
  },
  created () {
    console.log(this.data)
    this.$store.dispatch(Types.OPEN_LOADING)
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
        this.$store.dispatch(Types.CHANGE_NAV, { title: `更多图片 Fit-map` })
        this.$nextTick(() => {
          setTimeout(() => {
            this.$store.dispatch(Types.CLOSE_LOADING)
          }, 500)
        })
      } else {
        this.$router.back()
      }
    })
  },
  mounted () {
  },
  methods: {
    reflowed (vm) {
      const children = vm.$children
      const result = children.find(item => {
        return item.height === 0
      })
      if (result) {
        setTimeout(() => {
          this.update++
        }, 500)
      }
    },
    imgH (src, width) {
      const image = new Image()
      image.src = src
      if (image.height && image.width) {
        const height = image.height / image.width * width
        return height
      } else {
        return 0
      }
    },
    remTopx (num) {
      const rem = parseFloat(window.document.documentElement.style.fontSize)
      return parseInt(num * rem)
    },
    animationend (e, pic, index) {
      this.option.initialSlide = this.activePic.index
      this.activePic = null
      Object.assign(this.previewData, {
        show: true
      })
      this.lockPreview = false
    },
    closeMask () {
      this.previewData = {
        show: false,
        src: ''
      }
    },
    clickImg (url, index) {
      this.activePic = {
        url: url,
        index: index
      }
    },
    initImgs () {
      const list = this.$refs.items
      const itemW = list[0].offsetWidth
      const itemH = []
      const length = list.length
      setPosition(list, 0, itemH, length, itemW)
    }
  }
}
function setPosition (list, i, itemH, length, itemW) {
  if (i >= length) {
    return
  }
  if (i < 2) {
    const Img = list[i].children[0].children[0]
    if (Img && Img.height) {
      itemH.push(list[i].offsetHeight)
      setPosition(list, i + 1, itemH, length, itemW)
    } else {
      Img.onload = () => {
        itemH.push(list[i].offsetHeight)
        setPosition(list, i + 1, itemH, length, itemW)
      }
    }
  } else {
    const Img = list[i - 2].children[0].children[0]
    const index = i % 2
    if (Img && Img.width > 50) {
      list[i].style.cssText = `;position:absolute;left:${itemW * index}px;top:${itemH[index]}px`
      // 这一步很重要，防止剩下图片全都定位在同一坐标
      itemH[index] += list[i].offsetHeight
      setPosition(list, i + 1, itemH, length, itemW)
    } else {
      Img.onload = () => {
        list[i].style.cssText = `;position:absolute;left:${itemW * index}px;top:${itemH[index]}px`
        // 这一步很重要，防止剩下图片全都定位在同一坐标
        itemH[index] += list[i].offsetHeight
        setPosition(list, i + 1, itemH, length, itemW)
      }
    }
  }
}

</script>

<style lang="stylus" module>
@import '~tool/vendor'
/*
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
*/
.main
  position absolute
  top 0
  left 0
  min-width 100%
  background $blackBg
  

.item
  float left
  padding 6px 0 0 (6/20)rem

.waterfall
  background $blackBg
.waterfallSlot
  padding 6px 0 0 (6/20)rem
  img
    display block
    width 100%

.imgDiv
  width (178.5/20)rem
  overflow hidden
  img
    padding 0
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
  animation preview .5s

.mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0, 0, 0 ,1)
  z-index 11
  opacity 1
  transition .3s all linear

.container
  height 100%
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
