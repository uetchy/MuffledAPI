const assert = require('assert')
const { Muffled } = require('../lib')

function bearerAuth(token) {
  return args => {
    args.headers = { Authorization: `Bearer ${token}` }
    return args
  }
}

describe('Muffled', () => {
  it('return Proxy', async () => {
    const api = new Muffled('https://api.spotify.com/v1')

    api.use(bearerAuth(process.env.SPOTIFY_TOKEN))

    const result = await api.search({ q: 'tree', type: 'album' })
    assert.equal(
      result.albums.href,
      'https://api.spotify.com/v1/search?query=tree&type=album&market=JP&offset=0&limit=20'
    )
  })
})
