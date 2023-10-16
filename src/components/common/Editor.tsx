import type EditorJS from "@editorjs/editorjs";
import { OutputData } from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";

function Editor(props: {
  changeContentCB: (content: string) => void;
  placeholder?: string;
  value?: OutputData;
}) {
  const { placeholder, changeContentCB } = props;
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const ImageTool = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
          if (props.value) {
            editor.render(props.value!);
          }
        },
        async onChange() {
          const blocks = await ref.current?.save();
          const stringJSON = JSON.stringify(blocks);
          changeContentCB(stringJSON);
        },
        placeholder: placeholder || "Start writing something...",
        inlineToolbar: true,
        data: {
          blocks: [],
        },
        tools: {
          header: Header,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                // TODO: Change this to some abstraction layer
                async uploadByFile(file: File) {
                  const baseUrl =
                    "https://sea-turtle-app-bk4cx.ondigitalocean.app";
                  const endpoint = "/api/uploads/single-file-upload";
                  const url = `${baseUrl}${endpoint}`;
                  // Token Authentication
                  const token = localStorage.getItem("token");

                  const formData = new FormData();
                  formData.append("upload", file);

                  const response = await fetch(url, {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                  });
                  const res = await response.json();
                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  };
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
        defaultBlock: "paragraph",
      });
    }
  }, [changeContentCB, placeholder]);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        // Set focus to title
      });
    };
    if (isMounted) {
      init();
      return () => {};
    }
  }, [isMounted, initializeEditor]);

  return (
    <div className="w-full bg-zinc-50 rounded-lg border border-zinc-200">
      <div className="prose prose-stone dark:prose-invert">
        <div
          id="editor"
          className="flex flex-col text-start text-black px-5 w-full h-[10rem] overflow-auto"
        />
      </div>
    </div>
  );
}

export default Editor;
