<template>
  <div :class="$style.main">
    <AMapComponent v-model="map"></AMapComponent>
    <div :class="$style.content">
      <Filters
      :updateForm="updateForm" :form="classForm" origin="index"
      @searchClick="searchClick" @request="request"></Filters>
      <!-- <Sacle :class="{[$style.transTop]: item }" :map="map"></Sacle> -->
      <div :class="$style.bottom" v-if="selectedItem && selectedItem.item">
        <BusItem :class="$style.item" v-if="selectedItem.item.search_type==='merchant'" :item="selectedItem.item" @toDetail="toDetail"></BusItem>
        <PostItem :class="$style.item" v-if="selectedItem.item.search_type==='post'" :item="selectedItem.item" @toDetail="toDetail"></PostItem>
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
      const markers = vm.map.getAllOverlays('marker')
      vm.map.setFitView(markers)
      vm.$store.dispatch(Types.CHANGE_NAV, { title: 'Fit-map' })
    })
  },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      },
      set (val) {
        console.log('index_set_map')
        this.$store.commit(Types.SET_MAP, val)
      }
    },
    classForm () {
      return this.$store.state.map.filtersForm
    },
    selectedItem () {
      const selectedItem = this.$store.state.map.selectedItem
      if (selectedItem && selectedItem.item) {
        return this.$store.state.map.selectedItem
      }
    },
    list () {
      return this.$store.state.map.list
    },
    user () {
      return this.$store.state.user.user
    },
    userLoc () {
      return this.$store.state.map.userLoc
    }
  },
  watch: {
    selectedItem (val) {
      let pixel
      if (val && val.marker && this.map && this.map.toolBar) {
        pixel = new AMap.Pixel(10, 300)
      } else {
        pixel = new AMap.Pixel(10, 100)
      }
      this.map.toolBar.setOffset(pixel)
    },
    userLoc: { // fixe 第一次进入页面获取定位过慢
      handler (val) {
        console.log(val)
        const store = this.$store.state.map
        const type = store.classTypes[this.classForm.selected[0]].data
        const form = {
          keyword: this.classForm.input,
          type: type,
          category: store.classCategorys[type][this.classForm.selected[1]].name
        }
        if (!this.list) {
          this.$store.dispatch(Types.UPDATE_MAP_SEARCH, form).then(() => {
            const markers = this.map.getAllOverlays('marker')
            this.map.setFitView(markers)
          })
        } else {
          this.$store.dispatch(Types.UPDATE_MAP_MARKERS, this.list)
        }
      },
      deep: true
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
    if (this.list) {
      this.$store.dispatch(Types.UPDATE_MAP_MARKERS, this.list).then(() => {
        if (this.selectedItem && this.selectedItem.marker) {
          const marker = this.map.getAllOverlays('marker').find(item => {
            return item.itemId === this.selectedItem.marker.itemId
          })
          this.$store.dispatch(Types.UPDATE_MAP_SELECTITEM, marker)
        }
      })
    } else {
      this.map.toolBar.doLocation()
    }
  },
  methods: {
    toListView () {
      this.$router.push({ name: 'mapListView' })
    },
    toDetail ({ id, type }) {
      const detail = JSON.stringify({ id, type })
      this.$store.dispatch(Types.USER_LOGIN, {}).then(() => {
        if (this.user.is_cellphone_checked && this.user.is_company_checked) {
          this.$router.push({ name: 'detailView', params: { id, type }})
        } else if (!this.user.is_cellphone_checked) {
          this.$router.push({ name: 'registerPhoneView', query: { detail }})
        } else {
          this.$router.push({ name: 'coummateInfoView', query: { detail }})
        }
      })
    },
    searchClick () {
      this.$router.push({ name: 'mapSearchView' })
    },
    request (data) {
      // 请求
      this.$store.commit(Types.SET_MAP_SELECTED_MARKER, null)
      this.$store.dispatch(Types.UPDATE_MAP_SEARCH, data).then(() => {
        if (this.list && this.list.length) {
          const itemId = this.list[0].location_obj.id
          const markers = this.map.getAllOverlays('marker')
          this.map.setFitView(markers)
          const marker = markers.find(item => {
            return item.itemId === itemId
          })
          if (marker) {
            this.$store.dispatch(Types.UPDATE_MAP_SELECTITEM, marker)
          }
        }
      })
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
