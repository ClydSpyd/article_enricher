"use client";
import ListItem from "../discover/list-item";
import { Dispatch, SetStateAction, Suspense } from "react";

export default function Queue({
  onSelect,
  selectedId,
  items
}: {
  onSelect: Dispatch<SetStateAction<FeedItem | null>>;
  selectedId: string;
  items: FeedItem[];
}) {

  return (
    <Suspense fallback={<div>Loading queued items...</div>}>
      <div className="flex flex-col gap-1 pr-4">
        {items?.map((item: FeedItem) => (
          <div
          onClick={() => {onSelect(item)}}
          key={item.name}>
            <ListItem
              item={item}
              selected={selectedId === item.url}
            />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
