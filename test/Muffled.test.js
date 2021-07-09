const { Muffled, bearerAuth } = require("..");

it("basic", async () => {
  const api = new Muffled("api.spotify.com");

  api.use(bearerAuth(process.env.SPOTIFY_TOKEN || "anonymous"));

  const result = await api.v1.search({ q: "tree", type: "album" });
  expect(result.albums.href).toBe(
    "https://api.spotify.com/v1/search?query=tree&type=album&market=JP&offset=0&limit=20"
  );
});

it("array", async () => {
  const api = new Muffled("holodex.net/api/v2");

  const result = await api.channels["UCMwGHR0BTZuLsmjY_NT5Pwg"]();
  expect(result.id).toBe("UCMwGHR0BTZuLsmjY_NT5Pwg");
  expect(result.org).toBe("Hololive");
});

it("post", async () => {
  const api = new Muffled("holodex.net/api/v2");

  const result = await api.search.videoSearch({}, { org: "Hololive" });
  expect(result[0].id).toBe("VfOmAbSU4R0");
});

it("post with method overrides", async () => {
  const api = new Muffled("holodex.net/api/v2", {
    overrides: {
      search: {
        method: "POST",
      },
    },
  });

  const result = await api.search.videoSearch({ org: ["Hololive"] });
  expect(result[0].id).toBe("VfOmAbSU4R0");
});
