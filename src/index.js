import fetch from 'isomorphic-unfetch'
import url from 'url'

export class Muffled {
  /**
   * Create Muffled API wrapper
   * @param {String} endpoint
   */
  constructor(endpoint, options) {
    this._options = options

    const parsedURL = url.parse(endpoint)
    this._endpoint = parsedURL.protocol
      ? parsedURL.href
      : 'https://' + parsedURL.href
    this._endpoint = this._endpoint.replace(/([^\/])$/, '$1/') // append '/' at the end of url
    this._paths = []
    this._middlewares = []

    return new Proxy(this, {
      get: this._handleGet.bind(this),
    })
  }

  /**
   * Add middleware function
   * @param {Function} middleware
   */
  use(middleware) {
    this._middlewares.push(middleware)
  }

  _handleGet(target, name) {
    if (name in target || name === 'methodMissing') {
      console.debug('#matched', name)
      return target[name]
    }

    if (typeof name === 'string') {
      // clear paths list if this func is called in the same
      if (this === target) {
        this._paths = []
      }

      // add path to chain
      this._paths.push(name)

      return new Proxy(() => null, {
        apply: (target, name, argumentsList) => {
          const urlPath = this._paths.join('/')

          // clear paths list as the caller invoked
          this._paths = []

          return this._query(
            urlPath,
            argumentsList.length > 0 ? argumentsList[0] : {}
          )
        },
        get: this._handleGet.bind(this),
      })
    }
  }

  async _query(paths, args) {
    const entrypoint = url.resolve(this._endpoint, paths)
    console.debug('#entry', entrypoint)

    let compositedArgs = {}
    for (const middleware of this._middlewares) {
      compositedArgs = middleware(compositedArgs)
    }

    const res = await fetch(
      entrypoint + '?' + new url.URLSearchParams(args),
      compositedArgs
    )

    // parse JSON
    // TODO: make it compatible with any response
    const json = await res.json()

    return json
  }
}

export function bearerAuth(token) {
  return (args) => {
    args.headers = { Authorization: `Bearer ${token}` }
    return args
  }
}
