<template>
  <div :class="$style.main" @click="toDetailView">
    <div :class="$style.top">
      <div :class="$style.title">{{item.title}}</div>
      <div :class="$style.tag">
        <span v-if="item.label">{{item.label}}</span>
      </div>
    </div>
    <div :class="$style.sub">
      {{item.content}}
    </div>
    <div :class="$style.msg">
      <div>{{item.location_obj.address}}</div>
      <div>{{item.created_at}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-post-item',
  props: ['item'],
  methods: {
    toDetailView () {
      this.$emit('toDetail', { type: 'post', id: this.item.id })
      // this.$router.push({ name: 'detailView', params: { id: this.item.id, type: 'post' }})
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
  position relative
  padding 18px
  background $white

.top
  white-space nowrap

.title
  margin-right 65px
  font-size 15px
  overflow hidden
  text-overflow ellipsis

.tag
  position absolute
  top 18px
  right -3px
  font-size 12px
  line-height 21px
  span
    padding 1px 8px
    background $mainText
    color $white
    border-radius 10px 0 0 10px

.sub
  margin-top 6px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  color $assistText

.msg
  margin-top 18px
  display flex
  justify-content space-between
  font-size 12px
  color $assistText

</style>
