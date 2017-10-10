<template>
  <div :class="$style.main">
    <div :class="$style.title">广州西适体健身服务有限公司</div>
    <div :class="$style.tag">
      <span>健身房</span>
      <span>帖子</span>
    </div>
    <div :class="$style.address">610米 东莞庄路120号</div>
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

.main
  position relative
  background $white
  padding 18px (18/20)rem
  &:after
    content ''
    position absolute
    top 50%
    right (18/20)rem
    height 16px
    width 16px
    transform translateY(-50%)
    background url('~public/fm_goto.svg') no-repeat
    background-size 100% 100%
.title
  font-size 15px

.tag
  margin-top 6px
  display flex
  font-size 12px
  span
    padding 1px 8px
    margin-right 6px
    background $mainText
    color $white
    border-radius 10px
    
.address
  margin-top 13px
  font-size 12px
  color $assistText
</style>
