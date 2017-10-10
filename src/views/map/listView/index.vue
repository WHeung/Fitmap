<template>
  <div :class="$style.main">
    <Filters origin="list"></Filters>
    <BusItem :class="$style.item" @click="toListView"></BusItem>
    <PostItem :class="$style.item" @click="toListView"></PostItem>
    <BusItem :class="$style.item" @click="toListView"></BusItem>
    <PostItem :class="$style.item" @click="toListView"></PostItem>
    <BusItem :class="$style.item" @click="toListView"></BusItem>
    <PostItem :class="$style.item" @click="toListView"></PostItem>
    <BusItem :class="$style.item" @click="toListView"></BusItem>
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
      type: 'post'
    }
  },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      }
    }
  },
  created () {

  },
  methods: {
    toDetailView () {
      this.$router.push({ name: 'detailView', params: { id: 1 } })
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
