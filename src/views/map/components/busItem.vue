<template>
  <div :class="$style.main">
    <div :class="$style.img">
      <img src="http://cdn01.dwfei.com/img/sell/1b8295d8c49446af9954af76a7c495bb.jpg">
    </div>
    <div :class="$style.content">
      <div :class="$style.title">澳淋健身游泳俱乐部</div>
      <div :class="$style.tag">
        <span>健身房</span>
        <span>帖子</span>
      </div>
      <div :class="$style.address">610米 东莞庄路120号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-bus-item',
  data () {
    return {
    }
  },
  methods: {
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
  box-shadow 0 0 6px 0 rgba(0,0,0,0.10)

.img
  width 50%
  height (140/20)rem
  overflow hidden
  img
    position relative
    display block
    height 100%
    left 50%
    transform translateX(-50%)

.content
  position relative
  padding 16px

.title
  font-size 15px

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
