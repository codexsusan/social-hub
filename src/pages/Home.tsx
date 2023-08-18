import CreatePost from "@/components/home/CreatePost";
import PostUserData from "@/components/post/PostUserData";

function Home() {
  return (
    <div className="w-full flex flex-col flex-1 items-center pt-4 bg-[#030303] gap-y-2">
      <CreatePost />
      <div className="w-2/5 p-2 border rounded-sm border-slate-600 flex gap-2">
        <PostUserData />
      </div>
    </div>
  );
}

export default Home;
