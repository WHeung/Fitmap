<template>
  <div :class="$style.main">
    <Filters
    :updateForm="updateForm" :form="classForm" origin="index"
    @searchClick="searchClick" @request="request"></Filters>
    <Sacle :class="{[$style.transTop]: type }" :map="map"></Sacle>
    <div :class="$style.bottom" v-if="item">
      <BusItem :class="$style.item" v-if="item.type==='merchant'" :item="item" @toDetail="toDetail"></BusItem>
      <PostItem :class="$style.item" v-if="item.type==='post'" :item="item" @toDetail="toDetail"></PostItem>
      <div :class="$style.showList" v-if="list && list.length" @click="toListView">
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
      type: '',
      updateForm: 0
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { // 子组件没有这个路由钩子，使用了keepalive组件不会从新加载，改变updateForm使子组件从新赋值
      vm.updateForm++
    })
  },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      }
    },
    classForm () {
      return this.$store.state.map.filtersForm
    },
    item () {
      if (this.$store.state.map.selectedItem && this.$store.state.map.selectedItem.item) {
        console.log(this.$store.state.map.selectedItem.item)
        return this.$store.state.map.selectedItem.item
      }
    },
    list () {
      return this.$store.state.map.list
    }
  },
  mounted () {
    this.$store.dispatch(Types.FALL_BUCKET, { id: 'MAP_LOCATION' }).then(data => {
      console.log(data)
      if (data) {
        this.$store.dispatch(Types.UPDATE_MAP_LOCATION, data)
      } else {
        const store = this.$store.state.map
        const type = store.classTypes[this.classForm.selected[0]].data
        const form = {
          keyword: this.classForm.input,
          type: type,
          category: store.classCategorys[type][this.classForm.selected[1]].data
        }
        this.$store.dispatch(Types.UPDATE_MAP_SEARCH, form)
      }
    })
  },
  methods: {
    toListView () {
      this.$router.push({ name: 'mapListView' })
    },
    toDetail ({ id, type }) {
      const detail = JSON.stringify({ id, type })
      this.$router.push({ name: 'registerPhoneView', query: { detail }})
      // this.$router.push({ name: 'detailView', params: { id, type }})
    },
    searchClick () {
      this.$router.push({ name: 'mapSearchView' })
    },
    request (data) {
      // 请求
      this.$store.dispatch(Types.UPDATE_MAP_SEARCH, data)
    }
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

.item
  box-shadow 0 0 6px 0 rgba(0,0,0,0.10)

</style>
