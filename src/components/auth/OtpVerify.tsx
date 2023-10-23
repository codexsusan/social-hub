import { FormEventHandler, useState } from "react";
import { InputWithLabel } from "../common/InputWithLabel";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { verifyOtpUtils } from "@/utils/userUtils";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

function OtpVerify() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");

  const handleVerification: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    verifyOtpUtils(otp).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        navigate("/home");
        toast({
          title: res.data.message,
          className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
          duration: 1000,
        });
      } else {
        toast({
          title: res.data.message,
          className: "bg-[#09090B] text-[#e2e2e2] border-[#e2e2e2]/20",
          duration: 1000,
        });
      }
    });
  };
  return (
    <div className="w-full flex flex-col flex-1 items-center justify-center p-4 gap-y-2 overflow-auto bg-[#030303]">
      <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-full p-2 rounded-sm flex flex-col gap-2">
        <div className="w-full text-center">
          <div>
            <div className="text-2xl text-slate-200 font-semibold mb-2">
              OTP Verification
            </div>
            <div className="text-slate-200">
              We have sent OTP to your mobile number
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <form
            onSubmit={handleVerification}
            className="w-full flex flex-col gap-4"
          >
            <InputWithLabel
              value={otp}
              inputClassName="bg-[#09090B] text-white"
              onValueChange={(value: string) => {
                setOtp(value);
              }}
              id="user-otp"
              label="OTP"
              placeholder="Enter your otp"
              type="text"
            />
            {loading ? (
              <Button className="mt-2" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="mt-2">
                Verify
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpVerify;
