import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import React, { ChangeEvent } from "react";
import { Button } from "../ui/button";
import { uploadFile } from "@/utils/fileUtils";
import { ResponseData } from "@/utils/httpUtils";

function ProfileUploadButton(props: {
  className?: string;
  callBackFn: (value: string) => void;
  value: string;
}) {
  const [image, setImage] = React.useState<File | null>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSelectFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files![0];
    setImage(image);
    const formData = new FormData();
    formData.append("upload", image);
    uploadFile(formData).then((res: ResponseData) => {
      props.callBackFn(res.data.url);
    });
  };

  return (
    <>
      {image ? (
        <div className="flex flex-col items-center w-32 h-32 rounded-full mt-4 object-cover">
          <img
            className="rounded-full"
            src={URL.createObjectURL(image) || props.value}
          />
          <div className="absolute h-32 flex items-center">
            <Button onClick={handleSelectFile} className="opacity-40">
              Change
            </Button>
            <input
              type="file"
              onChange={handleImageChange}
              ref={inputRef}
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={handleSelectFile}
            className={cn(
              "flex flex-col gap-y-2 bg-[#09090B] p-16 rounded-full items-center cursor-pointer",
              props.className
            )}
          >
            <Camera />
            <div className="text-white text-base">Upload</div>
          </div>
          <input
            type="file"
            onChange={handleImageChange}
            ref={inputRef}
            className="hidden"
          />
        </>
      )}
    </>
  );
}

export default ProfileUploadButton;