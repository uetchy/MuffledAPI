const { Muffled, headerAuth } = require("muffled");

async function main() {
  /**
   * Holodex API
   */
  const Holodex = new Muffled("holodex.net/api/v2");

  // Access token auth
  Holodex.use(headerAuth("x-apikey", process.env.HOLODEX_TOKEN));

  // This will fetch resource from `https://holodex.net/api/v2/live`
  const liveStreams = await Holodex.live({ org: "Hololive", status: "live" });
  console.log(liveStreams[0]);

  const searchResult = await Holodex.search.videoSearch(
    {},
    { sort: "newest", offset: 0, limit: 1, target: ["stream"] }
  );
  console.log(searchResult.slice(0, 2));
}

main().catch((err) => console.error(err));
