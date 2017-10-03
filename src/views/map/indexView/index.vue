<template>
  <div :class="$style.main">
    <Filters></Filters>
    <Sacle :class="{[$style.transTop]: type }" :map="map"></Sacle>
    <div :class="$style.bottom" v-if="type">
      <div :class="$style.business" v-if="type==='business'">
        <div :class="$style.busImg">
          <img src="http://cdn01.dwfei.com/img/sell/1b8295d8c49446af9954af76a7c495bb.jpg" alt="">
        </div>
        <div :class="$style.busCon">
          <div :class="$style.busTitle">澳淋健身游泳俱乐部</div>
          <div :class="$style.busTag">
            <span>健身房</span>
            <span>帖子</span>
          </div>
          <div :class="$style.busAddress">610米 东莞庄路120号</div>
        </div>
      </div>
      <div :class="$style.showList">
        列表显示
      </div>
    </div>
  </div>
</template>

<script>
import Filters from '../components/filters.vue'
import Sacle from '../components/sacle.vue'
import * as Types from '~src/store/types'

export default {
  name: 'map-index-view',
  components: { Filters, Sacle },
  data () {
    return {
      type: 'business'
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

  }
}
</script>

<style lang="stylus" module>
$breakline = #E1E5EB

.bottom
  position absolute
  bottom 0
  width 100%

.business
  display flex
  background #FFFFFF
  box-shadow 0 0 6px 0 rgba(0,0,0,0.10)

.busImg
  width 50%
  img
    position relative
    display block
    width 100%
    top 50%
    transform translateY(-50%)

.busCon
  position relative
  padding 16px
.busTitle
  font-size 15px
.busTag
  margin-top 6px
  display flex
  font-size 12px
  span
    padding 1px 8px
    margin-right 6px
    background #474C54
    color #fff
    border-radius 10px
.busAddress
  position absolute
  bottom 16px
  font-size 12px
  color #9DA2AB


.showList
  box-sizing border-box
  padding 12px 0
  font-size 16px
  text-align center
  color #57ABFF
  background #fff
  border-top 1px solid $breakline

.transTop
  transform translateY(-300px)
</style>
