import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createFormsSlice from "store/formsSlice";
import { immer } from "zustand/middleware/immer";

const useStore = create(
  devtools(
    immer((set, get) => ({
      ...createFormsSlice(set, get),
    })),
    {
      name: "store",
      enabled: import.meta.env.VITE_ENVIRONMENT === "development",
    }
  )
);

export default useStore;
