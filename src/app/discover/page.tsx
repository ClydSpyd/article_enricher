/* eslint-disable @next/next/no-img-element */
"use client";
import { rssSources } from "../../../api/rss-sources";
import API from "../../../api";
import { useState } from "react";
import ListItem from "./list-item";

// const dummyArticle = {
//   title: "New Article TWO",
//   caption: "A new caption for the article TWO",
//   content: "This is the content of the article TWO",
//   imgUrl: "https://example.com/image.jpg",
//   tags: ["news", "tech"],
//   source: "Tech News",
//   sourceUrl: "https://example.com/source",
// };

export default function DiscoverPage() {
  const [mapItems, setMapItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const doTheThing = async (url: string, isJSON: boolean) => {
    console.log("URL:", url);
    setLoading(true);
    if (!isJSON) {
      const { data: rssData, error } = await API.feed.rss(url);
      if (rssData) setMapItems(rssData);
      else if (error) console.log("Error:", error);
    } else {
      const { data: jsonData, error } = await API.feed.json(url);
      if (jsonData) setMapItems(jsonData);
      else if (error) console.log("Error:", error);
    }
    setLoading(false);
  };
  return (
    <div className="w-screen h-screen flex">
      <div className="w-[400px] h-full border border-white p-4">
        <h4 className="font-semibold">Article Feeds:</h4>
        <div className="w-full flex flex-col gap-1">
          {rssSources.map((source: RssSource) => (
            <div
              onClick={() => doTheThing(source.url, !!source.jsonResponse)}
              key={source.name}
              className="w-full border p-2 flex items-center gap-4 cursor-pointer"
            >
              <img
                className="h-[80px] w-[80px] border"
                src={source.imgUrl}
                alt={`${source.name}_logo`}
              />
              <h2 className="font-semibold">{source.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="grow p-4 flex flex-col gap-1 overflow-y-auto">
        {loading ? (
          <div>Loading...</div>
        ) : (
          mapItems?.map((item: FeedItem) => (
            <ListItem key={item.name} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
