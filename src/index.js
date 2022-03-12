import fetch from "isomorphic-unfetch";
import debug from "debug";

const log = debug("muffled");

export class Muffled {
  /**
   * Create Muffled API wrapper
   * @param {String} endpoint
   */
  constructor(endpoint, options = {}) {
    this._options = options;

    if (!endpoint.startsWith("http")) {
      endpoint = "https://" + endpoint;
    }

    log("constructor", endpoint, options);

    this._endpoint = endpoint;
    this._endpoint = this._endpoint.replace(/([^\/])$/, "$1/"); // append '/' at the end of url
    this._paths = [];
    this._middlewares = [];

    return new Proxy(this, {
      get: this._handleGet.bind(this),
    });
  }

  /**
   * Add middleware function
   * @param {Function} middleware
   */
  use(middleware) {
    this._middlewares.push(middleware);
  }

  _handleGet(target, name) {
    log("get", name);
    if (name in target || name === "methodMissing") {
      return target[name];
    }

    if (typeof name === "string") {
      // clear paths list if this func is called in the same
      if (this === target) {
        this._paths = [];
      }

      // add path to chain
      this._paths.push(name);

      return new Proxy(() => null, {
        apply: (target, name, argumentsList) => {
          const urlPath = this._paths.join("/");

          // clear paths list as the caller invoked
          this._paths = [];

          return this._query(urlPath, ...argumentsList);
        },
        get: this._handleGet.bind(this),
      });
    }
  }

  async _query(paths, params, args, signal) {
    log("query", paths, params, args);
    const entrypoint = new URL(paths, this._endpoint).href;
    log("entrypoint", entrypoint);

    let compositedArgs = {
      method: args !== undefined ? "POST" : "GET",
      signal,
    };

    // apply middlewares
    for (const middleware of this._middlewares) {
      compositedArgs = middleware(compositedArgs);
    }

    // apply overrides
    if ("overrides" in this._options) {
      for (const [path, args] of Object.entries(this._options.overrides)) {
        if (paths.startsWith(path)) {
          log("override", paths, args);
          compositedArgs = { ...compositedArgs, ...args };
        }
      }
    }

    // POST mode
    const isPost = compositedArgs.method === "POST";
    if (isPost) {
      if (args === undefined) {
        args = params;
        params = {};
      }

      const body = typeof args === "object" ? JSON.stringify(args) : args;

      compositedArgs.headers = {
        ...compositedArgs.headers,
        "content-type": "application/json",
      };
      compositedArgs.body = body;
    }

    log("args", compositedArgs);

    const res = await fetch(
      entrypoint + "?" + new URLSearchParams(params).toString(),
      compositedArgs
    );

    // parse JSON
    // TODO: make it compatible with any response
    const json = await res.json();

    return json;
  }
}

export function headerAuth(header, token) {
  return (args) => {
    args.headers = { ...args.headers, [header]: token };
    return args;
  };
}

export function bearerAuth(token) {
  return headerAuth("Authorization", `Bearer ${token}`);
}
