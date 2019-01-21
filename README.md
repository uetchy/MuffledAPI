# MuffledAPI

Fully-automated API wrapper for JavaScript.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

```bash
npm install muffled
yarn add muffled
```

## Usage

```js
const { Muffled, bearerAuth } = require('muffled')

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
```

## API

## Maintainers

[@uetchy](https://github.com/uetchy)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2019 Yasuaki Uechi
