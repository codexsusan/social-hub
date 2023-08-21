import { CustomAvatar } from "../common/CustomAvatar";

function PostUserData() {
  return (
    <div className="flex gap-x-3 items-center">
      <div
        className=" cursor-pointer"
        onClick={() => {
          console.log("Redirect to user profile");
        }}
      >
        <CustomAvatar />
      </div>
      <div>
        <p
          onClick={() => {
            console.log("Redirect to community profile");
          }}
          className="text-white opacity-70 text-base cursor-pointer"
        >
          c/communityx
        </p>
        <p
          onClick={() => {
            console.log("Redirect to user profile");
          }}
          className="text-white opacity-60 text-xs cursor-pointer"
        >
          u/codexsusan
        </p>
      </div>
    </div>
  );
}

export default PostUserData;
