import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { changeContent } from "@/features/submit/submitSlice";
import { Editor } from "@tinymce/tinymce-react";

export default function EditorView(props: { height?: number }) {
  const content = useAppSelector((state) => state.submit.post.content!);
  const dispatch = useAppDispatch();

  const handleEditorChange = (content: any, editor: any) => {
    // console.log("Content was updated:", content, editor);
    dispatch(changeContent(content));
  };
  return (
    <div>
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        value={content}
        init={{
          skin: "oxide-dark",
          icons: "thin",
          placeholder: "Ask a question or post an update...",
          resize: false,
          height: props.height || 300,
          menubar: true,
          content_css: "dark",
          plugins:
            "powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage permanentpen charmap linkchecker emoticons advtable autosave",
          toolbar:
            "undo redo spellcheckdialog | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
          textcolor_rows: "4",
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
}
