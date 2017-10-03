<template>
  <div :class="$style.main">
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
  props: ['map'],
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
.sacleGroup
  background #fff
  width 36px
  border-radius 5px
  box-shadow 0 2px 3px 0 rgba(0,0,0,0.20)
  >button
    width 100%
    height 39.5px
    font-size 28px
    colort #474c54
  >span
    margin 0 auto
    display block
    width 70%
    height 1px
    background $breakline 
</style>
