// import { Loader } from "lucide-react";
import { Card, CardContent } from "../ui/card";
// import { useAppSelector } from "@/app/hooks";
// import PostCard from "../post/PostCard";

function CommunityHomeTab() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full flex gap-2 text-white">
      <Card className="bg-[#27272A]">
        <CardContent className="space-y-4 p-4 text-white">
          {/* <View /> */}
          Hello
        </CardContent>
      </Card>
    </div>
  );
}

// function View() {
//   const latest = useAppSelector((state) => state.home.latest);
//   return latest.loading ? (
//     <div className="flex justify-center">
//       <Loader className=" animate-spin my-4" />
//     </div>
//   ) : (
//     latest.posts.map((post) => {
//       return <PostCard type="latest" key={post._id} post={post} />;
//     })
//   );
// }

export default CommunityHomeTab;
