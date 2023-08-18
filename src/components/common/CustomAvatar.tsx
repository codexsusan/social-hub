import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CustomAvatar(props: {
  src?: string;
  alt?: string;
  fallBack?: React.ReactNode;
}) {
  return (
    <Avatar>
      <AvatarImage
        src={props.src ? props.src : "https://github.com/shadcn.png"}
        alt={props.alt ? props.alt : ""}
      />
      <AvatarFallback>{props.fallBack}</AvatarFallback>
    </Avatar>
  );
}
