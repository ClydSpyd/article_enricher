"use client";
import { Block } from "@blocknote/core";
import TextEditor from "@/components/text-editor";
import { useQueue } from "@/contexts/queue-context";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import API from "../../../api";
import InputField from "@/components/input-field";
import { LocalFields, defaultValues } from "./types";
import { MdOutlineOpenInNew } from "react-icons/md";
import TagSelector from "@/components/tag-selector";
import { hasEmptyFields } from "./helpers";
import { useIsFirstRender } from "@/hooks/isFirstRender";

const Queue = dynamic(() => import("./queue"), { ssr: false });
export default function CreatePage() {
  const { queuedItems = [], removeItemFromQueue } = useQueue();
  const [submitData, setSubmitData] = useState<{
    msg: string | null;
    error: boolean;
  }>({ msg: null, error: false });
  const isFirstRender = useIsFirstRender()
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const [localFields, setLocalFields] = useState<LocalFields>(defaultValues);
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(
    queuedItems[0]
  );

  useEffect(() => {
    setLocalFields({
      title: selectedArticle?.name ?? "",
      caption: "",
      tags: [],
      sourceUrl: selectedArticle?.url ?? "",
      imgUrl: selectedArticle?.imgUrl ?? "",
    });
  }, [selectedArticle]);

  useEffect(() => {
    setFormFilled(!hasEmptyFields(localFields));
  }, [localFields]);

  const saveCallback = async (blocks: Block[], html: string) => {
    const payload: Article = {
      ...localFields,
      source: "web",
      content: html,
      blocks,
    };
    const { data, error } = await API.article.createArticle(payload);
    if (data) {
      setSubmitData({ msg: "article saved successfully", error: false });
      setSelectedArticle(null);
      setLocalFields(defaultValues);
      removeItemFromQueue(selectedArticle?.url ?? "");
      setTimeout(() => {
        setSelectedArticle(queuedItems[0]);
      }, 200);
    } else if (error) {
      setSubmitData({ msg: "failed to save article", error: true });
    }
  };

  const handleInputChange = (value: string, key: keyof typeof localFields) => {
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTags = (tags: string[]) => {
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      tags,
    }));
  };

  return (
    <div className="w-screen h-full flex">
      <div className="min-w-[500px] max-w-[500px] h-full p-4 pr-0 overflow-y-auto">
        <h4 className="font-semibold">Queued Items:</h4>
        <Queue
          items={queuedItems}
          onSelect={setSelectedArticle}
          selectedId={selectedArticle?.url ?? ""}
        />
      </div>
      <div className="overflow-y-auto grow pr-4 flex flex-col gap-1">
        <div className="w-full flex flex-col gap-2 mb-1">
          <InputField
            placeholder="Article Title"
            value={localFields.title}
            onChange={(val: string) => handleInputChange(val, "title")}
          />
          <InputField
            placeholder="Caption"
            value={localFields.caption}
            onChange={(val: string) => handleInputChange(val, "caption")}
          />
          <TagSelector
            tags={localFields.tags}
            setTags={(tags: string[]) => handleTags(tags)}
          />
          <div className="flex gap-2 items-center p-2 border rounded-sm">
            <p className="text-[#a0a0a0]">Source URL:</p>
            <p className="grow text-lime-500">{localFields.sourceUrl}</p>
            <a href={localFields.sourceUrl} target="_blank" rel="noreferrer">
              <div className="h-[40px] w-[40px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200">
                <MdOutlineOpenInNew size={18} />
              </div>
            </a>
          </div>
        </div>
        {selectedArticle && !isFirstRender && (
          <TextEditor
            saveCallback={saveCallback}
            postSubmistMsg={submitData.msg}
            isError={submitData.error}
            canSubmit={formFilled}
          />
        )}
      </div>
    </div>
  );
}
