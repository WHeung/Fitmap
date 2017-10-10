import * as Types from '~src/store/types'
import CallApi from '~src/store/api'

const State = {
  map: null,
  selectedItem: null
}

const Mutations = {
  [Types.SET_MAP] (state, data) {
    console.log('mutation: set map')
    state.map = data
  },
  [Types.SET_MAP_SELECTED] (state, data) {
    console.log('mutation: set selectedItem')
    state.selectedItem = data
  }
}

const Actions = {
}

export default {
  state: State,
  actions: Actions,
  mutations: Mutations
}
