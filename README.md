![Muffled API](https://uechi-public.s3.amazonaws.com/github/MuffledAPI/logo.png)

[![Build Status](https://travis-ci.org/uetchy/MuffledAPI.svg?branch=master)](https://travis-ci.org/uetchy/MuffledAPI) [![Coverage Status](https://coveralls.io/repos/github/uetchy/MuffledAPI/badge.svg?branch=master)](https://coveralls.io/github/uetchy/MuffledAPI?branch=master)

**Muffled API** is a library generates a client for any API.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Install

You can install Muffled API via `npm` or `yarn`.

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

### `new Muffled(endpoint: String)`

This will create a class for given endpoint.

You can also specify endpoint like:

```
new Muffled('api.spotify.com')
new Muffled('https://api.spotify.com')
new Muffled('https://api.spotify.com/v1')
```

### API call

You can call any API query by passing property as a path string.

```
new Muffled('api.spotify.com').v1.search() // https://api.spotify.com/v1/search
new Muffled('api.spotify.com/v1').search() // https://api.spotify.com/v1/search
```

## Maintainers

[@uetchy](https://github.com/uetchy)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2019 Yasuaki Uechi
