import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useStore = create(devtools(immer((set, get) => ({}))));

export default useStore;
