import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

type authMethod = "login" | "signup";

function Auth(props: { authMethod: authMethod }) {
  switch (props.authMethod) {
    case "login":
      return <Login />;
    case "signup":
      return <Register />;
  }
}

export default Auth;
