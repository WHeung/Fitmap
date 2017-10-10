<template>
  <div :class="$style.main">
    <Filters></Filters>
    <Sacle :class="{[$style.transTop]: type }" :map="map"></Sacle>
    <div :class="$style.bottom" v-if="selectedItem && selectedItem.id">
      <BusItem v-if="type==='business'"></BusItem>
      <PostItem v-if="type==='post'"></PostItem>
      <div :class="$style.showList" @click="toListView">
        列表显示
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import Sacle from '../components/sacle.vue'
import BusItem from '../components/busItem.vue'
import PostItem from '../components/postItem.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map-index-view',
  components: { Filters, Sacle, BusItem, PostItem },
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
    },
    selectedItem () {
      return this.$store.state.map.selectedItem
    }
  },
  created () {

  },
  methods: {
    toListView () {
      this.$router.push({ name: 'mapListView' })
    },
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB

.main
  pointer-events none // 点击穿透属性，使地图可以拖到
  >div
    pointer-events visible // 之后的容器不需要继承点击穿透

.bottom
  position absolute
  bottom 0
  width 100%

.showList
  box-sizing border-box
  padding 12px 0
  font-size 16px
  text-align center
  color #57ABFF
  background #fff
  border-top 1px solid $breakline
  &:active
    opacity .6

.transTop
  transform translateY(-300px)
</style>
