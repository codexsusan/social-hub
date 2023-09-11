import AddCommentWrapper from "./AddCommentWrapper";
import EditorView from "../submit/EditorView";
import { CommentPartial } from "@/types/commentTypes";

function CommentEditor(props: { comment: CommentPartial }) {
  console.log(props.comment._id);
  return (
    <AddCommentWrapper type="comment">
      <EditorView src="comment" className="mt-2" height={200} />
    </AddCommentWrapper>
  );
}

export default CommentEditor;
