"use client";
import { createContext, use, useState } from "react";
import { QueueContextState, defaultQueueContextState } from "./types";

const QueueContext = createContext<QueueContextState>(defaultQueueContextState);

export default function QueueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queuedItems, setQueuedItems] = useState<FeedItem[]>([]);
  
  const retreiveQueueItem = (id: string) =>
    queuedItems.find((item) => item.name === id);

  const addItemToQueue = (item: FeedItem) => {
    setQueuedItems((prev) => [...prev, item]);
  };
  const removeItemFromQueue = (id: string) => {
    setQueuedItems((prev) => prev.filter((item) => item.name !== id));
  };

  return (
    <QueueContext.Provider
      value={{
        queuedItems,
        setQueuedItems,
        retreiveQueueItem,
        addItemToQueue,
        removeItemFromQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export const useQueue = () => use(QueueContext);
