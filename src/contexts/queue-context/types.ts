import { Dispatch, SetStateAction } from "react";

export interface QueueContextState {
  queuedItems: FeedItem[];
  setQueuedItems: Dispatch<SetStateAction<FeedItem[]>>;
  retreiveQueueItem: (id: string) => FeedItem | undefined;
  addItemToQueue: (item: FeedItem) => void;
  removeItemFromQueue: (id: string) => void;
}

export const defaultQueueContextState: QueueContextState = {
  queuedItems: [],
  setQueuedItems: () => {},
  retreiveQueueItem: () => undefined,
  addItemToQueue: () => undefined,
  removeItemFromQueue: () => undefined,
};
