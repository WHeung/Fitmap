<template>
  <div :class="[$style.main, {[$style.maskLayer]: mask}]">
    <div :class="$style.container">
      <div :class="$style.classifyGroup" @click="clickClassify">
        健身房
      </div>
      <div :class="$style.searchGroup">
        <input type="text" placeholder="搜索">
      </div>
    </div>
    <div :class="$style.maskContent" v-if="mask">
      <div :class="$style.classify">
        <div :class="[$style.classItem, $style.activeClass]">商家</div>
        <div :class="[$style.classItem]">帖子</div>
      </div>
      <div :class="$style.classify">
        <div :class="$style.classItem">健身房</div>
        <div :class="[$style.classItem, $style.activeItem]">室内设计</div>
        <div :class="$style.classItem">健身培训</div>
        <div :class="$style.classItem">室内器材</div>
        <div :class="$style.classItem">室内器材</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-filter',
  data () {
    return {
      mask: false
    }
  },
  methods: {
    clickClassify () {

    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB
$mainText = #474C54

.maskLayer
  position absolute
  width 100%
  height 100%
  background rgba(0, 0, 0, .5)
  z-index 3

.container
  padding 12px 12px 0
  display flex
  justify-content space-between

.classifyGroup
  position relative
  padding 6px 42px 6px 12px
  background #FFFFFF
  box-shadow 0 3px 6px 0 rgba(0,0,0,0.10)
  border-radius 100px
  line-height 21px
  &:after
    content ''
    position absolute
    width 16px
    height 16px
    background url('~src/public/fm_dropdown.svg') no-repeat
    background-size 100% 100%
    top 50%
    right 10px
    transform translateY(-50%)

.searchGroup
  position relative
  margin-left 6px
  padding 6px 28px 6px 40px 
  flex-grow 1
  background #FFFFFF
  box-shadow 0 3px 6px 0 rgba(0,0,0,0.10)
  border-radius 100px
  &:before,&:after
    content ''
    position absolute
    top 50%
    transform translateY(-50%)
  &:before
    width 14px
    height 14px
    left 12px
    background url('~src/public/fm_search.svg') no-repeat
    background-size 100% 100%
  &:after
    width 16px
    height 16px
    right 12px
    background url('~src/public/fm_clear.svg') no-repeat
    background-size 100% 100%
  >input
    line-height 21px

.maskContent
  position relative
  margin 12px
  background #fff
  border-radius 3px
  height 216px
  &:after
    content ''
    position absolute
    top 0
    left 50%
    height 100%
    width 1px
    background $breakline

.classify
  display inline-block
  box-sizing border-box
  padding 12px 0
  width 50%
  height 100%
  vertical-align top
  &:last-child
    overflow-y scroll

.classItem
  padding-left 18px
  height 48px
  line-height 48px
  font-size 16px
  color $assistText
  box-sizing border-box
  
.activeClass
  border-top 1px solid $breakline
  border-bottom 1px solid $breakline
  position relative
  color $mainText
  &:after
    content ''
    position absolute
    height 46px
    width 5px
    background #fff
    right -2px
    z-index 4

.activeItem
  color $mainText
</style>
