import React from "react";
import { cn } from "@/lib/utils";

function DefaultProfile(props: { className?: string }) {
  return (
    <>
      <img
        className={cn("", props.className)}
        src="https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
      />
    </>
  );
}

export default DefaultProfile;
