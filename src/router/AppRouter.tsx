import AppContainer from "@/hoc/AppContainer";
import AuthContainer from "@/hoc/AuthContainer";
import AddCommunity from "@/pages/AddCommunity";
import AuthorProfile from "@/pages/AuthorProfile";
import CommunityHome from "@/pages/CommunityHome";
import CommunitySettings from "@/pages/CommunitySettings";
import CommunityUsers from "@/pages/CommunityUsers";
import ExploreCommunity from "@/pages/ExploreCommunity";
import Home from "@/pages/Home";
import ListCommunity from "@/pages/ListCommunity";
import RootPage from "@/pages/RootPage";
import SinglePost from "@/pages/SinglePost";
import SubmitPage from "@/pages/SubmitPage";
import Test from "@/pages/Test";
import UserProfile from "@/pages/UserProfile";
import { UserSettings } from "@/pages/UserSettings";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/home",
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
        <SubmitPage />
      </AppContainer>
    ),
  },
  {
    path: "/submitpage",
    element: (
      <AppContainer>
        <SubmitPage />
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
    path: "/c/:communityId/members",
    element: (
      <AppContainer>
        <CommunityUsers />
      </AppContainer>
    ),
  },
  {
    path: "/c/:communityId/settings",
    element: (
      <AppContainer>
        <CommunitySettings />
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
        <Test childrenB={<></>} />
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
