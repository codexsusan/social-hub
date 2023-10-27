import { CommunityMultiSelectData } from "@/types/communityTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type optionData = {
  id: string;
  name: string;
};

type Props = {
  placeholder: string;
  value?: string;
  defaultValue?: string;
  onValueChange: (value: string ) => void;
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
      <SelectTrigger className="w-full text-black border border-gray-500/30">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="">
        {optionData!.map((option: CommunityMultiSelectData) => {
          return (
            <SelectItem className="text-black text-base font-inter" key={option.id} value={option.id}>
              {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
