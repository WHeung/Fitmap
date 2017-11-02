<template>
  <div :class="$style.item">
    <div :class="$style.icon">
      <slot name="icon"></slot>
    </div>
    <div :class="$style.top">
      <slot name="top"></slot>
    </div>
    <div :class="$style.line"></div>
    <div :class="$style.bottom">
      <slot name="bottom"></slot>
    </div>
    <div :class="$style.dividerImg">
      <img src="~public/about/fm_divider.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'about-item',
  props: ['icon']
}
</script>

<style lang="stylus" module>
$breakline = #9DA2AB

.dividerImg img
  height 6px

.icon img
  height 30px

.item
  padding 18px 24px

.top
  margin-top 12px
  padding-bottom 6px
  font-size 17px
  line-height 20px
  font-weight 600
  color $black

.line
  height 1px
  background $breakline

.bottom
  margin 18px 0
</style>
