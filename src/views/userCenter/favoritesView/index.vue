<template>
  <div>
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
      dataList: []
    }
  },
  computed: {
  },
  created () {
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
      this.$store.dispatch(Types.CLOSE_LOADING)
    })
  },
  methods: {
    toDetail (id) {
      this.$router.push({ name: 'detailView', params: { type: this.type, id: parseInt(id) }})
    }
  }
}
</script>

<style lang="stylus" module>
.item
  margin-bottom 12px
</style>

