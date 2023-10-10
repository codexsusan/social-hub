import { useCallback, useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";

function Editor(props: { changeCB: (value: string) => void }) {
  const { changeCB } = props;
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  // const [content, setContent] = useState("");

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
        },
        async onChange() {
          const blocks = await ref.current?.save();
          const stringJSON = JSON.stringify(blocks);
          changeCB(stringJSON);
        },
        placeholder: "Type here to write your post...",
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
                async uploadByFile(file: File) {
                  const baseUrl =
                    "https://sea-turtle-app-bk4cx.ondigitalocean.app";
                  const endpoint = "/api/uploads/single-file-upload";
                  const url = `${baseUrl}${endpoint}`;
                  // Token Authentication
                  const token =
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGVmMDg1MjU0YWE1Yjk2OWFhNmRkYTYiLCJpYXQiOjE2OTY4MzM0NDQsImV4cCI6MTcyODM2OTQ0NH0.EoU0vd_dij3wc2MhhbZiS4NrqGWa69gDK3WChCHTrdc";

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
  }, [changeCB]);

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
    <div className="w-full  bg-zinc-50 rounded-lg border border-zinc-200">
      <div className="prose prose-stone dark:prose-invert w-max-[50px]">
        <div id="editor" className="text-start text-black" />
      </div>
    </div>
  );
}

export default Editor;
