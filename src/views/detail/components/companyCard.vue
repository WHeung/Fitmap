<template>
  <div :class="$style.main" @click="clickCon" v-if="data">
    <div :class="$style.title">{{data.title}}</div>
    <div :class="$style.tag">
      <span v-for="tag in data.tags" :key="tag">{{tag}}</span>
    </div>
    <div :class="$style.address">{{data.distance}} {{data.location}}</div>
  </div> 
</template>

<script>
export default {
  name: 'item',
  props: ['data'],
  methods: {
    clickCon () {
      this.$router.push({ name: 'detailView', params: { type: 'merchant', id: this.data.id }})
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
  max-width 90%
  margin-top 13px
  font-size 12px
  color $assistText
</style>
