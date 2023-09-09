import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeContent } from "@/features/submit/submitSlice";
import { Editor } from "@tinymce/tinymce-react";
import { Loader } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

type EditorSrcType = "post" | "comment";

export default function EditorView(props: {
  height?: number;
  className?: string;
  src: EditorSrcType;
}) {
  const { height, className, src } = props;
  const content = useAppSelector((state) => state.submit.post.content!);
  const editorRef = React.useRef<Editor | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleEditorChange = (contentValue: string) => {
    dispatch(changeContent(contentValue));
  };

  // const commentEditorPlugins = "";

  const commentEditorToolbar =
    "bold italic underline | link image  codesample | alignleft aligncenter alignright alignjustify lineheight";

  const postEditorToolbar =
    "bold italic underline | link image table codesample | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist ";

  const toolbar = src === "comment" ? commentEditorToolbar : postEditorToolbar;
  return (
    <div className={cn("flex justify-center items-center w-full", className)}>
      {loading ? <Loader className="animate-spin self-center" /> : null}
      <div className={`${loading ? "hidden" : "block"} w-full`}>
        <Editor
          ref={editorRef}
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
          value={content}
          onPostRender={() => {
            setLoading(false);
          }}
          init={{
            skin: "oxide-dark",
            icons: "thin",
            placeholder: "Ask a question or post an update...",
            height: height || 300,
            menubar: false,
            resize: false,
            content_css: "dark",
            width: "100%",
            plugins:
              "powerpaste autolink advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage permanentpen charmap linkchecker emoticons autosave",
            toolbar,
            textcolor_rows: "4",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
