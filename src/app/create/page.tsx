import TextEditor from "@/components/text-editor";
import dynamic from "next/dynamic";
// import Queue from "./queue";

const Queue = dynamic(() => import("./queue"), { ssr: false });
export default function Create() {

  return (
    <div className="w-screen h-full flex">
      <div className="min-w-[500px] max-w-[500px] h-full p-4 pr-0 overflow-y-auto">
        <h4 className="font-semibold">Queued Items:</h4>
        <Queue />
      </div>
      <div className="overflow-y-auto grow px-2 flex flex-col gap-1">
        <TextEditor />  
      </div>
    </div>
  );
}
