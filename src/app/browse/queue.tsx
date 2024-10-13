// "use client";
import ListItem from "./list-item";
import { Suspense } from "react";

export default async function BrowseQueue({articles}:{articles:Article[]}) {
  return (
    <Suspense fallback={<div>Loading queued items...</div>}>
      <div className="flex flex-col gap-1 pr-4">
        {articles.map((item: Article) => (
          <ListItem key={item.title} item={item} />
        ))}
      </div>
    </Suspense>
  );
}
