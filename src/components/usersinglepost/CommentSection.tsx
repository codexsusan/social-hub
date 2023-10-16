import { cn } from "@/lib/utils";
import { CustomAvatar } from "../common/CustomAvatar";

function CommentSection() {
  return (
    <div className="flex flex-col gap-2">
      <CommentCard />
    </div>
  );
}

function CommentCard() {
  const handleRedirectToAuthorProfile = () => {};
  return (
    <div className={cn("flex gap-x-3")}>
      <div onClick={handleRedirectToAuthorProfile}>
        <CustomAvatar />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-70 text-base font-semibold"
            >
              {"displayName"}
            </p>
            <p
              onClick={handleRedirectToAuthorProfile}
              className="text-white opacity-60 text-base"
            >
              @{"username"}
            </p>
          </div>
        </div>
        <div>Hello</div>
        <div className="w-full">{/* Comment Actions */}</div>
      </div>
    </div>
  );
}

export default CommentSection;
