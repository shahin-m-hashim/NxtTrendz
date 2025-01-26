import { useRef } from "react";
import { useEffect } from "react";
import { createContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const checkoutModalRef = useRef();
  const searchProductInputRef = useRef();
  const productSearchDebounceTimerRef = useRef();

  const setShowCheckoutModal = (show) => {
    if (show) {
      checkoutModalRef.current.classList.remove("hidden");
    } else {
      checkoutModalRef.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    return () => clearTimeout(productSearchDebounceTimerRef.current);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        checkoutModalRef,
        setShowCheckoutModal,
        searchProductInputRef,
        productSearchDebounceTimerRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
