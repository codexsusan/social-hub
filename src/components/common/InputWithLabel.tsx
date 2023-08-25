import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
  value?: string;
  inputClassName: string;
};

export function InputWithLabel(props: Props) {
  return (
    <div className={cn("grid w-full items-center gap-y-2.5")}>
      <Label className="text-slate-200" htmlFor="email">
        {props.label}
      </Label>
      <Input
        className={cn("", props.inputClassName)}
        value={props.value!}
        onChange={(e) => {
          props.onValueChange!(e.target.value);
        }}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
      />
    </div>
  );
}
