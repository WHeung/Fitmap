<template>
  <div :class="$style.main" :style="style">
    <div :class="$style.item" v-for="pic in picList" :key="pic" @click="preview" @animationend="animationend($event, pic)">
      <img :src="pic">
    </div>
    <div :class="$style.mask" v-if="previewData.show" @click="closeMask">
      <img :src="previewData.src">
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'

export default {
  name: 'pic-View',
  data () {
    return {
      style: null,
      previewData: {
        show: false,
        src: ''
      },
      picList: [],
      lockPreview: false
    }
  },
  created () {
    this.style = {
      'min-height': window.innerHeight + 'px'
    }
    this.$store.dispatch(Types.FALL_BUCKET, { id: 'MERCHANT_PIC' }).then(data => {
      console.log(data)
      if (data && data.length) {
        this.picList = data
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
    animationend (e, pic) {
      console.log(e)
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
  padding (6/20)rem
  overflow hidden
  box-sizing border-box
  background $blackBg

.item
  break-inside avoid
  box-sizing border-box
  display inline-block
  width (178/20)rem
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
  >img
    position relative
    top 50%
    transform translateY(-50%)
    width 100%
</style>
