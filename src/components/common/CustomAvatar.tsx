import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  alt?: string;
  fallBack?: React.ReactNode;
  className?: string;
};

export function CustomAvatar(props: Props) {
  const { src, alt, fallBack, className } = props;
  return (
    <Avatar className={cn("", className)}>
      <AvatarImage
        src={
          src && src.length
            ? src
            : "https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
        }
        alt={alt ? alt : ""}
      />
      <AvatarFallback className="bg-slate-500 text-xl font-semibold text-center">{fallBack}</AvatarFallback>
    </Avatar>
  );
}
