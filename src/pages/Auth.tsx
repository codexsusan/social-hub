import Login from "@/components/auth/Login";
import OtpVerify from "@/components/auth/OtpVerify";
import Register from "@/components/auth/Register";
import { authMethod } from "@/types/generalTypes";

function Auth(props: { authMethod: authMethod }) {
  switch (props.authMethod) {
    case "login":
      return <Login />;
    case "signup":
      return <Register />;
    case "otp-verify":
      return <OtpVerify />;
  }
}

export default Auth;
