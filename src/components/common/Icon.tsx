import { ImagePlus, User } from "lucide-react";
import React from "react";

type Props = {
  name: string;
};

export default function Icon(props: Props) {
  switch (props.name) {
    case "user":
      return <User className="text-white" />;
    case "image-plus":
      return <ImagePlus className="text-white" />;
    default:
      return <></>;
  }
}
