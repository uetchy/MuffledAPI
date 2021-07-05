![Muffled API](https://uechi-public.s3.amazonaws.com/github/MuffledAPI/logo.png)

[![Actions Status: test](https://github.com/uetchy/MuffledAPI/workflows/test/badge.svg)](https://github.com/uetchy/MuffledAPI/actions?query=test)
[![npm version](https://img.shields.io/npm/v/muffled.svg)](https://www.npmjs.com/package/muffled)

# Muffled API 🧣

> Omnipotent API Client armed with a power of `Proxy`.

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
const { Muffled, bearerAuth } = require("muffled");

/**
 * Spotify API
 */
const SpotifyAPI = new Muffled("api.spotify.com/v1");

// OAuth2 Bearer Authentication
SpotifyAPI.use(bearerAuth(process.env.SPOTIFY_TOKEN));

// This will fetch resource from `https://api.spotify.com/v1/search`
const result = await SpotifyAPI.search({
  q: "roadhouse blues",
  type: "album,track",
});
```

## API

### `new Muffled(endpoint: String)`

This will create a class for given endpoint.

You can also specify endpoint like:

```js
new Muffled("api.spotify.com");
new Muffled("https://api.spotify.com");
new Muffled("https://api.spotify.com/v1");
```

### API call

You can call any API query by passing property as a path string.

```js
new Muffled("api.spotify.com").v1.search({ limit: 1 }); // GET https://api.spotify.com/v1/search?limit=1
new Muffled("api.spotify.com/v1").search({ limit: 1 }, { query: "hey" }); // POST https://api.spotify.com/v1/search?limit=1 -F '{"query": "hey"}' -H contnet-type=application/json

new Muffled("holodex.net/api/v2").channels["UCMwGHR0BTZuLsmjY_NT5Pwg"](); // GET https://holodex.net/api/v2/channels/UCMwGHR0BTZuLsmjY_NT5Pwg
```

You can also call them using partial components:

```js
const { user } = new Muffled("api.github.com");
const userRepos = await user.repos();
```

### Method override

```js
const client = new Muffled("holodex.net/api/v2", {
  overrides: {
    "/search": {
      method: "POST",
    },
  },
});

client.search.videoSearch({ query: "hey" }); // POST https://holodex.net/api/v2/search/videoSearch -F '{"query": "hey"}' -H contnet-type=application/json
```

## Authorization

### OAuth Bearer Token

```js
const { Muffled, bearerAuth } = require("muffled");

const API = new Muffled("api.github.com");

API.use(bearerAuth(process.env.GITHUB_TOKEN));

API.user.repos(); // this will inject github token into Authorization header
```

### Generic Header Auth

```js
const { Muffled, headerAuth } = require("muffled");

const API = new Muffled("holodex.net");

API.use(headerAuth("x-apikey", process.env.HOLODEX_TOKEN));

API.live(); // this will inject apikey into x-apikey header
```

## Maintainers

[@uetchy](https://github.com/uetchy)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2019 Yasuaki Uechi
