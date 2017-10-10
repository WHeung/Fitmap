<template>
  <div :class="$style.main">
    <div :class="$style.title">{{title}}</div>
    <div :class="$style.content" v-html="content">
    </div>
  </div> 
</template>

<script>
export default {
  name: 'item',
  props: ['title', 'content'],
  methods: {
    clickCon () {
      this.$emit('clickCon')
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.title
  margin-left (18/20)rem
  font-size 16px
  white-space nowrap
  color $assistText

.content
  margin-top 6px
  padding (24/20)rem
  font-size 15px
  background $white
</style>
