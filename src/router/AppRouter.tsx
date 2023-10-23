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
import SubmitPage from "@/pages/SubmitPage";
import Test from "@/pages/Test";
import UserProfile from "@/pages/UserProfile";
import { UserSettings } from "@/pages/UserSettings";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "../pages/Auth";
import UserSinglePost from "@/pages/UserSinglePost";
import CommunitySinglePost from "@/pages/CommunitySinglePost";

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
    path: "/auth/otp/verify",
    element: (
      <AuthContainer authMethod="otp-verify">
        <Auth authMethod="otp-verify" />
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
  // Community post single page
  {
    path: "/c/:communityId/post/:postId",
    element: (
      <AppContainer>
        <CommunitySinglePost />
      </AppContainer>
    ),
  },
  {
    path: "/u/:userId/post/:postId/",
    element: (
      <AppContainer>
        <UserSinglePost />
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
