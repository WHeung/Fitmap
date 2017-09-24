<template>
  <div :class="$style.main" v-pxtorem>
    <div :class="$style.avatar">
      <img src="http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0">
    </div>
    <div :class="$style.form">
      <Item title="昵称">
        <input :class="$style.input" v-model="form.name" placeholder="叫爸爸">
      </Item>
      <Item title="性别">
        <select :class="$style.input" v-model="form.gender">
          <option value="Male">男</option>
          <option value="Female">女</option>
        </select>
      </Item>
      <Item title="城市">
        <select :class="$style.areaSelect" v-model="form.provinceKey">
          <option :value="key" v-for="(province,key) in provinces" :key="key">{{province}}</option>
        </select>
        <select :class="$style.areaSelect" v-model="form.cityKey">
          <option :value="key" v-for="(city,key) in citys" :key="key">{{city}}</option>
        </select>
        <select :class="$style.areaSelect" v-model="form.districtKey">
          <option :value="key" v-for="(district,key) in districts" :key="key">{{district}}</option>
        </select>
      </Item>
      <Item title="公司名称">
        <input :class="$style.input"  v-model="form.company" placeholder="叫爸爸">
      </Item>
      <Item title="手机号">
        <input :class="$style.input"  v-model="form.mobile" placeholder="叫爸爸">
      </Item>
      <Item title="验证码">
        <input :class="$style.input"  v-model="form.code" placeholder="叫爸爸">
        <button :class="$style.btn">发送验证码</button>
      </Item>
      <div :class="$style.formBtn">
        <button :class="$style.submit" @click="submit">提交</button>
        <span :class="$style.skip">跳过</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as Types from '~src/store/types'
import area from 'china-area-data'
import Item from './components/item.vue'
import valid from '~src/tool/verification'

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
  components: { Item },
  data () {
    return {
      form: {
        name: '',
        gender: '',
        company: '',
        mobile: '',
        code: '',
        provinceKey: '',
        cityKey: '',
        districtKey: ''
      }
    }
  },
  computed: {
    provinces () {
      return area[86]
    },
    citys () {
      return area[this.form.provinceKey]
    },
    districts () {
      return area[this.form.cityKey]
    }
  },
  created () {
    this.$store.dispatch(Types.CLOSE_LOADING)
    console.log(area)
  },
  methods: {
    submit () {
      const result = valid(this.form, validConfig)
      console.log(result)
      const province = area[86][this.form.provinceKey]
      const city = area[this.form.provinceKey][this.cityKey]
      const district = area[this.form.cityKey][this.districtKey]
      const form = {
        name: this.name,
        gender: this.gender,
        address: province + city + district,
        company: this.company,
        mobile: this.mobile,
        code: this.code
      }
      console.log(form)
    }
  }
}
</script>

<style lang="stylus" module>
.avatar
  position relative
  margin 15px auto 0 auto
  width 74px
  height 74px
  overflow hidden
  background #fff
  border 2px solid #fff
  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
  border-radius 40px
  img
    position absolute
    top -3px
    left -3px
    width 80px
    height 80px

.form
  margin 20px 44px 0

.input
  border 1px solid #000

.areaSelect
  width (70/20)rem
  border 1px solid #000

.btn
  padding 5px 10px
  color #0094FF
  &:active
    opacity .7

.formBtn
  position relative
  margin-top 20px
  text-align center

.submit
  padding 8px 25px
  color #FFFFFF
  background #0094FF
  border-radius 5px
  &:active
    opacity .7

.skip
  position absolute
  bottom 0
  color #3F51B5
  margin-left 20px
  &:active
    opacity .7

</style>
