<template>
  <div :class="$style.main">
    <div :class="$style.wechat">
      <div :class="$style.wechatImg">
        <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
      </div>
      <div :class="$style.wechatMsg">
        <div>
          <span>昵称</span>会飞的田鼠
        </div>
        <div>
          <span>性别</span>不男不女
        </div>
      </div>
    </div>
    <Item :class="$style.group" title="手机号" content="15622188859" :arrow="true"></Item>
    <div :class="$style.group">
      <Item title="姓名" content="李四" @clickCon="clickCon"></Item>
      <p :class="$style.line"></p>
      <Item title="城市" content="广东-广州"></Item>
    </div>
    <div :class="$style.group">
      <Item title="公司" content="广州某某投资有限公司"></Item>
      <p :class="$style.line"></p>
      <Item title="职务🌳" content="Boss"></Item>
    </div>
    <DialogMask v-if="dialog.show === true" :dialog="dialog" @cancel="closeDialog">
      <div :class="$style.input">
        <input type="text">
      </div>
    </DialogMask>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import area from 'china-area-data'
import Item from './components/item.vue'
import valid from '~src/tool/verification'
import DialogMask from '~src/components/DialogMask.vue'

const validConfig = [
  {
    case: 'noBlank',
    data: ['name', 'gender', 'provinceKey', 'cityKey', 'districtKey', 'mobile', 'code'],
    errorMsg: ['请填写昵称', '请选择性别', '请选择省份', '请选择城市', '请选择区/县', '请填手机号码', '请填验证码']
  },
  {
    case: 'mobilePhone',
    data: ['mobile'],
    errorMsg: ['手机号码格式错误']
  }
]
const mobileConfig = [
  {
    case: 'noBlank',
    data: ['mobile'],
    errorMsg: ['请填手机号码']
  },
  {
    case: 'mobilePhone',
    data: ['mobile'],
    errorMsg: ['手机号码格式错误']
  }
]

export default {
  name: 'baseinfo-view',
  components: { Item, DialogMask },
  data () {
    return {
      cityForm: {
        provinceKey: '',
        cityKey: '',
        districtKey: ''
      },
      dialog: {
        title: '',
        leftBtn: '取消',
        rightBtn: '确定',
        show: false,
        type: ''
      }
    }
  },
  computed: {
    provinces () {
      return area[86]
    },
    citys () {
      return area[this.cityForm.provinceKey]
    },
    districts () {
      return area[this.cityForm.cityKey]
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
    console.log(area)
  },
  methods: {
    clickCon () {
       Object.assign(this.dialog, {
        title: '请输入名字',
        show: true
      })
    },
    closeDialog () {
      this.dialog = {
        title: '',
        leftBtn: '取消',
        rightBtn: '确定',
        show: false,
        type: ''
      }
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
