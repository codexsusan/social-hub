import { useAppSelector } from "@/app/hooks";
import PageLoading from "@/components/common/PageLoading";
import CreatePost from "@/components/home/CreatePost";
import DuplicateHomeTab from "@/components/home/DuplicateHomeTab";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function Home() {
  useDocumentTitle("Home | Social Hub");

  return (
    <div className="w-full flex flex-col flex-1 items-center p-4 gap-y-2 overflow-auto ">
      <StatefulScreen />
    </div>
  );
}

function StatefulScreen() {
  const user = useAppSelector((state) => state.user);
  return user.loading ? <PageLoading /> : <View />;
}

function View() {
  return (
    <>
      <CreatePost />
      <DuplicateHomeTab />
    </>
  );
}

export default Home;
