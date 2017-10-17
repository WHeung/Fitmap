import Vue from 'vue'
import Vuex from 'vuex'
import * as Types from './types'
import CallApi from '~src/store/api'
import mapModule from './modules/map'
import detailModule from './modules/detail'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nav: {
      title: 'Fitmap'
    },
    dialog: {
      content: '',
      show: false
    },
    toast: {
      content: '',
      show: false,
      liveTime: 3000,
      type: ''
    },
    popUp: {
      title: '',
      word: '',
      leftMsg: '',
      rightMsg: '',
      cancelCallback: null,
      callback: null,
      show: false
    },
    loading: true,
    apiLoading: false,
    user: {
      token: ''
    },
    bucket: {}
  },
  actions: {
    [Types.USER_LOGIN] ({ commit, state, dispatch }, { callback }) {
      return new Promise(resolve => {
        CallApi(Types.FETCH_USERS_GET).then(res => {
          const info = res.data.data
          commit(Types.SET_USER, {
            info: info
          })
          callback()
          resolve()
        })
      })
    },
    [Types.UPDATE_LOGIN_OAUTH] ({ commit, state, dispatch }, { code }) {
      return new Promise((resolve, reject) => {
        CallApi(Types.FETCH_USERS_OAUTH).then(res => {
          const info = res.data.data
          commit(Types.SET_USER, info)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    [Types.OPEN_TOAST] ({ commit, state }, { content, type }) {
      if (typeof type !== 'string') {
        type = ''
      }
      commit(Types.SET_TOAST, { content, type, show: true })
      setTimeout(() => {
        commit(Types.SET_TOAST, { content: '', type: '', show: false })
      }, state.toast.liveTime)
    },
    [Types.OPEN_LOADING] ({ commit }) {
      commit(Types.SET_LOADING, true)
    },
    [Types.CLOSE_LOADING] ({ commit }) {
      commit(Types.SET_LOADING, false)
    },
    [Types.OPEN_API_LOADING] ({ commit }) {
      commit(Types.SET_API_LOADING, true)
    },
    [Types.CLOSE_API_LOADING] ({ commit }) {
      commit(Types.SET_API_LOADING, false)
    },
    [Types.CHANGE_NAV] ({ commit, state }, navData) {
      commit(Types.SET_NAV, Object.assign({ title: 'Fitmap' }, navData))
    },
    [Types.OPEN_POPUP] ({ commit, state }, popUp) {
      commit(Types.SET_POPUP, Object.assign({}, state.popUp, popUp, { show: true }))
    },
    [Types.CLOSE_POPUP] ({ commit, state }) {
      commit(Types.SET_POPUP, Object.assign({}, {
        title: '',
        word: '',
        leftMsg: '',
        rightMsg: '',
        cancelCallback: null,
        callback: null,
        show: false
      }))
    },
    [Types.FILL_BUCKET] ({ commit, state, dispatch }, { id, data }) {
      commit(Types.SET_BUCKET, { id, data, type: 'fill' })
    },
    [Types.FALL_BUCKET] ({ commit, state, dispatch }, { id }) {
      return new Promise(resolve => {
        const data = state.bucket[id]
        commit(Types.SET_BUCKET, { id, type: 'fall' })
        resolve(data)
      })
    }
  },
  mutations: {
    [Types.SET_USER] (state, data) {
      console.log('mutation: set user info')
      state.data = Object.assign({}, state.data, data)
    },
    [Types.SET_TOAST] (state, { content, show, type }) {
      state.toast.content = content
      state.toast.show = show
      state.toast.type = type
    },
    [Types.SET_API_LOADING] (state, val) {
      state.apiLoading = val
    },
    [Types.SET_LOADING] (state, val) {
      state.loading = val
    },
    [Types.SET_NAV] (state, val) {
      Object.assign(state.nav, val)
      if (state.nav.title !== window.document.title) {
        window.document.title = state.nav.title
      }
    },
    [Types.SET_POPUP] (state, popUp) {
      state.popUp = Object.assign({}, state.popUp, popUp)
    },
    [Types.SET_BUCKET] (state, { id, data, type }) {
      if (type === 'fill') {
        state.bucket[id] = data
      }
      if (type === 'fall') {
        delete state.bucket[id]
      }
    }
  },
  modules: {
    map: mapModule,
    detail: detailModule
  }
})

export default store
