import { Gender } from "@/types/userTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  options: string[];
  placeholder: string;
  value?: string;
  onValueChange: (value: Gender) => void;
};

function CustomSelect(props: Props) {
  return (
    <Select value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger className="w-full bg-[#09090B]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-black">
        {props.options.map((option: string) => {
          return (
            <SelectItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
