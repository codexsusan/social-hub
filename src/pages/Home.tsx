import CreatePost from "@/components/home/CreatePost";
import Post from "@/components/post/PostCard";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchUserData } from "@/features/user/userSlice";
import PageLoading from "@/components/common/PageLoading";
import useTokenVerify from "@/hooks/useTokenVerify";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useTokenVerify();

  useEffect(() => {
    dispatch(fetchUserData()).then((res) => {
      if (res.type === "user/fetch/rejected") {
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    });
  }, []);

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
