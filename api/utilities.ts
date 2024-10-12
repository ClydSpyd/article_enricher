export const normalizeRssArticle = (item:RssItem): FeedItem => {
    const existingImg =
      item["media:thumbnail"]?.[0].$.url ?? item["media:content"]?.[0].$.url;

      return {
        name: item.title[0],
        url: item.link[0],
        imgUrl: existingImg ?? "",
      };
};
export const normalizeJSONArticle = (item:JsonItem): FeedItem => {
      return {
        name:item.title,
        url: item.url,
        imgUrl: item.image,
      };
};