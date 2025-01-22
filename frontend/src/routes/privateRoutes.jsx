import { Suspense, lazy } from "react";
import PrivateLayout from "components/layouts/PrivateLayout";

const HomePage = lazy(() => import("pages/private/HomePage"));

const privateRoutes = [
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
];

export default privateRoutes;
