import HomeTab from "@/components/home/HomeTab";
import AppContainer from "@/hoc/AppContainer";
import AuthContainer from "@/hoc/AuthContainer";
import AddCommunity from "@/pages/AddCommunity";
import AuthorProfile from "@/pages/AuthorProfile";
import CommunityHome from "@/pages/CommunityHome";
import ExploreCommunity from "@/pages/ExploreCommunity";
import ListCommunity from "@/pages/ListCommunity";
import SinglePost from "@/pages/SinglePost";
import Submit from "@/pages/Submit";
import Test from "@/pages/Test";
import UserProfile from "@/pages/UserProfile";
import { UserSettings } from "@/pages/UserSettings";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppContainer>
        <HomeTab />
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
    path: "/test",
    element: (
      <AppContainer>
        <Test />
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
