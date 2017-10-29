<template>
  <div :class="$style.main" @click="toDetailView">
    <div :class="$style.img">
      <img :src="item.images[0]">
    </div>
    <div :class="$style.content">
      <div :class="$style.title">{{item.title}}</div>
      <div :class="$style.tag">
        <span v-if="item.label">{{item.label}}</span>
      </div>
      <div :class="$style.address">{{item.distance}} {{item.location_obj.location}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-bus-item',
  props: ['item'],
  methods: {
    toDetailView () {
      this.$emit('toDetail', { type: 'merchant', id: this.item.id })
      // this.$router.push({ name: 'detailView', params: { id: this.item.id, type: 'merchant' }})
    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB
$mainText = #474C54
$white = #FFFFFF

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
  flex 1 1 auto

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
  bottom 16px
  font-size 12px
  color $assistText

</style>
