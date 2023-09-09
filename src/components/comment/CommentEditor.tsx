import React from "react";
import AddCommentWrapper from "./AddCommentWrapper";
import EditorView from "../submit/EditorView";

function CommentEditor() {
  return (
    <AddCommentWrapper type="comment">
      <EditorView src="comment" className="mt-2" height={200} />
    </AddCommentWrapper>
  );
}

export default CommentEditor;
