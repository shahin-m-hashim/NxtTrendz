import { useRef } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const searchProductInputRef = useRef();
  const productSearchDebounceTimerRef = useRef();

  useEffect(() => {
    return () => clearTimeout(productSearchDebounceTimerRef.current);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        searchProductInputRef,
        productSearchDebounceTimerRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
