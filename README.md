# MuffledAPI

> Wrap API

TODO: Fill out this long description.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

```session
npm install muffled
yarn add muffled
```

## Usage

```js
const { Muffled, bearerAuth, tokenQueryAuth } = require('muffled')

/**
 * Spotify API
 */
const SpotifyAPI = new Muffled('https://api.spotify.com/v1')

// Inject "Authorization: Bearer <token>" header into every request
SpotifyAPI.use(bearerAuth(process.env.SPOTIFY_TOKEN))

// Search for musics
const result = await SpotifyAPI.search({
  q: 'roadhouse blues',
  type: 'album,track',
})

/**
 * GitHub API
 */
const GitHubAPI = Muffled('https://api.github.com/v2')

// Inject "?token=<token>" query string into every request
GitHubAPI.use(tokenQueryAuth(process.env.GITHUB_TOKEN))

const result = await GitHubAPI.repository()
```

## API

## Maintainers

[@uetchy](https://github.com/uetchy)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2019 Yasuaki Uechi
