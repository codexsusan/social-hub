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
        src={props.src ? props.src : "https://github.com/shadcn.png"}
        alt={props.alt ? props.alt : ""}
      />
      <AvatarFallback>{props.fallBack}</AvatarFallback>
    </Avatar>
  );
}
