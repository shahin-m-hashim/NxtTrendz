import { lazy } from "react";

const PublicLayout = lazy(() => import("components/wrappers/PublicLayout"));

const LoginPage = lazy(() => import("pages/public/LoginPage"));
const RegisterPage = lazy(() => import("pages/public/RegisterPage"));

const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
];

export default publicRoutes;
