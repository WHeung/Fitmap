<template>
  <div :class="$style.main">
    <Filters origin="search"></Filters>
    <div :class="$style.histroy" v-if="true">
      <div :class="$style.hisTop">
        <div :class="$style.hisTitle">
          搜索历史
        </div>
        <div :class="$style.hisClean">
          清空
        </div>
      </div>
      <div :class="$style.hisCon">
        <span>健身房</span>
        <span>帖子</span>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map-search-view',
  components: { Filters },
  data () {
    return {
      type: 'post'
    }
  },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      }
    }
  },
  created () {

  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB
$mainText = #474C54

.main
  background #F5F7FA

.histroy
  margin-top 18px

.hisTop
  margin 0 12px
  display flex
  justify-content space-between
.hisTitle
  color $assistText
.hisClean
  position relative
  &:active
    opacity .7
  &:before
    content ''
    position absolute
    width 16px
    height 16px
    left -20px
    top 50%
    transform translateY(-50%)
    background url('~src/public/fm_delete.svg') no-repeat
    background-size 100% 100%

.hisCon
  margin 12px
  display flex
  white-space nowrap
  >span
    padding 5px 18px
    margin-right  12px
    font-size 12px
    border 1px solid $mainText
    border-radius 100px
</style>
