"use client";
import { Block } from "@blocknote/core";
import { useEffect, useState } from "react";
import Queue from "./queue";
import TextEditor from "@/components/text-editor";

export default function BrowseContent({ articles }: { articles: Article[] }) {
  const [initialContent, setInitialContent] = useState<Block[] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(articles[0]);

  useEffect(() => {
    if (selectedArticle) {
      setInitialContent(null);
      setTimeout(() => {
        setInitialContent(selectedArticle.blocks);
      }, 50);
      console.log({ blocks: selectedArticle.blocks });
    }
  }, [selectedArticle]);

  return (
    <div className="w-screen h-full flex">
      <div className="min-w-[500px] max-w-[500px] h-full p-4 pr-0 overflow-y-auto">
        <h4 className="font-semibold">Queued Items:</h4>
        <Queue
          articles={articles}
          onSelect={setSelectedArticle}
          selectedId={selectedArticle?._id ?? ""}
        />
      </div>
      <div className="overflow-y-auto grow px-2 flex flex-col gap-1">
        {initialContent && (
          <TextEditor initialContent={initialContent} canSubmit={false} />
        )}
      </div>
    </div>
  );
}
