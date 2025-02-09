import { useRef } from "react";
import { createContext } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const checkoutModalRef = useRef();
  const searchProductInputRef = useRef();

  const setShowCheckoutModal = (show) => {
    if (show) {
      checkoutModalRef.current.classList.remove("hidden");
    } else {
      checkoutModalRef.current.classList.add("hidden");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        checkoutModalRef,
        setShowCheckoutModal,
        searchProductInputRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
