<template>
  <div :class="$style.main">
    <Filters></Filters>
    <Sacle :map="map"></Sacle>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import Sacle from '../components/sacle.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map-index-view',
  components: { Filters, Sacle },
  computed: {
    map: {
      get () {
        return this.$store.state.map.map
      }
    }
  },
  created () {

  }
}
</script>

<style lang="stylus" module>
</style>
