import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  src?: string;
  alt?: string;
  fallBack?: React.ReactNode;
};

export function CustomAvatar(props: Props) {
  return (
    <Avatar>
      <AvatarImage
        src={
          props.src && props.src.length
            ? props.src
            : "https://res.cloudinary.com/dgxbzasei/image/upload/v1691064812/download_xfqes8.jpg"
        }
        alt={props.alt ? props.alt : ""}
      />
      <AvatarFallback>{props.fallBack}</AvatarFallback>
    </Avatar>
  );
}
