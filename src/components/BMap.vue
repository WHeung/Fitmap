<template>
  <div id="allmap" :style="mapStyle">
  </div>
</template>

<script>
import BMap from 'BMap'
import * as types from '~src/store/types'

export default {
  data () {
    return {
      mapStyle: {
        width: window.screen.width + 'px',
        height: window.screen.height + 'px'
      }
    }
  },
  props: ['stores'],
  watch: {
    stores: {
      handler (val) {
      }
    }
  },
  created () {
  },
  mounted () {
    const map = new BMap.Map('allmap') // 创建Map实例
    map.setCurrentCity('广州')          // 设置地图显示的城市 此项是必须设置的
    map.centerAndZoom('广州', 14)  // 初始化地图,设置中心点坐标和地图级别
    map.setMapStyle({ style: 'normal' })
    this.$emit('input', map)
    var pt = new BMap.Point(113.270712,23.131547)
    const iconImg = 'http://wx.qlogo.cn/mmopen/vi_32/NXlA6XJzx5Lr36UEw5h9vM6wLkyCjO0YyZ3Fs0bRglF9y8JFqhNxcMomDkdiarLVWAIhu9cAkXPGTTic9THTiaCfQ/0'
    var myIcon = new BMap.Icon(iconImg, new BMap.Size(25,25), {
      imageSize: new BMap.Size(25,25)
    })
    var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2)
  },
  methods: {
    handleClick (e, mrks) {
      this.$store.dispatch(types.UPDATE_MAP_SELECTED, mrks.id)
    }
  }
}

</script>

<style lang="stylus">
.map-point
  position absolute
  z-index 1
  background #f7f7f7
  height 18px
  line-height 18px
  padding 5px
  white-space nowrap
  font-size 13px
  border 1px solid #d8d8d8
  border-radius 3px
  color #675F6D
  &:after
    content ''
    display table
    position absolute
    bottom -6px
    left 50%
    transform translateX(-50%) rotate(45deg)
    border 1px solid #d8d8d8
    width: 10px;
    height: 10px;
    border-top: 0;
    border-left: 0;
    background #f7f7f7
  &.active
    background #32c47c
    border 1px solid #32c47c
    color #fff
    z-index 2
    &:after
      background #32c47c
      border 1px solid #32c47c

.anchorBL
  display none


</style>
