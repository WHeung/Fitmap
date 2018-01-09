import * as Types from '~src/store/types'

export default function routerReplace (context, { name, path, query, params }) {
  if (query) {
    if (query.type) {
    }
  } else {
    query = {}
  }
  context.$router.replace({
    name: name || undefined,
    path: path || undefined,
    params: params,
    query: {
      ...query,
      type: Types.ROUTE_TYPE_REPLACE
    }
  })
}
