import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeContent } from "@/features/submit/submitSlice";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";

export default function EditorView(props: { height?: number }) {
  const content = useAppSelector((state) => state.submit.post.content!);
  const editorRef = React.useRef<Editor | null>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleEditorChange = (contentValue: string) => {
    dispatch(changeContent(contentValue));
  };

  return (
    <div className="flex justify-center items-center">
      {loading ? <>Loading...</> : null}
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
            height: props.height || 300,
            menubar: false,
            resize: true,
            content_css: "dark",
            plugins:
              "powerpaste casechange autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage permanentpen charmap linkchecker emoticons autosave",
            toolbar:
              "bold italic underline | link image table codesample | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist ",
            textcolor_rows: "4",
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
