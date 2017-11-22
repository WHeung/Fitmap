<template>
  <div :class="$style.main">
    <Filters :updateForm="updateForm" :form="classForm" origin="search" @search="search"></Filters>
    <div :class="$style.histroy">
      <div :class="$style.hisTop">
        <div :class="$style.hisTitle">
          搜索历史
        </div>
        <div :class="$style.hisClean" @click="cleanHistory">
          清空
        </div>
      </div>
      <div :class="$style.hisCon" v-if="limitHis && limitHis.length">
        <span v-for="item in limitHis" :key="item" @click="useHistory(item)">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import * as Types from '~src/store/types'
import routerReplace from '~src/tool/routerReplace'

const storageKey = 'search_history'

export default {
  name: 'map-search-view',
  components: { Filters },
  data () {
    return {
      updateForm: 0,
      history: JSON.parse(window.localStorage[storageKey] || '[]')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { // 子组件没有这个路由钩子，使用了keepalive组件不会从新加载，改变updateForm使子组件从新赋值
      vm.updateForm++
      vm.$store.dispatch(Types.CHANGE_NAV, { title: '搜索 Fit-map' })
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
    limitHis () {
      return this.history.slice(0, 10)
    }
  },
  methods: {
    search (data) {
      if (data.keyword && this.history.indexOf(data.keyword) < 0) {
        this.history.unshift(data.keyword)
        window.localStorage[storageKey] = JSON.stringify(this.history)
      }
      // 请求
      this.request(data)
    },
    cleanHistory () {
      this.history = []
      window.localStorage[storageKey] = '[]'
    },
    useHistory (item) {
      const data = {
        keyword: item
      }
      // 请求
      this.$store.commit(Types.SET_MAP_FILTERS_FORM, { input: item })
      this.request(data)
    },
    request (data) {
      this.$store.dispatch(Types.UPDATE_MAP_SEARCH, data).then(() => {
        const itemId = this.list[0].location_obj.id
        const markers = this.map.getAllOverlays('marker')
        this.map.setFitView(markers)
        const marker = markers.find(item => {
          return item.itemId === itemId
        })
        this.$store.dispatch(Types.UPDATE_MAP_SELECTITEM, marker)
        routerReplace(this, { name: 'mapIndexView' })
      })
    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB
$mainText = #474C54

.main
  background #F5F7FA
  padding-top 60px

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
  flex-wrap wrap
  >span
    padding 0 18px
    line-height 28px
    margin-right  12px
    margin-bottom 12px
    font-size 12px
    border 1px solid $mainText
    border-radius 100px
</style>
