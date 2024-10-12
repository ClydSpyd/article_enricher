import { MdOutlineOpenInNew } from "react-icons/md";
import { CgPlayListAdd, CgPlayListCheck } from "react-icons/cg";
import { cn } from "../../lib/utilities";
import { useQueue } from "@/contexts/queue-context";
import Image from "next/image";



export default function ListItem({
  item,
}: Readonly<{
  item: FeedItem;
}>) {
  const { retreiveQueueItem, addItemToQueue, removeItemFromQueue } = useQueue();

  const isInQueue = !!retreiveQueueItem(item.name);

  const handleAddToQueue = () => {
    if (!isInQueue) {
      addItemToQueue(item);
    } else {
      removeItemFromQueue(item.name);
    }
  };

  return (
    <div className="w-full border p-2 flex items-center gap-4">
      <div className="h-[80px] w-[80px] border relative">
        <Image
          layout="fill"
          objectFit="cover"
          src={item.imgUrl}
          alt={`${item.name}_logo`}
        />
      </div>
      <div className="grow">
        <h2 className="font-semibold">{item.name}</h2>
      </div>
      <div className="h-full gap-2 flex items-center justify-evenly">
        <a href={item.url} target="_blank" rel="noreferrer">
          <div className="h-[40px] w-[40px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200">
            <MdOutlineOpenInNew size={18} />
          </div>
        </a>
        <div
          onClick={handleAddToQueue}
          className={cn(
            "h-[40px] w-[40px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200",
            isInQueue ? "bg-indigo-600 border-indigo-600" : "bg-white"
          )}
        >
          {!isInQueue ? (
            <CgPlayListAdd
              size={20}
              className="relative top-[1px] left-[2px]"
            />
          ) : (
            <CgPlayListCheck
              size={25}
              className="relative top-[1px] left-[2px]"
              color="white"
            />
          )}
        </div>
      </div>
    </div>
  );
}
