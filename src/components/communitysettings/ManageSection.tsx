import { Suspense, lazy } from "react";
const AddModeratorDialog = lazy(() => import("./AddModeratorDialog"));
const GuidelineDialog = lazy(() => import("./GuidelineDialog"));

function ManageSection() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Add Moderator</h3>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AddModeratorDialog />
        </Suspense>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3>Guidelines</h3>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <GuidelineDialog />
        </Suspense>
      </div>
    </div>
  );
}

export default ManageSection;
