import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import {
  fetchTrendingPosts,
  incrementTrendingPage,
} from "@/features/home/homeSlice";
import Spinner from "../common/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function TrendingHome() {
  const dispatch = useAppDispatch();
  // const trending = useAppSelector((state) => state.home.trending);

  useEffect(() => {
    dispatch(fetchTrendingPosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <View />
      </CardContent>
    </Card>
  );
}

function View() {
  const trending = useAppSelector((state) => state.home.trending);
  // const dispatch = useAppDispatch();
  console.log(trending.totalPage !== trending.page);
  return trending.loading ? (
    <Spinner />
  ) : (
    <>
      <InfiniteScroll
        dataLength={100}
        next={() => {
          console.log("next");
          // dispatch(incrementTrendingPage());
        }}
        hasMore={trending.totalPage !== trending.page}
        loader={<h4 className="text-white">Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {trending.posts &&
          trending.posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
      </InfiniteScroll>
    </>
  );
}

export default TrendingHome;
