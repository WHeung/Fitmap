<template>
  <div :class="$style.main">
    <div v-if="!dataList || !dataList.length">
      <div :class="$style.img"></div>
      <div :class="$style.title">还没有任何收藏</div>
      <div :class="$style.btn">
        <button @click="toIndex">去看看</button>
      </div>
    </div>
    <div v-else>
      <!-- <IScroll @handleBottomBounce="getMore"> -->
      <template v-if="type === 'item'">
        <StoreItem :class="$style.item"
          v-for="data in dataList" :key="data.id"
          :data="data" @toDetail="toDetail"></StoreItem>
      </template>
      <template v-if="type === 'merchant'">
        <BusItem :class="$style.item"
          v-for="data in dataList" :key="data.id"
          :data="data" @toDetail="toDetail"></BusItem>
      </template>
      <template v-if="type === 'post'">
        <PostItem :class="$style.item"
          v-for="data in dataList" :key="data.id"
          :data="data" @toDetail="toDetail"></PostItem>
      </template>
      <!-- </IScroll> -->
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import StoreItem from './components/storeItem.vue'
import BusItem from './components/busItem.vue'
import PostItem from './components/postItem.vue'

export default {
  name: 'favorites-View',
  components: { StoreItem, BusItem, PostItem },
  data () {
    return {
      type: '',
      dataList: [],
      pagination: {}
    }
  },
  computed: {
  },
  created () {
    this.$store.dispatch(Types.OPEN_LOADING)
    this.type = this.$route.params.type
    let typeName = '我收藏的'
    switch (this.type) {
    case 'merchant':
      typeName += '商家'
      break
    case 'post':
      typeName += '帖子'
      break
    case 'item':
      typeName += '商品'
      break
    }
    this.$store.dispatch(Types.CHANGE_NAV, { title: `${typeName} Fit-map` })
    this.$store.dispatch(Types.UPDATE_USERS_COLLECTS, { type: this.type }).then(dataList => {
      this.dataList = dataList.list
      this.pagination = dataList.pagination
      this.$store.dispatch(Types.CLOSE_LOADING)
    })
  },
  methods: {
    toDetail (id) {
      this.$router.push({ name: 'detailView', params: { type: this.type, id: parseInt(id) }})
    },
    getMore () {
      this.$store.dispatch(Types.UPDATE_MAP_SEARCH, { page: this.pagination.current_page + 1 })
    },
    toIndex () {
      this.$router.push({ name: 'mapIndexView' })
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.main
  background $mainBg
.item
  margin-bottom 12px

.img
  padding-top 120px
  margin 0 auto
  width (218/20)rem
  height (88/20)rem
  background url('~src/public/fm_empty_fav.svg') no-repeat
  background-size 100% 100%

.title
  margin 12px auto 0
  font-size 14px
  color #9DA2AB
  text-align center
  line-height 24px

.btn
  margin-top 36px
  text-align center
  button
    margin 0 auto
    border 1px solid #474C54
    border-radius 18px
    padding 8px 30px


</style>

