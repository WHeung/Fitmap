<template>
  <div :class="$style.main">
    <div :class="$style.wechat">
      <div :class="$style.wechatImg">
        <img :src="user.avatar">
      </div>
      <div :class="$style.wechatMsg">
        <div>
          <span>昵称</span>{{user.nickname}}
        </div>
        <div>
          <span>性别</span>{{user.gender}}
        </div>
      </div>
    </div>
    <Item :class="$style.group" title="手机号" :content="user.cellphone" :arrow="true" @clickCon="clickPhone"></Item>
    <div :class="$style.group">
      <Item title="姓名" :content="user.name" @clickCon="openDialog({ name: '姓名', val: 'name'})"></Item>
      <p :class="$style.line"></p>
      <Item title="城市" :content="positionData" @clickCon="openMask('area')"></Item>
    </div>
    <div :class="$style.group">
      <Item title="公司" :content="user.company" @clickCon="openDialog({ name: '公司名称', val: 'company'})"></Item>
      <p :class="$style.line"></p>
      <Item title="职务" :content="user.position" @clickCon="openMask('job')"></Item>
    </div>
    <DialogMask v-if="dialog.show === true" :dialog="dialog" @cancel="closeDialog" @ensure="dialogEnsure">
      <div :class="$style.input">
        <input type="text" v-model="input" ref="input">
      </div>
    </DialogMask>
    <BottomMask v-if="user.id"
      :province="user.province" :city="user.city"
      :position="user.position" @maskClose="maskClose" :mask="mask"
      @maskEnsure="maskEnsure"></BottomMask>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import Item from './components/item.vue'
import DialogMask from '~src/components/DialogMask.vue'
import BottomMask from '../components/bottomMask.vue'

export default {
  name: 'baseinfo-view',
  components: { Item, DialogMask, BottomMask },
  data () {
    return {
      dialog: {
        title: '',
        leftBtn: '取消',
        rightBtn: '确定',
        show: false,
        type: ''
      },
      input: '',
      mask: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user.user
    },
    positionData () {
      if (this.user.province && this.user.city) {
        return `${this.user.province}-${this.user.city}`
      } else {
        return ''
      }
    }
  },
  created () {
    this.$store.dispatch(Types.CHANGE_NAV, { title: `个人信息 Fit-map` })
    this.$store.dispatch(Types.USER_LOGIN, {}).then(() => {
      this.$store.dispatch(Types.CLOSE_LOADING)
    })
  },
  methods: {
    openDialog ({ name, val }) {
      this.input = this.user[val]
      Object.assign(this.dialog, {
        title: '请输入' + name,
        type: val,
        show: true
      })
      setTimeout(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      }, 200)
    },
    closeDialog () {
      this.input = ''
      this.dialog = {
        title: '',
        leftBtn: '取消',
        rightBtn: '确定',
        show: false,
        type: ''
      }
    },
    clickPhone () {
      this.$router.push({ name: 'userChangePhoneView', params: { id: this.$route.params.id }})
    },
    openMask (type) {
      this.mask = type
    },
    maskClose () {
      this.mask = ''
    },
    maskEnsure ({ type, data }) {
      if (type === 'position') {
        if (this.user.position === data.position) {
          return
        }
      }
      if (type === 'area') {
        if (this.user.province === data.province && this.user.city === data.city) {
          return
        }
      }
      this.$store.dispatch(Types.UPDATE_USER, { data: data })
    },
    dialogEnsure (type) {
      const data = {}
      if (this.user[type] !== this.input) {
        data[type] = this.input
        this.$store.dispatch(Types.UPDATE_USER, { data: data })
      }
      this.closeDialog()
    }
  }
}
</script>

<style lang="stylus" module>
@import '~tool/vendor'

.wechat
  padding 18px 0 18px 18px
  display flex
  background $white
.wechatImg
  margin-right (23/20)rem
  width 66px
  height 66px
  overflow hidden
  background $white
  border 3px solid $white
  box-shadow 0 4px 12px 0 rgba(0,0,0,.1)
  border-radius 100px
  img
    position relative
    display block
    top 0
    left 50%
    transform translateX(-50%)
    height 100%
.wechatMsg
  line-height 36px
  span
    margin-right 12px
    color $assistText

.group
  margin-top 12px
  background $white
.line
  height 1px
  margin-left 18px
  background $breakline

.input
  margin 0 18px 18px
  padding 6px 16px
  border 1px solid $border
  border-radius 100px
  >input
    font-size 16px
    line-height 24px
    width 100%

</style>
