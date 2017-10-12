<template>
  <div :class="$style.main">
    <Filters
    :updateForm="updateForm" :form="classForm" origin="list"
    @searchClick="searchClick" @request="request"></Filters>
    <BusItem :class="$style.item" @click="toDetailView"></BusItem>
    <PostItem :class="$style.item" @click="toDetailView"></PostItem>
    <BusItem :class="$style.item" @click="toDetailView"></BusItem>
    <PostItem :class="$style.item" @click="toDetailView"></PostItem>
    <BusItem :class="$style.item" @click="toDetailView"></BusItem>
    <PostItem :class="$style.item" @click="toDetailView"></PostItem>
    <BusItem :class="$style.item" @click="toDetailView"></BusItem>
    <PostItem :class="$style.item"></PostItem>
    <BusItem :class="$style.item"></BusItem>
    <PostItem :class="$style.item"></PostItem>
    <BusItem :class="$style.item"></BusItem>
    <PostItem :class="$style.item"></PostItem>
    <BusItem :class="$style.item"></BusItem>
    <PostItem :class="$style.item"></PostItem>
    <BusItem :class="$style.item"></BusItem>
    <PostItem :class="$style.item"></PostItem>
    <BusItem :class="$style.item"></BusItem>
    <PostItem :class="$style.item"></PostItem>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import BusItem from '../components/busItem.vue'
import PostItem from '../components/postItem.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map-list-view',
  components: { Filters, BusItem, PostItem },
  data () {
    return {
      type: 'post',
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
    }
  },
  created () {

  },
  methods: {
    toDetailView () {
      this.$router.push({ name: 'detailView', params: { id: 1 }})
    },
    searchClick () {
      this.$router.push({ name: 'mapSearchView' })
    },
    request (form) {
      this.$store.commit(Types.SET_MAP_FILTERS_FORM, form)
      // 请求
    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB
$mainText = #474C54
$mainBg = #F5F7FA

.main
  padding-top 60px
  box-sizing border-box
  background $mainBg
  overflow-y scroll

.item
  margin-top 10px

</style>
