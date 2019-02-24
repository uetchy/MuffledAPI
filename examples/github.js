const { Muffled, bearerAuth } = require('muffled')

async function main() {
  /**
   * GitHub API
   */
  const GitHubAPI = new Muffled('api.github.com')

  // OAuth2 Bearer Auth
  GitHubAPI.use(bearerAuth(process.env.GITHUB_TOKEN))

  // This will fetch resource from `https://api.github.com/user/repos`
  const userAPI = GitHubAPI.user
  const result = await userAPI.repos()
  console.log(result)
}

main().catch((err) => console.error(err))
