import url from 'url'
import fetch from 'isomorphic-unfetch'
import { URLSearchParams } from 'url'

export class Muffled {
  constructor(endpoint) {
    console.log('#construct', endpoint)
    this._endpoint = endpoint
    this._paths = []
    this._middlewares = []

    return new Proxy(this, {
      get: this._handleGet.bind(this),
    })
  }

  use(middleware) {
    console.log('#use', this)
    this._middlewares.push(middleware)
  }

  _handleGet(target, name) {
    if (name in target || name === 'methodMissing') {
      console.log('#matched', name)
      return target[name]
    }

    if (typeof name === 'string') {
      console.log('Proxy.get', name)
      console.log('this:', this)
      console.log('target:', target)
      if (this === target) {
        this._paths = []
      }
      this._paths.push(name)
      return new Proxy(() => null, {
        apply: (target, name, argumentsList) => {
          const paths = this._paths
          this._paths = []
          console.log('#apply inner', paths, argumentsList)
          return this._query(
            paths.join('/'),
            argumentsList.length > 0 ? argumentsList[0] : {}
          )
        },
        get: this._handleGet.bind(this),
      })
    }
  }

  async _query(paths, args) {
    const entrypoint = url.resolve(this._endpoint + '/', paths)
    console.log('#query', entrypoint, args)
    let compositedArgs = {}
    for (const middleware of this._middlewares) {
      compositedArgs = middleware(compositedArgs)
    }
    console.log('comp', compositedArgs)

    const res = await fetch(
      entrypoint + '?' + new URLSearchParams(args),
      compositedArgs
    )

    return await res.json()
  }
}
