"use client"
import { Block } from "@blocknote/core";
import TextEditor from "@/components/text-editor";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import API from "../../../api";

const Queue = dynamic(() => import("./queue"), { ssr: false });
export default function BrowsePage() {
  const [initialContent, setInitialContent] = useState<Block[]|null>(null);
  const [ articles, setArticles ] = useState<Article[]>([]);

  const fetchArticles = async () => {
    API.article.getAllArticles().then(({ data, error }) => {
      if(data)setArticles(data);
      if(error)console.log(error);
    });
  }
  const fetchData = async (id:string) => {
    const { data, error } = await API.article.getArticle(id);
    console.log({ data, error });
    if(data)setInitialContent(data.blocks);
    if (error) console.log(error);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (articles.length > 0) fetchData(String(articles[1]._id));
  }, [articles]);

  

  return (
    <div className="w-screen h-full flex">
      <div className="min-w-[500px] max-w-[500px] h-full p-4 pr-0 overflow-y-auto">
        <h4 className="font-semibold">Queued Items:</h4>
        <Queue articles={articles} />
      </div>
      <div className="overflow-y-auto grow px-2 flex flex-col gap-1">
        {initialContent && <TextEditor initialContent={initialContent} />}
      </div>
    </div>
  );
}
