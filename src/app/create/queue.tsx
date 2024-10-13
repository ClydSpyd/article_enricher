"use client";
import { useQueue } from "@/contexts/queue-context";
import ListItem from "../discover/list-item";
import { Suspense } from "react";

export default function Queue() {
  const { queuedItems = [] } = useQueue();

  return (
    <Suspense fallback={<div>Loading queued items...</div>}>
      <div className="flex flex-col gap-1 pr-4">
        {queuedItems?.map((item: FeedItem) => (
          <ListItem key={item.name} item={item} />
        ))}
      </div>
    </Suspense>
  );
}
