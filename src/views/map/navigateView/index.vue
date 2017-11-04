<template>
  <div :class="$style.main" v-pxtorem>
    <div :class="$style.bottom">
      <div :class="$style.location">
        <div :class="$style.locCon">
          <div :class="$style.title">{{item.title}}</div>
          <div :class="$style.address">{{item.distance}} {{item.location}}</div>
        </div>
        <div :class="$style.locBtn" @click="findRoute">
          <i :class="$style.locIcon"></i>
          <span>线路</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
export default {
  name: 'navigate-view',
  data () {
    return {
      item: {}
    }
  },
  methods: {
    findRoute () {}
  },
  mounted () {
    this.$store.dispatch(Types.FALL_BUCKET, { id: 'MAP_LOCATION' }).then(data => {
      console.log(data)
      if (data) {
        this.item = data
        this.$store.dispatch(Types.UPDATE_MAP_LOCATION, data)
      } else {
        this.$router.back()
      }
    })
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.bottom
  position absolute
  bottom 0
  width 100%
  background $white

.location
  display flex

.locCon
  padding 18px 0
  padding-left 18px
  width 80%
  box-sizing border-box
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
  font-size 15px
.title
  font-weight 500
.address
  margin-top 6px
  color $assistText
.locBtn
  flex 1 1
  display inline-flex
  flex-direction column
  align-items center
  justify-content center
  color $white
  background $blueBtn
.locIcon
  width 24px
  height 24px
  background url('~public/fm_route.svg') no-repeat
  background-size 100% 100%
  
</style>
