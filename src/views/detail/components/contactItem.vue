<template>
  <div :class="$style.main">
    <div :class="$style.item">
      <div :class="[$style.icon, $style.locationIcon]"></div>
      <div :class="$style.text">广东-广州-海珠-艺苑南路13号大院布衣港电商园11栋1楼（地铁站客村站D出口）</div>
      <div :class="$style.arrow"></div>
    </div>
    <p :class="$style.line"></p>
    <div :class="$style.item">
      <div :class="[$style.icon, $style.phoneIcon]"></div>
      <div :class="$style.text">
        <span>87123458</span>,
        <span>87123458</span>,
        <span>87123458</span>,
        <span>87123458</span>
      </div>
      <div :class="$style.arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'around-item',
  props: ['aroundMsg']
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.item
  padding 12px 18px
  display flex
  align-items center
  font-size 14px
.icon
  flex 0 0 auto
  margin-right (12/20)rem
  width 28px
  height 28px
  background-repeat no-repeat
  background-size 100% 100%
  &.locationIcon
    background-image url('~public/fm_list_locate.svg')
  &.phoneIcon
    background-image url('~public/fm_list_call.svg')
.text
  margin-right 12px
  >span
    white-space nowrap
.arrow
  flex 0 0 auto
  height 16px
  width 16px
  background url('~public/fm_goto.svg') no-repeat
  background-size 100% 100%
.line
  margin-left 18px
  height 1px
  background $breakline

</style>
