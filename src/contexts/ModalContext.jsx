import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal((modal) => !modal);
  }

  const dialog = {
    modal,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={{ modal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
}
