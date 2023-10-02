import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import AuthContainer from "@/hoc/AuthContainer";
import Home from "@/pages/Home";
import AppContainer from "@/hoc/AppContainer";
import UserProfile from "@/pages/UserProfile";
import Submit from "@/pages/Submit";
import SinglePost from "@/pages/SinglePost";
import AuthorProfile from "@/pages/AuthorProfile";
import AddCommunity from "@/pages/AddCommunity";
import CommunityHome from "@/pages/CommunityHome";
import ListCommunity from "@/pages/ListCommunity";
import ExploreCommunity from "@/pages/ExploreCommunity";
import { UserSettings } from "@/pages/UserSettings";

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
    path: "/submit" || "/submit/?type=:type" || "/submit?comm=:comm",
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
    path: "/profile/:username/settings",
    element: (
      <AppContainer>
        <UserSettings />
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
    path: "/c/:communityId",
    element: (
      <AppContainer>
        <CommunityHome />
      </AppContainer>
    ),
  },
  {
    path: "/c/create",
    element: (
      <AppContainer>
        <AddCommunity />
      </AppContainer>
    ),
  },
  {
    path: "/c/lists",
    element: (
      <AppContainer>
        <ListCommunity />
      </AppContainer>
    ),
  },
  {
    path: "/explore",
    element: (
      <AppContainer>
        <ExploreCommunity />
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
