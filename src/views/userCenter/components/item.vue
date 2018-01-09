<template>
  <div :class="$style.main">
    <div :class="$style.title">{{title}}</div>
    <div :class="$style.content">
      <slot></slot>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'item',
  props: ['title'],
  methods: {
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'
.main
  display flex
  justify-content space-between
  padding 10px 18px
  font-size 16px
  line-height 28px

.title
  flex 0 0 70px
  white-space nowrap
  color $assistText

.content
  flex 1 1 auto
  white-space nowrap
  display inline-flex
</style>
