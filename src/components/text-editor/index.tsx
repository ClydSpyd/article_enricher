"use client"
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useRef } from "react";
import { cn } from "@/lib/utilities";
export default function TextEditor({
  canSubmit,
  initialContent,
  saveCallback,
  postSubmistMsg,
  isError,
}: {
  canSubmit: boolean;
  initialContent?: Block[] | null;
  saveCallback?: (blocks: Block[], hmtl: string) => void;
  postSubmistMsg?: string|null;
  isError?: boolean;
}) {
  const editor = useCreateBlockNote(initialContent ? { initialContent } : {});
  const editorRef = useRef(editor);

  const handleSave = async () => {
    const HTMLFromBlocks = await editor.blocksToHTMLLossy();
    saveCallback?.(editor.document, HTMLFromBlocks);
  };

  return (
    <div
      onClick={() => editorRef.current?.focus()}
      className="flex grow flex-col h-auto border p-2"
    >
      <div className="grow h-auto rounded-sm">
        <BlockNoteView emojiPicker editor={editor} theme={"light"} />
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        {postSubmistMsg && (
          <p
            className={cn(
              "text-white h-fit px-2 rounded-lg text-base",
              isError ? "bg-red-600" : "bg-lime-500"
            )}
          >
            {postSubmistMsg}
          </p>
        )}
        <div
          onClick={handleSave}
          className={cn(
            "h-[40px] w-[140px] flex items-center justify-center border rounded-md cursor-pointer bg-gray-200 text-gray-500 hover:bg-indigo-600 hover:text-white transition-colors duration-200",
            canSubmit
              ? "opacity-100 pointer-events-auto"
              : "opacity-20 pointer-events-none"
          )}
        >
          SAVE
        </div>
      </div>
    </div>
  );
};

//     const fullHTMLFromBlocks = await editor.blocksToFullHTML(editor.document); 