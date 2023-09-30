import { Skeleton } from "../ui/skeleton";

function CreatePostSkeleton() {
  return (
    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-3 rounded-2xl bg-[#27272a] flex gap-2 items-center text-white">
      <Skeleton className="w-10 h-10 rounded-full bg-black" />
      <Skeleton className=" h-10 flex-grow rounded-md bg-black" />
      <Skeleton className="w-10 h-10 rounded-md bg-black" />
    </div>
  );
}

export default CreatePostSkeleton;
