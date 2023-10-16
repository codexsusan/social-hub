import { Loader } from "lucide-react";
import { Suspense, lazy } from "react";
const AddModeratorDialog = lazy(() => import("./AddModeratorDialog"));
const GuidelineDialog = lazy(() => import("./GuidelineDialog"));
const MemberRequestDialog = lazy(() => import("./MemberRequestDialog"));

function ManageSection() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Add Moderator</h3>
        </div>
        <Suspense fallback={<SuspenseLoader />}>
          <AddModeratorDialog />
        </Suspense>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Guidelines</h3>
        </div>
        <Suspense fallback={null}>
          <GuidelineDialog />
        </Suspense>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Member Request</h3>
        </div>
        <Suspense fallback={null}>
          <MemberRequestDialog />
        </Suspense>
      </div>
    </div>
  );
}

function SuspenseLoader() {
  return (
    <div className="w-full flex justify-center items-center">
      <Loader className="w-5 h-5 animate-spin" />
    </div>
  );
}

export default ManageSection;
