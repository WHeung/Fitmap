<template>
  <div :class="$style.main" @click="toDetailView">
    <div :class="$style.img">
      <img :src="item.cover" :style="imgStyle" ref="img" @load="imgLoad">
    </div>
    <div :class="$style.content">
      <div :class="$style.title">{{item.title}}</div>
      <div :class="$style.tag">
        <span v-if="item.label">{{item.label}}</span>
      </div>
      <div :class="$style.address">{{item.distance}} {{item.location_obj.address}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-bus-item',
  props: ['item'],
  data () {
    return {
      imgStyle: null
    }
  },
  watch: {
    item: {
      handler (val) {
        const img = new Image()
        img.src = val.cover
        if (img.width && img.height) {
          if (img.height < img.width * 140 / 187.5) {
            this.imgStyle = {
              width: 'auto',
              height: '100%',
              top: 'unset',
              left: '50%',
              transform: 'translateX(-50%)'
            }
          } else {
            this.imgStyle = {
              width: '100%',
              height: 'auto',
              top: '50%',
              left: 'unset',
              transform: 'translateY(-50%)'
            }
          }
        }
      }
    }
  },
  methods: {
    toDetailView () {
      this.$emit('toDetail', { type: 'merchant', id: this.item.id })
      // this.$router.push({ name: 'detailView', params: { id: this.item.id, type: 'merchant' }})
    },
    imgLoad (e) {
      const img = e.path[0]
      if (img.height < img.width * 140 / 187.5) {
        this.imgStyle = {
          width: 'auto',
          height: '100%',
          top: 'unset',
          left: '50%',
          transform: 'translateX(-50%)'
        }
      }
    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB
$mainText = #474C54
$white = #FFFFFF

.main
  display flex
  background $white

.img
  width 50%
  flex-shrink 0
  height (140/20)rem
  overflow hidden
  img
    position relative
    display block
    width 100%
    top 50%
    transform translateY(-50%)

.content
  position relative
  padding 16px
  flex 1 1 auto

.title
  display -webkit-box
  font-size 15px
  line-height 16px
  height 32px
  overflow hidden
  text-overflow ellipsis
  -webkit-line-clamp 2
  -webkit-box-orient vertical

.tag
  margin-top 6px
  display flex
  font-size 12px
  span
    padding 1px 8px
    margin-right 6px
    background $mainText
    color $white
    border-radius 10px
    
.address
  position absolute
  bottom 16px
  font-size 12px
  color $assistText

</style>
