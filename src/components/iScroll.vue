<template>
  <div v-if="disabled" :class="$style.main">
    <slot></slot>
  </div>
  <div v-else :class="$style.main" @touchmove.prevent ref="main">
    <div :class="$style.scrollWrap" v-i-scroll="options" ref="scrollWrap">
      <div :class="$style.scrollContent" :style="contentStyle">
        <div v-if="downRefreshabled" :class="[$style.downFresh, downFreshTip.class]">
          <i></i><span>{{downFreshTip.text}}</span>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
import getOffsetTop from '~src/tool/getOffsetTop'
const DOWN_REFRESH_EXCCED_HEIGHT = 70
export default {
  props: ['contentStyle', 'options', 'disabled', 'downRefreshabled'],
  data () {
    return {
      downFreshStatus: 'waitFresh'
    }
  },
  computed: {
    downFreshTip () {
      switch (this.downFreshStatus) {
      case 'readyFresh':
        return {
          class: this.$style.readyFresh,
          text: '松开立即刷新',
          canFresh: true
        }
      case 'waitFresh':
      default:
        return {
          class: this.$style.waitFresh,
          text: '下拉可以刷新',
          canFresh: true
        }
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      const scrollWrap = this.$refs.scrollWrap
      const self = this
      if (scrollWrap) {
        scrollWrap.style.height = window.innerHeight - getOffsetTop(this.$refs.main) + 'px'
        scrollWrap.iscroll.on('scroll', function () {
          self.$emit('handleScroll', this)
          if (this.y > 0) {
            self.downFresh(this.y)
          }
        })
        scrollWrap.iscroll.on('bottomBounce', function () {
          self.$emit('handleBottomBounce', this)
        })
        scrollWrap.iscroll.on('topBounce', function (exceedHeight) {
          if (self.downRefreshabled && exceedHeight > DOWN_REFRESH_EXCCED_HEIGHT) {
            window.location.reload()
          }
        })
        this.$emit('input', scrollWrap.iscroll)
      }
    })
  },
  methods: {
    downFresh (distance) {
      if (distance > DOWN_REFRESH_EXCCED_HEIGHT) {
        this.downFreshStatus = 'readyFresh'
      } else {
        this.downFreshStatus = 'waitFresh'
      }
    }
  }
}
</script>
<style lang="stylus" module>
.main
  position relative
.scrollWrap
  overflow hidden
.scrollContent
  position relative
  min-height 100%
.downFresh
  position absolute
  top -40px
  height 40px
  line-height 41px
  text-align center
.waitFresh,.readyFresh
  width 100%
  position absolute
  bottom -40px
</style>
