<template>
  <div :class="$style.main">
    <div :class="$style.top">
      <div :class="$style.title">{{data.title}}</div>
      <div :class="$style.tag"><span v-for="tag in data.tags">{{tag}}</span></div>
    </div>
    <div :class="$style.sub">
      {{data.content}}
    </div>
    <div :class="$style.msg">
      <div>{{data.position_content}}</div>
      <div>{{data.created_time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-favor-post',
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
