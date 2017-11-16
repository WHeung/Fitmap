<template>
  <div :class="$style.main">
    <AMapComponent v-model="map" :location="location" :citySearch="citySearch"></AMapComponent>
    <div :class="$style.content">
      <Filters
      :updateForm="updateForm" :form="classForm" origin="index"
      @searchClick="searchClick" @request="request"></Filters>
      <!-- <Sacle :class="{[$style.transTop]: item }" :map="map"></Sacle> -->
      <div :class="$style.bottom" v-if="item">
        <BusItem :class="$style.item" v-if="item.search_type==='merchant'" :item="item" @toDetail="toDetail"></BusItem>
        <PostItem :class="$style.item" v-if="item.search_type==='post'" :item="item" @toDetail="toDetail"></PostItem>
        <div :class="$style.showList" v-if="list && list.length" @click="toListView">
          列表显示
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AMapComponent from '~src/components/AMap.vue'
import AMap from 'AMap'
import Filters from '../components/filters.vue'
import Sacle from '../components/sacle.vue'
import BusItem from '../components/busItem.vue'
import PostItem from '../components/postItem.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map-index-view',
  components: { Filters, Sacle, BusItem, PostItem, AMapComponent },
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
      },
      set (val) {
        console.log(val)
        this.$store.commit(Types.SET_MAP, val)
      }
    },
    classForm () {
      console.log(this.$store.state.map.filtersForm)
      return this.$store.state.map.filtersForm
    },
    item () {
      if (this.$store.state.map.selectedItem && this.$store.state.map.selectedItem.item) {
        return this.$store.state.map.selectedItem.item
      }
    },
    list () {
      return this.$store.state.map.list
    },
    user () {
      return this.$store.state.user.user
    }
  },
  watch: {
    item (val) {
      if (val && val.id && this.map && this.map.toolBar) {
        this.map.toolBar.setOffset(
          new AMap.Pixel(10, 300)
        )
        console.log(this.map.toolBar)
      }
    }
  },
  mounted () {
    this.$store.dispatch(Types.CLOSE_LOADING)

    const store = this.$store.state.map
    const type = store.classTypes[this.classForm.selected[0]].data
    const form = {
      keyword: this.classForm.input,
      type: type,
      category: store.classCategorys[type][this.classForm.selected[1]].name
    }
    if (!this.list) {
      this.$store.dispatch(Types.UPDATE_MAP_SEARCH, form)
    } else {
      this.$store.dispatch(Types.UPDATE_MAP_MARKERS, this.list)
    }
    if (this.item) {
      console.info(this.item)
      this.store.commit(Types.SET_MAP_SELECTED_MARKER, { item: this.item })
    }
  },
  methods: {
    location() {},
    citySearch() {},
    toListView () {
      this.$router.push({ name: 'mapListView' })
    },
    toDetail ({ id, type }) {
      const detail = JSON.stringify({ id, type })
      if (this.user.is_cellphone_checked && this.user.is_company_checked) {
        this.$router.push({ name: 'detailView', params: { id, type }})
      } else if (this.user.is_cellphone_checked) {
        this.$router.push({ name: 'registerPhoneView', query: { detail }})
      } else {
        this.$router.push({ name: 'coummateInfoView', query: { detail }})
      }
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

.content
  pointer-events none // 点击穿透属性，使地图可以拖到
  position absolute
  top 0
  width 100%
  height 100%
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
