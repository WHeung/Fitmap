<template>
  <div :class="$style.main">
    <Filters
    :updateForm="updateForm" :form="classForm" origin="index"
    @searchClick="searchClick" @request="request"></Filters>
    <Sacle :class="{[$style.transTop]: type }" :map="map"></Sacle>
    <div :class="$style.bottom" v-if="selectedMarker && selectedMarker.id">
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

const data = [
  {
    "id": 0,
    "title": "string",
    "content": "string",
    "area": "string",
    "price": "string",
    "type": "merchant",
    "telephones": [
      14000000000,
      12000000000,
      13000000000
    ],
    "images": [
      "http://xxx",
      "http://xxx1"
    ],
    "job_content": "string",
    "position_content": "string",
    "distance": "string",
    "location": "string",
    "location_obj": {
      id: 3,
      lng: 113.264296,
      lat: 23.12541,
      province: 'string',
      city: 'string',
      area: 'string',
      location: 'string'
    },
    "is_collected": 0
  }, {
    "id": 0,
    "title": "string",
    "content": "string",
    "area": "string",
    "price": "string",
    "type": "merchant",
    "telephones": [
      14000000000,
      12000000000,
      13000000000
    ],
    "images": [
      "http://xxx",
      "http://xxx1"
    ],
    "job_content": "string",
    "position_content": "string",
    "distance": "string",
    "location": "string",
    "location_obj": {
      id: 2,
      lng: 113.264843,
      lat: 23.133402,
      province: 'string',
      city: 'string',
      area: 'string',
      location: 'string'
    },
    "is_collected": 0
  }, {
    "id": 0,
    "title": "string",
    "content": "string",
    "area": "string",
    "price": "string",
    "type": "post",
    "telephones": [
      14000000000,
      12000000000,
      13000000000
    ],
    "images": [
      "http://xxx",
      "http://xxx1"
    ],
    "job_content": "string",
    "position_content": "string",
    "distance": "string",
    "location": "string",
    "location_obj": {
      id: 4,
      lng: 113.25582,
      lat: 23.125193,
      province: 'string',
      city: 'string',
      area: 'string',
      location: 'string'
    },
    "is_collected": 0
  }, {
    "id": 0,
    "title": "string",
    "content": "string",
    "area": "string",
    "price": "string",
    "type": "post",
    "telephones": [
      14000000000,
      12000000000,
      13000000000
    ],
    "images": [
      "http://xxx",
      "http://xxx1"
    ],
    "job_content": "string",
    "position_content": "string",
    "distance": "string",
    "location": "string",
    "location_obj": {
      id: 5,
      lng: 113.275669,
      lat: 23.126535,
      province: 'string',
      city: 'string',
      area: 'string',
      location: 'string'
    },
    "is_collected": 0
  }
]

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
  watch: {
    '$store.state.map.selectedMarker': {
      handler (marker) {
        const locationId = marker.getExtData().id
        
      }
    }
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
    selectedMarker () {
      return this.$store.state.map.selectedMarker
    }
  },
  mounted () {
    const location = data.map(item => {
      return item.location_obj
    })
    this.$store.dispatch(Types.ADD_MAP_MARKERS, location)
  },
  methods: {
    toListView () {
      this.$router.push({ name: 'mapListView' })
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
