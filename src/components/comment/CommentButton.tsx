import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export type CommentButtonProps = {
  loading: boolean;
  handleCommentSubmit: () => void;
};

function CommentButton(props: CommentButtonProps) {
  const { loading, handleCommentSubmit } = props;
  return (
    <>
      {loading ? (
        <Button className="mt-2 self-end" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button className="mt-2 self-end" onClick={handleCommentSubmit}>
          Comment
        </Button>
      )}
    </>
  );
}

export default CommentButton;
