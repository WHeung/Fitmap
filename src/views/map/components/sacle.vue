<template>
  <div :class="$style.main">
    <div :class="$style.locateGroup">
      <svg v-if="locateBtn === 'loading'" viewBox="25 25 50 50" :class="$style.circular">
        <circle cx="50" cy="50" r="20" fill="none" :class="$style.path"></circle>
      </svg>
      <button v-else :class="[$style.locateIcon, {[$style.activeLoacte]: locateBtn === 'yes'}]" @click="locateClick"></button>
    </div>
    <div :class="$style.sacleGroup">
      <button @click="largerSize">+</button>
      <span></span>
      <button @click="smallerSize">-</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-sacle',
  props: ['map', 'locateBtn'],
  computed: {
    zoom () {
      return this.map ? this.map.getZoom() : ''
    }
  },
  methods: {
    largerSize () {
      this.zoom < 20 && this.map.setZoom(this.zoom + 1)
    },
    smallerSize () {
      this.zoom > 5 && this.map.setZoom(this.zoom - 1)
    },
    locateClick () {
      if (this.locateBtn === 'no') {
        this.$emit('locate', true)
      }
      if (this.locateBtn === 'yes') {
        this.$emit('locate', false)
      }
    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
.main
  position absolute
  right 12px
  bottom 12px

.locateGroup
  margin-bottom 10px
  height 36px
  .locateIcon
    height 100%
    display block
    background url('~public/map_icon.png') no-repeat 6px -246px
    background-size 48px 329px
  .activeLoacte
    background-position 6px -131px
.locateGroup
.sacleGroup
  background #fff
  width 36px
  border-radius 5px
  box-shadow 0 2px 3px 0 rgba(0,0,0,0.20)
  >button
    width 100%
    height 39.5px
    font-size 28px
    color #474c54
  >span
    margin 0 auto
    display block
    width 70%
    height 1px
    background $breakline

.circular
  width 36px
  height 36px
  padding 5px
  box-sizing border-box
  animation loading-rotate 2s linear infinite

.path
  animation loading-dash 1.5s ease-in-out infinite
  stroke-dasharray 90,150
  stroke-dashoffset 0
  stroke-width 5
  stroke #888
  stroke-linecap round

@keyframes loading-dash
  0%
    stroke-dasharray 1,200
    stroke-dashoffset 0
  50%
    stroke-dasharray 90,150
    stroke-dashoffset -40px
  to
    stroke-dasharray 90,150
    stroke-dashoffset -120px

@keyframes loading-rotate
  to
    transform rotate(1turn)
</style>
