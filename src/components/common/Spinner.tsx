import { Loader } from "lucide-react";

function Spinner() {
  return (
    <div className="flex justify-center">
      <Loader className=" animate-spin my-4" />
    </div>
  );
}

export default Spinner;
