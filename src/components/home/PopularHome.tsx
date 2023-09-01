import { Card, CardContent } from "@/components/ui/card";
import PostCard from "../post/PostCard";

function PopularHome() {
  return (
    <Card className="bg-[#27272A]">
      <CardContent className="space-y-4 p-4 text-white">
        <PostCard />
      </CardContent>
    </Card>
  );
}

export default PopularHome;
