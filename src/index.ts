import fetch from 'isomorphic-unfetch'
import url from 'url'

export type IMiddleware = (args: RequestInit) => RequestInit

type Diff<T, U> = T extends U ? never : T
type AllArgs<T> = T extends (...args: (infer A)[]) => any ? A : never

export class Muffled {
  private _options: any
  private _endpoint: string
  private _paths: string[]
  private _middlewares: IMiddleware[]
  [i: string]: <R>(args: AllArgs<R>) => any

  /**
   * Create Muffled API wrapper
   * @param {String} endpoint
   */
  constructor(endpoint: string, options?: any) {
    this._options = options

    const parsedURL = url.parse(endpoint)
    this._endpoint = parsedURL.protocol
      ? parsedURL.href!
      : 'https://' + parsedURL.href!
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
  use(middleware: IMiddleware) {
    this._middlewares.push(middleware)
  }

  _handleGet(target: any, name: string): any {
    if (name in target || name === 'methodMissing') {
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

  async _query(paths: string, args: any) {
    const entrypoint = url.resolve(this._endpoint, paths)

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

export function bearerAuth(token: string): IMiddleware {
  return (args) => {
    args.headers = { Authorization: `Bearer ${token}` }
    return args
  }
}
