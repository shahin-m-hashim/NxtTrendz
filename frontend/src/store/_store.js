import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import createAuthSlice from "store/authSlice";
import createFormsSlice from "store/formsSlice";

const useStore = create(
  devtools(
    immer((set, get) => ({
      ...createAuthSlice(set, get),
      ...createFormsSlice(set, get),
    })),
    {
      name: "store",
      enabled: import.meta.env.VITE_ENVIRONMENT === "development",
    }
  )
);

export default useStore;
