import { cn } from "@/lib/utils";

function ProfileImage(props: { className?: string; src?: string }) {
  const { src, className } = props;
  return (
    <>
      <img
        className={cn("", className)}
        src={
          src && src.length
            ? src
            : "https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
        }
      />
    </>
  );
}

export default ProfileImage;
