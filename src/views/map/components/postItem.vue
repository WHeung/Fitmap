<template>
  <div :class="$style.main" @click="toDetailView">
    <div :class="$style.top">
      <div :class="$style.title">{{item.title}}</div>
      <div :class="$style.tag">
        <span v-for="tag in item.tags" :key="tag">{{tag}}</span>
      </div>
    </div>
    <div :class="$style.sub">
      {{item.content}}
    </div>
    <div :class="$style.msg">
      <div>{{item.location}}</div>
      <div>{{item.created_time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map-post-item',
  props: ['item'],
  methods: {
    toDetailView () {
      this.$router.push({ name: 'detailView', params: { id: 1 }})
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
  box-shadow 0 0 6px 0 rgba(0,0,0,0.10)

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
