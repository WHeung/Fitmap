<template>
  <div :class="$style.main">
    <div :class="$style.title">{{title}}</div>
    <div :class="$style.content" @click="clickCon">
      {{content}}<i v-if="arrow"></i>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'item',
  props: ['title', 'content', 'arrow'],
  methods: {
    clickCon () {
      this.$emit('clickCon')
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'
.main
  display flex
  justify-content space-between
  padding 12px 18px

.title
  width 70px
  font-size 16px
  white-space nowrap

.content
  flex 1 0 auto
  white-space nowrap
  display inline-flex
  justify-content flex-end
  align-items center
  color $assistText
  >i
    margin-left 6px
    height 16px
    width 16px
    background url('~public/fm_goto.svg') no-repeat
    background-size 100% 100%
</style>
