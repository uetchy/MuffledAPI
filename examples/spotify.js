const { Muffled, bearerAuth } = require('muffled')

async function main() {
  /**
   * Spotify API
   */
  const SpotifyAPI = new Muffled('api.spotify.com')

  // Inject "Authorization: Bearer <token>" header into every request
  SpotifyAPI.use(bearerAuth(process.env.SPOTIFY_TOKEN))

  // This will fetch resource from `https://api.spotify.com/v1/search`
  const result = await SpotifyAPI.v1.search({
    q: 'roadhouse blues',
    type: 'album,track',
  })
  console.log(result)
}

main().catch(err => console.error(err))
