<template>
  <div :class="$style.main">
    <div :class="$style.item" v-for="item in aroundMsg" :key="item.name">
      <div :class="$style.name">{{item.name}}</div>
      <div :class="[$style.con,{[$style.red]: item.color === 'red'}]" v-html="item.value"></div>
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

.main
  padding 18px 0
  display flex
  justify-content space-around
.item
  padding 0 12px
  flex 1 1
  display inline-flex
  flex-direction column
  align-items center
  text-align center
  &:not(:first-child)
    border-left 1px solid $breakline
.name
  margin-bottom 8px
  font-size 12px
  color $assistText
.con
  font-size 14px
  &.red
    color $price

</style>
