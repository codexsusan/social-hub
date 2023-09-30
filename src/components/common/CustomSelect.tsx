import { Gender } from "@/types/userTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CommunityMultiSelectData } from "@/types/communityTypes";

export type optionData = {
  id: string;
  name: string;
};

type Props = {
  options: string[];
  placeholder: string;
  value?: string;
  defaultValue?: string;
  onValueChange: (value: Gender) => void;
  optionData?: optionData[];
};

function CustomSelect(props: Props) {
  const { placeholder, value, defaultValue, onValueChange, optionData } = props;
  return (
    <Select
      defaultValue={defaultValue!}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-full bg-[#09090B]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-black">
        {optionData!.map((option: CommunityMultiSelectData) => {
          return (
            <SelectItem key={option.id} value={option.id}>
              {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
