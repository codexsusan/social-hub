import CreatePost from "@/components/home/CreatePost";
import Post from "@/components/post/Post";

function Home() {
  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto">
      <CreatePost />
      <Post />
    </div>
  );
}

export default Home;
