import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage.tsx";
import SignInPage from "../pages/auth/SignInPage.tsx";
import SignUpPage from "../pages/auth/SignUpPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import RootLayout from "../components/RootLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          // Public routes
          {
            path: "/",
            element: <LandingPage />,
          },
          {
            path: "/auth/sign-in",
            element: <SignInPage />,
          },
          {
            path: "/auth/sign-up",
            element: <SignUpPage />,
          },
          // Auth Protected routes
          {
            path: "/",
            element: <AuthProtectedRoute />,
            children: [
              {
                path: "/home",
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
