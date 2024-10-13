"use client"
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
export default function TextEditor(){
    const editor = useCreateBlockNote();
    const exportToHtml = async() => {
        const HTMLFromBlocks = await editor.blocksToHTMLLossy();
        const fullHTMLFromBlocks = await editor.blocksToFullHTML(editor.document);
        console.log(HTMLFromBlocks);
        console.log({ fullHTMLFromBlocks });
        console.log(editor.document);
    }
    return (
      <div className="flex grow flex-col h-auto border p-2 mr-2">
        <div className="grow h-auto rounded-sm">
          <BlockNoteView emojiPicker editor={editor} theme={"light"} />
        </div>
        <div
          onClick={exportToHtml}
          className={
            "mx-auto h-[40px] w-[140px] flex items-center justify-center border rounded-md cursor-pointer hover:border-indigo-600 transition-colors duration-200"
          }
        >
          SAVE
        </div>
      </div>
    );

};