import * as Types from '~src/store/types'
import CallApi from '~src/store/api'

const State = {}

const Mutations = {}

const Actions = {
  [Types.UPDATE_DETAIL] ({ state }, { type, id }) {
    return new Promise(resolve => {
      CallApi(Types.FETCH_DETAIL, { type: type + 's', id }).then(res => {
        const data = res.data.data
        resolve(data)
      })
    })
  },
  [Types.UPDATE_USERS_COLLECTS_POST] ({ state }, { type, id }) {
    return new Promise(resolve => {
      console.log(state)
      CallApi(Types.FETCH_USERS_COLLECTS_POST, { type, id }).then(res => {
        resolve()
      })
    })
  },
  [Types.UPDATE_USERS_COLLECTS_DEL] ({ state }, { type, id }) {
    return new Promise(resolve => {
      console.log(state)
      CallApi(Types.FETCH_USERS_COLLECTS_DEL, { type, id }).then(res => {
        resolve()
      })
    })
  }
}

export default {
  state: State,
  actions: Actions,
  mutations: Mutations
}
