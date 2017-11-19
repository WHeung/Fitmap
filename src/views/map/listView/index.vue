<template>
  <div :class="$style.main">
    <Filters
    :updateForm="updateForm" :form="classForm" origin="list"
    @searchClick="searchClick" @request="request"></Filters>
    <IScroll @handleBottomBounce="getMore">
      <div v-if="list && list.length">
        <template v-if="classForm.selected[0] === 0">
          <MerchantItem :class="$style.item" v-for="item in list" :key="item.id" :item="item" @toDetail="toDetail"></MerchantItem>
        </template>
        <template v-if="classForm.selected[0] === 1">
          <PostItem :class="$style.item" v-for="item in list" :key="item.id" :item="item" @toDetail="toDetail"></PostItem>
        </template>
      </div>
      <div :class="$style.noMoreTips" v-if="status === 'noMore'">没有更多数据了</div>
    </IScroll>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import MerchantItem from '../components/merchantItem.vue'
import PostItem from '../components/postItem.vue'
import IScroll from '~src/components/iScroll.vue'
import * as Types from '~src/store/types'
import routerReplace from '~src/tool/routerReplace'

export default {
  name: 'map-list-view',
  components: { Filters, MerchantItem, PostItem, IScroll },
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
    user () {
      return this.$store.state.user.user
    },
    classForm () {
      return this.$store.state.map.filtersForm
    },
    list () {
      return this.$store.state.map.list
    },
    pagination () {
      return this.$store.state.map.pagination
    },
    status () {
      if (this.pagination.current_page >= this.pagination.total_pages) {
        return 'noMore'
      }
    }
  },
  created () {

  },
  methods: {
    toDetail ({ id, type }) {
      const detail = JSON.stringify({ id, type })
      this.$store.dispatch(Types.USER_LOGIN, {}).then(() => {
        if (this.user.is_cellphone_checked && this.user.is_company_checked) {
          this.$router.push({ name: 'detailView', params: { id, type }})
        } else if (this.user.is_cellphone_checked) {
          this.$router.push({ name: 'registerPhoneView', query: { detail }})
        } else {
          this.$router.push({ name: 'coummateInfoView', query: { detail }})
        }
      })
    },
    getMore () {
      this.$store.dispatch(Types.UPDATE_MAP_SEARCH, { page: this.pagination.current_page + 1 })
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
$mainText = #474C54
$mainBg = #F5F7FA

.main
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  padding-top 60px
  box-sizing border-box
  background $mainBg
  overflow-y scroll

.item
  margin-top 10px

.noMoreTips
  margin-top 12px
  text-align center
  font-size 12px

</style>
