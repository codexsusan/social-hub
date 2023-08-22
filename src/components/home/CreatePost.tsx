import { CustomAvatar } from "../common/CustomAvatar";
import IconButton from "../common/IconButton";

function CreatePost() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 border rounded-sm border-slate-600 flex gap-2">
      <div
        className=" cursor-pointer"
        onClick={() => {
          console.log("User Profile");
        }}
      >
        <CustomAvatar />
      </div>
      <div
        onClick={() => {
          console.log("Route to create post");
        }}
        className="bg-[#171717] cursor-pointer flex flex-1 pl-2 text-gray-400 items-center py-2 rounded-sm"
      >
        Create Post
      </div>
      <IconButton
        name="image-plus"
        onClick={() => {
          console.log("Route to create post");
        }}
      />
    </div>
  );
}

export default CreatePost;
