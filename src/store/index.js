import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'
import mapModule from './modules/map'

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
      word: '',
      leftMsg: '',
      rightMsg: '',
      cancelCallback: null,
      callback: null,
      show: false
    },
    loading: true,
    apiLoading: false,
    bucket: {}
  },
  actions: {
    [types.OPEN_TOAST] ({ commit, state }, { content, type }) {
      if (typeof type !== 'string') {
        type = ''
      }
      commit(types.SET_TOAST, { content, type, show: true })
      setTimeout(() => {
        commit(types.SET_TOAST, { content: '', type: '', show: false })
      }, state.toast.liveTime)
    },
    [types.OPEN_LOADING] ({ commit }) {
      commit(types.SET_LOADING, true)
    },
    [types.CLOSE_LOADING] ({ commit }) {
      commit(types.SET_LOADING, false)
    },
    [types.OPEN_API_LOADING] ({ commit }) {
      commit(types.SET_API_LOADING, true)
    },
    [types.CLOSE_API_LOADING] ({ commit }) {
      commit(types.SET_API_LOADING, false)
    },
    [types.CHANGE_NAV] ({ commit, state }, navData) {
      commit(types.SET_NAV, Object.assign({ title: 'Fitmap' }, navData))
    },
    [types.OPEN_POPUP] ({ commit, state }, popUp) {
      commit(types.SET_POPUP, Object.assign({}, state.popUp, popUp, { show: true }))
    },
    [types.CLOSE_POPUP] ({ commit, state }) {
      commit(types.SET_POPUP, Object.assign({}, state.popUp, {
        word: '',
        leftMsg: '',
        rightMsg: '',
        cancelCallback: null,
        callback: null,
        show: false
      }))
    },
    [types.FILL_BUCKET] ({ commit, state, dispatch }, { id, data }) {
      commit(types.SET_BUCKET, { id, data, type: 'fill' })
    },
    [types.FALL_BUCKET] ({ commit, state, dispatch }, { id }) {
      return new Promise(resolve => {
        const data = state.bucket[id]
        commit(types.SET_BUCKET, { id, type: 'fall' })
        resolve(data)
      })
    }
  },
  mutations: {
    [types.SET_TOAST] (state, { content, show, type }) {
      state.toast.content = content
      state.toast.show = show
      state.toast.type = type
    },
    [types.SET_API_LOADING] (state, val) {
      state.apiLoading = val
    },
    [types.SET_LOADING] (state, val) {
      state.loading = val
    },
    [types.SET_NAV] (state, val) {
      Object.assign(state.nav, val)
      if (state.nav.title !== window.document.title) {
        window.document.title = state.nav.title
      }
    },
    [types.SET_POPUP] (state, popUp) {
      state.popUp = Object.assign({}, state.popUp, popUp)
    },
    [types.SET_BUCKET] (state, { id, data, type }) {
      if (type === 'fill') {
        state.bucket[id] = data
      }
      if (type === 'fall') {
        delete state.bucket[id]
      }
    }
  },
  modules: {
    map: mapModule
  }
})

export default store
