import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import AuthContainer from "@/hoc/AuthContainer";
import Home from "@/pages/Home";
import AppContainer from "@/hoc/AppContainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer >
      <Home />
    </AppContainer>,
  },
  {
    path: "/auth/login",
    element: (
      <AuthContainer authMethod="login">
        <Auth authMethod="login" />
      </AuthContainer>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <AuthContainer authMethod="signup">
        <Auth authMethod="signup" />
      </AuthContainer>
    ),
  },
  {
    path: "/*",
    element: <>404 page</>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
