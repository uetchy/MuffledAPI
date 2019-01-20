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
const { Muffled, bearerAuth } = require('muffled')

const SpotifyAPI = Muffled('https://api.spotify.com/v1')

// Inject "Authorization: Bearer <token>" header into every request
SpotifyAPI.use(bearerAuth(process.env.SPOTIFY_TOKEN))

// Search for musics
SpotifyAPI.search({
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
