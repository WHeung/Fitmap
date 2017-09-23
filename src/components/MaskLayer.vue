<template>
  <transition name="mask-layer">
    <div :class="$style.maskLayerWrap" @click="close" ref="main">
      <div :class="$style.container">
        <slot></slot>
      </div>
      <div :class="$style.maskLayer"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'mask-layer',
  data () {
    return {
      scrollHeight: 0
    }
  },
  methods: {
    close () {
      this.$emit('maskClick')
    }
  },
  mounted () {
    const height = window.innerHeight + 'px'
    const body = window.document.body
    const htmlH = window.document.getElementsByTagName('html')[0].scrollTop
    const bodyH = body.scrollTop
    this.scrollHeight = Math.max(htmlH, bodyH)
    this.$refs.main.style.height = height
    body.style.height = height
    body.style.overflow = 'hidden'
  },
  destroyed () {
    const body = window.document.body
    body.style.height = 'auto'
    body.style.overflow = 'auto'
    body.scrollTop = this.scrollHeight
    window.document.getElementsByTagName('html')[0].scrollTop = this.scrollHeight
  }
}
</script>

<style lang="stylus" module>
.mask-layer-wrap
  position fixed
  top 0
  left 0
  width 100%
  z-index 100
  display flex
  justify-content center
  align-items center

.mask-layer
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index 1
  background-color rgba(0,0,0,0.5)

.container
  position relative
  z-index 2
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
