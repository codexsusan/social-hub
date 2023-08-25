
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
  onValueChange: (value: string) => void;
};

function CustomSelect(props: Props) {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger className="w-full bg-black">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-black">
        {props.options.map((option: string) => {
          return <SelectItem key={option} value={option}>{option}</SelectItem>;
        })}
      </SelectContent>
    </Select>
  );
}

export default CustomSelect;
