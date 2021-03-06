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
    /* 因爲在組件掛載時，頂部導航欄還沒掛載上DOM，因此會出現元素offsetTop爲0，需要在DOM刷新時再調用得出頁面高度
    */
    this.$nextTick(function () { // nextTick在全局VUE DOM結點更新是會調用
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
        scrollWrap.iscroll.on('bottomBounce', function () { // 需要在 下拉超过底部并松手一瞬间监控刷新，scrollEnd则是滑动结束后再执行, 因此不使用scrollEnd
          self.$emit('handleBottomBounce', this)
        })
        scrollWrap.iscroll.on('topBounce', function (exceedHeight) { // 需要在 下拉超过底部并松手一瞬间监控刷新，scrollEnd则是滑动结束后再执行, 因此不使用scrollEnd
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
//   i
//     display inline-block
//     width 20px
//     height 20px
//     background url('~src\public\back_icon_grey@3x.png') no-repeat
//     background-size 100% 100%
//     vertical-align text-bottom
//     margin-right 15px
//     transform rotate(-90deg)
//     transition transform .3s linear

// .readyFresh i
//   transform rotate(90deg)

</style>
