import { lazy, Suspense } from "react";
import PublicLayout from "components/layouts/PublicLayout";

const LoginPage = lazy(() => import("pages/public/LoginPage"));
const RegisterPage = lazy(() => import("pages/public/RegisterPage"));

const publicRoutes = [
  {
    path: "auth",
    element: <PublicLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default publicRoutes;
