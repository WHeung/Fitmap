<template>
  <div :class="$style.main">
      <Filters
      :updateForm="updateForm" :form="classForm" origin="index"
      @searchClick="searchClick" @request="request"></Filters>
      <Sacle :class="{[$style.transTop]: selectedItem }"
      :locateBtn="locateBtn" :map="map"
      @locate="locateClick"></Sacle>
      <div :class="$style.bottom" v-if="selectedItem && selectedItem.item">
        <BusItem :class="$style.item" v-if="selectedItem.item.search_type==='merchant'" :item="selectedItem.item" @toDetail="toDetail"></BusItem>
        <PostItem :class="$style.item" v-if="selectedItem.item.search_type==='post'" :item="selectedItem.item" @toDetail="toDetail"></PostItem>
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
import { onlyLoacation } from '~src/store/api/weixinApi'
import { LngLat, Point, Size } from '~src/tool/mapBase'
import QMap from 'QMap'

export default {
  name: 'map-index-view',
  components: { Filters, Sacle, BusItem, PostItem },
  data () {
    return {
      type: '',
      updateForm: 0,
      locateBtn: 'no',
      selfMarker: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { // 子组件没有这个路由钩子，使用了keepalive组件不会从新加载，改变updateForm使子组件从新赋值
      vm.updateForm++
      vm.$store.dispatch(Types.CHANGE_NAV, { title: 'Fit-map' })
    })
  },
  computed: {
    map: {
      get () {
        const map = this.$store.state.map.map
        if (map) {
          return this.$store.state.map.map
        }
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
      const userLoc = this.$store.state.map.userLoc
      if (userLoc.lat && userLoc.lng) {
        return userLoc
      }
    }
  },
  methods: {
    locateClick (isLocate) {
      if (isLocate) {
        this.locateBtn = 'loading'
        this.getLocate()
      } else {
        this.locateBtn = 'no'
        this.selfMarker.getVisible(false)
      }
    },
    toListView () {
      this.$router.push({ name: 'mapListView' })
    },
    toDetail ({ id, type }) {
      this.$router.push({ name: 'detailView', params: { id, type }})
      /** 换成先跳转详情页再检查登录
      const toRoute = JSON.stringify({ name: 'detailView', params: { id, type }})
      this.$store.dispatch(Types.USER_LOGIN, {}).then(() => {
        if (this.user.is_cellphone_checked && this.user.is_company_checked) {
          this.$router.push({ name: 'detailView', params: { id, type }})
        } else if (!this.user.is_cellphone_checked) {
          this.$router.push({ name: 'registerPhoneView', query: { toRoute: toRoute }})
        } else {
          this.$router.push({ name: 'coummateInfoView', query: { toRoute: toRoute }})
        }
      })
      */
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
          const markers = this.map.markers
          const marker = markers.find(item => {
            return item.itemId === itemId
          })
          this.$store.dispatch(Types.UPDATE_MAP_SELECTITEM, marker)
        }
      })
    },
    getLocate () {
      onlyLoacation({}, ({ lat, lng }) => {
        this.$store.commit(Types.SET_MAP_USER_LOCATION, { lat, lng })
        if (!this.selfMarker) {
          // this.selfMarker = new QMap.Circle({
          //   center: LngLat(lng, lat),
          //   map: this.map,
          //   visible: true,
          //   title: 'selfMarker',
          //   radius: 40,
          //   fillColor: '#0f89f5',
          //   strokeColor: '#fff',
          //   strokeWeight: 2
          // })
        } else {
          this.selfMarker.setCenter(LngLat(lng, lat))
          this.selfMarker.getVisible(true)
        }
        this.map.panTo(new QMap.LatLng(lat, lng))
        this.locateBtn = 'yes'
      })
    }
  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB
$assistText = #9DA2AB

.main
  pointer-events none !important// 点击穿透属性，使地图可以拖到
  div
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
