<template>
  <div :class="$style.item">
    <div :class="$style.icon">
      <img src="~public/about/fm_aboutus_01.svg">
    </div>
    <div :class="$style.top">
      <slot name="top"></slot>
      <p>投资/运营健身房，</p>
      <p>Boss们最关注什么？</p>
    </div>
    <div :class="$style.line"></div>
    <div :class="$style.bottom">
      商圈竞争如何布局？
    </div>
    <div :class="$style.dividerImg">
      <img src="~public/about/fm_divider.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'about-item'
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
  text-align center
  background $white

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
