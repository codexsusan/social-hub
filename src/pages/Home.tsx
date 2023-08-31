import CreatePost from "@/components/home/CreatePost";
import Post from "@/components/post/PostCard";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useAppSelector } from "@/app/hooks";
import PageLoading from "@/components/common/PageLoading";

function Home() {

  useDocumentTitle("Home | Social Hub");

  const user = useAppSelector((state) => state.user);

  const view = user.loading ? <PageLoading /> : <View />;

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto">
      {view}
    </div>
  );
}

function View() {
  return (
    <>
      <CreatePost />
      <Post />
    </>
  );
}

export default Home;
