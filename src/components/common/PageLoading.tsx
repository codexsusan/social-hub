import { Loader } from "lucide-react";

function PageLoading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader color="white" className="h-16 w-16 animate-spin" />
    </div>
  );
}

export default PageLoading;
