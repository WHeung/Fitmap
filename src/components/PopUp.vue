<template>
  <div :class="$style.popUpWp" v-show='popUp.show' @touchmove.prevent="">
    <div :class="$style.wp">
      <div :class="$style.title" v-if="popUp.title">{{popUp.title}}</div>
      <p :class="$style.word" v-html="popUp.word"></p>
      <div :class="$style.ensure" v-if="popUp.leftMsg || popUp.rightMsg">
        <span
        :class="[$style.leftBtn, {[$style.noRight]: !popUp.rightMsg}]" v-if="popUp.leftMsg"
        v-html="popUp.leftMsg" @click.stop="cancel"></span>
        <span
        :class="$style.rightBtn" v-if="popUp.rightMsg"
        v-html="popUp.rightMsg" @click.stop="ensure"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '~src/store/types'
  export default{
    name: 'pop-up',
    computed: {
      popUp () {
        return this.$store.state.popUp
      }
    },
    methods: {
      cancel () {
        this.popUp.cancelCallback && this.popUp.cancelCallback()
        this.$store.dispatch(types.CLOSE_POPUP)
      },
      ensure () {
        this.popUp.callback && this.popUp.callback()
        this.$store.dispatch(types.CLOSE_POPUP)
      }
    }
  }
</script>


<style lang="stylus" module>
@import '~tool/vendor'

.popUpWp
  position fixed
  width 100%
  background rgba(0, 0, 0, 0.5)
  top 0
  left 0
  bottom 0
  z-index 50

.wp
  position absolute
  top 40%
  left 50%
  width 280px
  transform translate(-50%, -50%)
  -webkit-transform translate(-50%, -50%)
  border-radius 4px
  background-color $white
  padding 0

.title
  padding 18px 0
  text-align center
  font-size 16px

.word
  margin 16px 12px 18px
  text-align center
  font-size 16px
  line-height 24px
  color $assistText

.ensure
  border-top 1px solid $breakline
  height 43px
  text-align center

.rightBtn
.leftBtn
  line-height 42px
  height 42px
  width 49%
  display inline-block
  font-size 13px
  vertical-align top

.noRight
  color $link

.rightBtn
  color $link
  border-left 1px solid $breakline

</style>
