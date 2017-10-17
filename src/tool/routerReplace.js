import * as Types from '~src/store/types'

export default function routerReplace (context, { name, path, query, params }) {
  if (query) {
    if (query.type) {
      console.log('%c query no can sent type prop', 'color:red;')
    }
  } else {
    query = {}
  }
  context.$router.replace({
    name: name,
    path: path,
    params: params,
    query: {
      ...query,
      type: Types.ROUTE_TYPE_REPLACE
    }
  })
}
