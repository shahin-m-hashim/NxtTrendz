import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createAuthSlice from "store/authSlice";
import createCartSlice from "store/cartSlice";
import createProductSlice from "store/productSlice";
import createProductsSlice from "store/productsSlice";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT || "production";

const useStore = create(
  devtools(
    immer((set, get) => ({
      ...createAuthSlice(set, get),
      ...createCartSlice(set, get),
      ...createProductSlice(set, get),
      ...createProductsSlice(set, get),
    })),
    {
      name: "store",
      enabled: ENVIRONMENT === "development",
    }
  )
);

export default useStore;
