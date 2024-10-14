"use client";
import { createContext, use } from "react";
import { QueueContextState, defaultQueueContextState } from "./types";
import { useLocalStorage } from "usehooks-ts";

const QueueContext = createContext<QueueContextState>(defaultQueueContextState);

export default function QueueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queuedItems, setQueuedItems] = useLocalStorage<FeedItem[]>(
    "queuedItems",
    []
  );
  
  const retreiveQueueItem = (id: string) =>
    queuedItems.find((item) => item.name === id);

  const addItemToQueue = (item: FeedItem) => {
    setQueuedItems((prev) => [...prev, item]);
  };
  const removeItemFromQueue = (url: string) => {
    setQueuedItems((prev) => prev.filter((item) => item.url !== url));
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
