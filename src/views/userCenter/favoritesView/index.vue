<template>
  <div>
    <template>
      <StoreItem :class="$style.item"></StoreItem>
    </template>
    <template>
      <BusItem :class="$style.item"></BusItem>
    </template>
    <template>
      <PostItem :class="$style.item"></PostItem>
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
  computed: {
    type () {
      return this.$route.params.type
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>

<style lang="stylus" module>
.item
  margin-bottom 12px
</style>

