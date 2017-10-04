<template>
  <div :class="$style.main">
    <div :class="$style.top">
      <div :class="$style.title">层高6米 天河花园式创意园 各种商业配.安抚水淀粉</div>
      <div :class="$style.tag"><span>场地租赁</span></div>
    </div>
    <div :class="$style.sub">
      裕晖创意产业园位于天河北商圈及天河智慧城核心区天河花园式创意园
    </div>
    <div :class="$style.msg">
      <div>天河-裕晖创意产业园</div>
      <div>2017-09-26</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-post-item',
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
  position relative
  padding 18px
  background $white
  box-shadow 0 0 6px 0 rgba(0,0,0,0.10)

.top
  white-space nowrap

.title
  margin-right 65px
  font-size 15px
  overflow hidden
  text-overflow ellipsis

.tag
  position absolute
  top 18px
  right -3px
  font-size 12px
  line-height 21px
  span
    padding 1px 8px
    background $mainText
    color $white
    border-radius 10px 0 0 10px

.sub
  margin-top 6px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  color $assistText

.msg
  margin-top 18px
  display flex
  justify-content space-between
  font-size 12px
  color $assistText

</style>
