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
  props: ['title']
}
</script>

<style lang="stylus" module>
.main
  display flex

.title
  width 70px
  font-size 16px
  white-space nowrap

.content
  flex 1 0 auto
  white-space nowrap
</style>
