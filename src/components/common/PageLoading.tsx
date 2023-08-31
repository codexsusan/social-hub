import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

function PageLoading(props: { className?: string }) {
  return (
    <div
      className={cn("flex flex-1 items-center justify-center", props.className)}
    >
      <Loader color="white" className="h-16 w-16 animate-spin" />
    </div>
  );
}

export default PageLoading;
