const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const rssSources: RssSource[] = [
  {
    name: "All Music",
    url: "https://www.allmusic.com/rss/",
    imgUrl: `${baseUrl}/assets/images/all-music.jpeg`,
  },
  {
    name: "Pitchfork",
    url: "https://pitchfork.com/feed/feed-news/rss/",
    imgUrl: `${baseUrl}/assets/images/pitchfork.jpeg`,
  },
  {
    name: "NME",
    url: "https://rss.app/feeds/v1.1/bU9DiEUcGj69RaJT.json",
    imgUrl: `${baseUrl}/assets/images/nme.png`,
    jsonResponse: true,
  },
  {
    name: "Metal Injection",
    url: "https://rss.app/feeds/v1.1/tK1ZDQviqoYJGAOw.json",
    imgUrl: `${baseUrl}/assets/images/metal-injection.png`,
    jsonResponse: true,
  },
  {
    name: "Music Feed",
    url: "https://rss.app/feeds/v1.1/tnAwEr4FI8zCVS7m.json",
    imgUrl: `${baseUrl}/assets/images/music-feed.png`,
    jsonResponse: true,
  },
];
