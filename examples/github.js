const { Muffled, bearerAuth } = require('muffled')

/**
 * GitHub API
 */
const GitHubAPI = new Muffled('api.github.com')

// Inject "Authorization: Bearer <token>" header into every request
GitHubAPI.use(bearerAuth(process.env.GITHUB_TOKEN))

// This will fetch resource from `https://api.github.com/user/repos`
const result = await GitHubAPI.user.repos()
console.log(result)
