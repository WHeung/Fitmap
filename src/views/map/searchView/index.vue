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
      <div :class="$style.hisCon" v-if="history && history.length">
        <span v-for="item in history" :key="item">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import * as Types from '~src/store/types'

const storageKey = 'search_history'

export default {
  name: 'map-search-view',
  components: { Filters },
  data () {
    return {
      type: 'post',
      updateForm: 0,
      history: JSON.parse(window.localStorage[storageKey] || '[]')
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
    }
  },
  methods: {
    search (form) {
      if (form.input && this.history.indexOf(form.input) < 0) {
        this.history.unshift(form.input)
        window.localStorage[storageKey] = JSON.stringify(this.history)
      }
      this.$router.push({ name: 'mapListView' })
    },
    cleanHistory () {
      this.history = []
      window.localStorage[storageKey] = '[]'
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
  >span
    padding 5px 18px
    margin-right  12px
    font-size 12px
    border 1px solid $mainText
    border-radius 100px
</style>
