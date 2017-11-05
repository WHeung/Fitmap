<template>
  <div :class="$style.main">
    <div :class="$style.item" @click="toMap">
      <div :class="[$style.icon, $style.locationIcon]"></div>
      <div :class="$style.text">{{location.location}}</div>
      <div :class="$style.arrow"></div>
    </div>
    <p :class="$style.line"></p>
    <div :class="$style.item" @click="clickPhone">
      <div :class="[$style.icon, $style.phoneIcon]"></div>
      <div :class="$style.text">
        <span v-for="phone in telephones" :key="phone"><i>, </i>{{phone}}</span>
      </div>
      <div :class="$style.arrow"></div>
    </div>
    <MaskLayer :class="$style.maskWrap" v-if="dialog.show" @maskClick="cancelMask">
      <div :class="$style.maskCon">
        <template v-for="(phone,index) in telephones">
          <div :class="$style.maskConLine" v-if="index !== 0" :key="index"></div>
          <div :class="$style.maskConItem" @click="chosePhone(phone)" :key="index">
            {{phone}}
          </div>
        </template>
        <div :class="$style.maskConItem" @click="cancelMask">取消</div>
      </div>
    </MaskLayer>
  </div>
</template>

<script>
import MaskLayer from '~src/components/MaskLayer.vue'
import * as Types from '~src/store/types'
export default {
  name: 'around-item',
  components: { MaskLayer },
  props: ['location', 'telephones'],
  data () {
    return {
      dialog: {
        show: false,
        title: '拨打电话'
      }
    }
  },
  methods: {
    clickPhone () {
      if (typeof this.telephones === 'object' && this.telephones.length) {
        if (this.telephones.length === 1) {
          window.location.href = 'tel:' + this.telephones[0]
        } else {
          this.dialog.show = true
        }
      }
    },
    cancelMask (val) {
      this.dialog.show = false
    },
    chosePhone (phone) {
      window.location.href = `tel:${phone}`
    },
    toMap () {
      this.$emit('toMap')
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.item
  padding 12px 18px
  display flex
  align-items center
  font-size 14px
.icon
  flex 0 0 auto
  margin-right (12/20)rem
  width 28px
  height 28px
  background-repeat no-repeat
  background-size 100% 100%
  &.locationIcon
    background-image url('~public/fm_list_locate.svg')
  &.phoneIcon
    background-image url('~public/fm_list_call.svg')
.text
  margin-right 12px
  flex 1 1 auto
  >span
    white-space nowrap
    &:first-child i
      display none
.arrow
  flex 0 0 auto
  height 16px
  width 16px
  background url('~public/fm_goto.svg') no-repeat
  background-size 100% 100%
.line
  margin-left 18px
  height 1px
  background $breakline

.main .maskWrap
  align-items flex-end
.maskCon
  width (375/20)rem
  background $breakline
.maskConItem
  padding 12px 0
  display flex
  justify-content center
  background $white
  &:active
    background $breakline
  &:last-child
    margin-top 6px
.maskConLine
  height 1px
  background $breakline

</style>
