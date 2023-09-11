import AuthNavbar from "@/components/common/AuthNavbar";
import { authMethod } from "@/types/generalTypes";

function AuthContainer(props: {
  children: React.ReactNode;
  authMethod: authMethod;
}) {
  return (
    <div className="h-screen flex flex-col">
      <AuthNavbar authMethod={props.authMethod} />
      {props.children}
    </div>
  );
}

export default AuthContainer;
