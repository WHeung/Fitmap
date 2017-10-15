<template>
  <div :class="$style.main">
    <div :class="$style.formGroup">
      <Item title="手机号">
        <input :class="$style.phone" v-model="cellphone" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="验证码">
        <div :class="$style.code">
          <input type="text" v-model="code">
          <button v-if="!inSeconds" @click="getCode">发送验证码</button>
          <button v-else :class="$style.notClick">{{inSeconds}}s</button>
        </div>
      </Item>
    </div>
    <div :class="$style.tips" v-if="routeName === 'registerPhoneView'">请完善您的个人信息，以便获取更多内容。</div>
    <Btn type="blue" title="下一步" :disabled="disabled" @clickBtn="clickBtn"></Btn>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'
import valid from '~src/tool/verification'
import Btn from '~src/components/Btn.vue'

const mobileConfig = [
  {
    case: 'noBlank',
    data: ['mobile'],
    errorMsg: ['请填写手机号码']
  },
  {
    case: 'mobilePhone',
    data: ['mobile'],
    errorMsg: ['手机号码格式错误']
  }
]

export default {
  name: 'baseinfo-view',
  components: { Item, Btn },
  data () {
    return {
      cellphone: '',
      code: '',
      inSeconds: '',
      routeName: ''
    }
  },
  computed: {
    disabled () {
      let disabled = true
      if (valid({ mobile: this.cellphone }, mobileConfig) && this.code) {
        disabled = false
      }
      return disabled
    }
  },
  created () {
    this.routeName = this.$route.name
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    getCode () {
      const errMsg = valid({ mobile: this.cellphone }, mobileConfig)
      if (errMsg.count < 1) {
        this.inSeconds = 60
        let interval = setInterval(() => {
          this.inSeconds--
          if (this.inSeconds === 0) {
            clearInterval(interval)
            interval = null
          }
        }, 1000)
      } else {
        console.log(errMsg)
        this.$store.dispatch(Types.OPEN_POPUP, {
          title: '手机号码错误',
          word: errMsg.msg[0],
          leftMsg: '确定'
        })
      }
    },
    clickBtn () {
      if (this.routeName === 'userChangePhoneView') {
        this.$router.back()
      }
      if (this.routeName === 'registerPhoneView') {
        this.$router.push({ name: 'coummateInfoView' })
      }
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.line
  height 1px
  margin-left 18px
  background $breakline

.formGroup
  background $white
.phone
  width 100%
.code
  display inline-flex
  justify-content space-between
  >button
    padding 5px 0
    width (96/20)rem
    font-size 12px
    border 1px solid $mainText
    border-radius 100px
.notClick
  opacity .3

.tips
  margin 18px (24/20)rem 36px
  font-size 13px
  color $assistText

</style>
