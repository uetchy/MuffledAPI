const assert = require('assert')

const { Muffled, bearerAuth } = require('../lib')

describe('Muffled', () => {
  it('return Proxy', async () => {
    const api = new Muffled('https://api.spotify.com/v1', {
      responseFormat: 'json',
    })

    api.use(bearerAuth(process.env.SPOTIFY_TOKEN || 'anonymous'))

    const result = await api.search({ q: 'tree', type: 'album' })
    assert.equal(
      result.albums.href,
      'https://api.spotify.com/v1/search?query=tree&type=album&market=JP&offset=0&limit=20'
    )
  })
})
