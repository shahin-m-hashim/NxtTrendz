import { Suspense, lazy } from "react";
import ErrorPage from "pages/ErrorPage";
import ProductPage from "pages/private/ProductPage";
import PrivateLayout from "components/layouts/PrivateLayout";

const HomePage = lazy(() => import("pages/private/HomePage"));

const ProductsPage = lazy(() => import("pages/private/ProductsPage"));

const privateRoutes = [
  {
    path: "/",
    element: <PrivateLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
    ],
  },
];

export default privateRoutes;
