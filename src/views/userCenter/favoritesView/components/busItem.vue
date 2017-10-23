<template>
  <div :class="$style.main" @click="toDetail">
    <div :class="$style.img">
      <img :src="data.images[0]">
    </div>
    <div :class="$style.content">
      <div :class="$style.title">{{data.title}}</div>
      <div :class="$style.tag">
        <span v-for="tag in data.tags"></span>
      </div>
      <div :class="$style.address">{{data.distance}} {{data.position_content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-favor-merchant',
  props: ['data'],
  data () {
    return {
    }
  },
  methods: {
    toDetail () {
      this.$emit('toDetail', this.data.id)
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  display flex
  background $white

.img
  width 50%
  height (140/20)rem
  overflow hidden
  img
    position relative
    display block
    height 100%
    left 50%
    transform translateX(-50%)

.content
  position relative
  padding 16px
  flex 1 1

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
  position absolute
  width 80%
  bottom 16px
  font-size 12px
  color $assistText
  white-space nowrap
  overflow hidden
  text-overflow ellipsis

</style>
