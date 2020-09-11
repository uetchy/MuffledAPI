import { Muffled, bearerAuth } from '..'

async function main() {
  /**
   * Spotify API
   */
  const SpotifyAPI = new Muffled('api.spotify.com/v1')

  // OAuth2 Bearer Auth
  SpotifyAPI.use(bearerAuth(process.env.SPOTIFY_TOKEN!))

  // This will fetch resource from `https://api.spotify.com/v1/search`
  const result = await SpotifyAPI.search({
    q: 'roadhouse blues',
    type: 'album,track',
  })
  console.log(result)
}

main().catch((err) => console.error(err))
