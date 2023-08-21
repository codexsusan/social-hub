import { MouseEvent } from "react";
import Icon from "./Icon";

type Props = {
  name: string;
  onClick?: () => void;
};

function IconButton(props: Props) {
  return (
    <>
      <button
        className={`bg-[#171717] p-2 rounded-lg `}
        onClick={(event: MouseEvent) => {
          event.preventDefault();
          props.onClick!();
        }}
      >
        <Icon name={props.name} />
      </button>
    </>
  );
}

export default IconButton;
