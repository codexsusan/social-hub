// import React from "react";
import "../../styles/FileUploadButton.css";

function FileUploadButton() {
  return (
    <div className="upload-btn-wrapper">
      <button className="btn text-white">Upload a file</button>
      <input type="file" name="myfile" />
    </div>
  );
}

export default FileUploadButton;
