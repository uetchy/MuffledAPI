export class Muffled {
  endpoint: String

  constructor(endpoint: String) {
    this.endpoint = endpoint
  }

  __noSuchMethod__(id, args) {
    console.log(id)
  }
}

export function bearerAuth(req, res, next) {}
