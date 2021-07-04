const { Muffled, bearerAuth } = require("muffled");

async function main() {
  /**
   * NatureRemo API
   */
  const NatureRemo = new Muffled("api.nature.global/1");

  // OAuth2 Bearer Auth
  NatureRemo.use(bearerAuth(process.env.NATURE_REMO_TOKEN));

  // This will fetch resource from `https://api.nature.global/1/devices`
  const devices = await NatureRemo.devices();
  console.log(devices);

  const {
    newest_events: { te, hu },
    name,
  } = devices[0];

  console.log(`[${name}]`);
  console.log(`Temperature: ${te.val}`);
  console.log(`Humidity: ${hu.val}`);
}

main().catch((err) => console.error(err));
