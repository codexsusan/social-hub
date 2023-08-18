import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel(props: {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
  value?: string;
}) {
  return (
    <div className="grid w-full items-center gap-y-2.5">
      <Label className="text-slate-200" htmlFor="email">
        {props.label}
      </Label>
      <Input
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
