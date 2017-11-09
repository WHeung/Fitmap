<template>
  <div :class="$style.main" @click="toDetailView">
    <div :class="$style.img" :style="imgWrapStyle">
      <img :src="item.images[0]" @load="imgLoad">
    </div>
    <div :class="$style.content">
      <div :class="$style.titleWrap">
        <div :class="$style.title">{{item.title}}</div>
        <i :class="{[$style.active]: item.is_collected}"></i>
      </div>
      <div :class="$style.conWrap">
        <div :class="$style.tag">
          <span v-if="item.label">{{item.label}}</span>
        </div>
        <div :class="$style.address">{{item.distance}} {{item.location}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-bus-item',
  props: ['item'],
  data () {
    return {
      imgWrapStyle: null
    }
  },
  methods: {
    toDetailView () {
      this.$emit('toDetail', { type: 'merchant', id: this.item.id })
      // this.$router.push({ name: 'detailView', params: { id: this.item.id, type: 'merchant' }})
    },
    imgLoad (e) {
      console.log(this.item)
      const img = e.path[0]
      if (img.width / img.height > (375 / 211)) {
        this.imgWrapStyle = {
          height: img.width + 'px'
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
  background $white

.img
  position relative
  width 100%
  height (211/20)rem
  max-height (211/20)rem
  overflow hidden
  img
    position absolute
    display block
    width 100%
    top 50%
    transform translateY(-50%)

.content
  position relative
  padding 16px

.titleWrap
  line-height 20px
  position relative
  >i
    position absolute
    width 20px
    height 20px
    top 0
    right 0
    background url('~public/fm_fav.svg') no-repeat
    background-size 100% 100%
  .active
    background-image url('~public/fm_fav_on.svg')

.title
  width 90%
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  font-size 15px

.conWrap
  display flex
  align-items center
  margin-top 6px
.tag
  display inline-flex
  font-size 12px
  span
    padding 1px 8px
    margin-right 6px
    background $mainText
    color $white
    border-radius 10px
    
.address
  bottom 16px
  margin-left 16px
  font-size 12px
  color $assistText

</style>
