declare interface RssSource {
  name: string;
  url: string;
  imgUrl: string;
  jsonResponse?: boolean;
}

declare interface RssItem {
  title: string[];
  link: string[];
  description: string[];
  "media:content"?: { $: { url: string } }[];
  "media:thumbnail"?: { $: { url: string } }[];
}

declare interface JsonItem {
  title: string;
  content_text: string;
  url: string;
  image: string;
}

declare interface FeedItem {
  name: string;
  url: string;
  imgUrl: string;
}

declare interface Article {
  title: string;
  caption: string;
  content: string;
  imgUrl: string;
  tags: string[];
  source: string;
  sourceUrl: string;
}
