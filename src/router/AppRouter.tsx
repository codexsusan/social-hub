import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import AuthContainer from "@/hoc/AuthContainer";
import Home from "@/pages/Home";
import AppContainer from "@/hoc/AppContainer";
import UserProfile from "@/pages/UserProfile";
import Submit from "@/pages/Submit";
import SinglePost from "@/pages/SinglePost";
import AuthorProfile from "@/pages/AuthorProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContainer>
        <Home />
      </AppContainer>
    ),
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
    path: "/submit" || "/submit/?type=:type",
    element: (
      <AppContainer>
        <Submit />
      </AppContainer>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <AppContainer>
        <UserProfile />
      </AppContainer>
    ),
  },
  {
    path: "/user/:username",
    element: (
      <AppContainer>
        <AuthorProfile />
      </AppContainer>
    ),
  },
  {
    path: "/c/:communityId/post/:postId",
    element: (
      <AppContainer>
        <SinglePost />
      </AppContainer>
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
