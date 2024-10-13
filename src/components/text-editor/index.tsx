"use client"
import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
export default function TextEditor({
  initialContent,
  saveCallback,
}: {
  initialContent?: Block[] | null;
  saveCallback?: (blocks: Block[], hmtl: string) => void;
}) {
  const editor = useCreateBlockNote(initialContent ? { initialContent } : {});

  const handleSave = async () => {
    const HTMLFromBlocks = await editor.blocksToHTMLLossy();
    saveCallback?.(editor.document, HTMLFromBlocks);
  };

  return (
    <div className="flex grow flex-col h-auto border p-2">
      <div className="grow h-auto rounded-sm">
        <BlockNoteView emojiPicker editor={editor} theme={"light"} />
      </div>
      <div
        onClick={handleSave}
        className={
          "mx-auto h-[40px] w-[140px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200"
        }
      >
        SAVE
      </div>
    </div>
  );
};

//     const fullHTMLFromBlocks = await editor.blocksToFullHTML(editor.document); 