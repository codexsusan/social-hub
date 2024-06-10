// import React from "react";
import "../../styles/FileUploadButton.css";
import { cn } from "@/lib/utils";

function FileUploadButton(props: { className?: string }) {
  return (
    <div className={cn("upload-btn-wrapper", props.className)}>
      <button className="btn text-white">Upload a file</button>
      <input type="file" name="myfile" />
    </div>
  );
}

export default FileUploadButton;
