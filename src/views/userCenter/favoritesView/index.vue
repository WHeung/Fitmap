<template>
  <div v-pxtorem>
    <ProductsView></ProductsView>
    <BusinessView></BusinessView>
    <PostsView></PostsView>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import ProductsView from './productsView.vue'
import BusinessView from './businessView.vue'
import PostsView from './postsView.vue'

export default {
  name: 'favorites-View',
  components: { ProductsView, BusinessView, PostsView },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
  }
}
</script>
