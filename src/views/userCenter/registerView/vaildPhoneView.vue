<template>
  <div :class="$style.main">
    <div :class="$style.formGroup">
      <Item title="手机号">
        <input :class="$style.phone" v-model="cellphone" type="text">
      </Item>
      <p :class="$style.line"></p>
      <Item title="验证码" :class="$style.code">
        <input type="text" v-model="code">
        <button v-if="!inSeconds" @click="getCode">发送验证码</button>
        <button v-else :class="$style.notClick">{{inSeconds}}s</button>
      </Item>
    </div>
    <div :class="$style.tips" v-if="routeName === 'registerPhoneView'">请完善您的个人信息，以便获取更多内容。</div>
    <div :class="$style.btn">
      <Btn type="blue" title="下一步" :disabled="disabled" @clickBtn="clickBtn"></Btn>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'
import valid from '~src/tool/verification'
import Btn from '~src/components/Btn.vue'
import routerReplace from '~src/tool/routerReplace.js'

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
  name: 'vaildPhone-view',
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
    user () {
      return this.$store.state.user.user
    },
    disabled () {
      let disabled = true
      const err = valid({ mobile: this.cellphone }, mobileConfig)
      if (err.count === 0 && this.code) {
        disabled = false
      }
      return disabled
    }
  },
  created () {
    this.routeName = this.$route.name
    console.log(this.routeName)
    if (this.routeName === 'userChangePhoneView') {
      this.$store.dispatch(Types.CHANGE_NAV, { title: `更换手机号 Fit-map` })
    } else {
      this.$store.dispatch(Types.CHANGE_NAV, { title: `验证手机 Fit-map` })
    }
    this.$store.dispatch(Types.CLOSE_LOADING)
  },
  methods: {
    getCode () {
      const errMsg = valid({ mobile: this.cellphone }, mobileConfig)
      if (errMsg.count < 1) {
        this.inSeconds = 60
        this.$store.dispatch(Types.UPDATE_CODE, { cellphone: this.cellphone })
        let interval = setInterval(() => {
          this.inSeconds--
          if (this.inSeconds === 0) {
            clearInterval(interval)
            interval = null
          }
        }, 1000)
      } else {
        this.$store.dispatch(Types.OPEN_POPUP, {
          title: '手机号码错误',
          word: errMsg.msg[0],
          leftMsg: '确定'
        })
      }
    },
    clickBtn () {
      const data = {
        cellphone: this.cellphone,
        code: this.code
      }
      if (this.routeName === 'userChangePhoneView') {
        this.$store.dispatch(Types.UPDATE_USER, { data: data }).then(() => {
          this.$router.back()
        })
      }
      if (this.routeName === 'registerPhoneView') {
        this.$store.dispatch(Types.UPDATE_VAILD_CODE, { data: data }).then(() => {
          this.$store.dispatch(Types.UPDATE_USER, { data: { cellphone: this.cellphone }}).then(() => {
            const query = {}
            if (this.$route.query.toRoute) { // toRoute
              query.toRoute = this.$route.query.toRoute
            }
            if (!this.user.is_company_checked) {
              routerReplace(this, { name: 'coummateInfoView', query: query })
              return
            } else if (query.toRoute) {
              const toRoute = JSON.parse(query.toRoute)
              routerReplace(this, toRoute)
              return
            } else {
              this.$router.back()
            }
          })
        })
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
  input
    max-width 50%
    flex 0 1
    margin-right 10px
  button
    flex 0 0 (96/20)rem
    padding 5px 0
    font-size 12px
    border 1px solid $mainText
    border-radius 100px
.notClick
  opacity .3

.tips
  margin 18px (24/20)rem 0
  font-size 13px
  color $assistText

.btn
  margin-top 36px

</style>
