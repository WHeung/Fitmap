import * as Types from '~src/store/types'
import CallApi from '~src/store/api'

var data = {
  'id': 111,
  'avatar': 'http://wx.qlogo.cn/mmhead/0sDCa2E8S1tpsYwWPibzhiciaLPJxX6ohkNJu2t4IXrF2mic8jbPlhrX2Q/0',
  'gender': '男',
  'realname': '怼蓝雷',
  'province': '广东省',
  'city': '广州市',
  'nickname': 'oh～yeah',
  'company': '广州某某某科技公司',
  'cellphone': '15622188859',
  'role': 'BOSS',
  'is_cellphone_checked': 1,
  'is_company_checked': 1,
  'items_collect': 1,
  'merchants_collect': 2,
  'posts_collect': 3,
  'token': 'string'
}

const State = {
  user: {
    token: ''
  }
}

const Mutations = {
  [Types.SET_USER] (state, data) {
    console.log('mutation: set user info')
    state.user = Object.assign({}, state.user, data)
  }
}

const Actions = {
  [Types.USER_LOGIN] ({ commit, state, dispatch }, { callback }) {
    return new Promise(resolve => {
      if (state.user.id) {
        resolve()
        return
      }
      CallApi(Types.FETCH_USERS_GET).then(res => {
        const info = res.data.data
        commit(Types.SET_USER, info)
        callback && callback()
        resolve()
      })
    })
  },
  [Types.UPDATE_LOGIN_OAUTH] ({ commit, state, dispatch }, { code }) {
    return new Promise((resolve, reject) => {
      CallApi(Types.FETCH_USERS_OAUTH, { code }, true).then(res => {
        const info = res.data.data
        window.document.cookie = `token=${info.token}`
        commit(Types.SET_USER, info)
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  [Types.UPDATE_CODE] ({ state }, { cellphone }) {
    return new Promise(resolve => {
      CallApi(Types.FETCH_CODE_GET, cellphone).then(res => {
        resolve(res.data.data.code)
      })
    })
  },
  [Types.UPDATE_VAILD_CODE] ({ state }, data) {
    return new Promise(resolve => {
      CallApi(Types.FETCH_VAILD_CODE, data).then(res => {
        resolve()
      })
    })
  },
  [Types.UPDATE_USER] ({ state, commit }, { data }) {
    return new Promise(resolve => {
      const user = Object.assign(state.user, data)
      CallApi(Types.FETCH_USERS_UPDATE, { data: user }).then(res => {
        commit(Types.SET_USER, res.data.data)
        resolve(res.data.data)
      })
    })
  },
  [Types.UPDATE_USERS_COLLECTS] ({ state, commit }, { type }) {
    return new Promise(resolve => {
      const data = {
        token: state.user.token,
        type: type
      }
      CallApi(Types.FETCH_USERS_COLLECTS_GET, { data }).then(res => {
        resolve(res.data.data)
      })
    })
  }
}

export default {
  state: State,
  actions: Actions,
  mutations: Mutations
}
