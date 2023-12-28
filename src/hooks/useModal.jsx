import { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal((modal) => !modal);
  }

  return {
    modal,
    toggleModal,
  };
};
