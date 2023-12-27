import { createContext, useState } from "react";
import useTransaction from "../hooks/useTransaction";

export const TransactionContext = createContext();

export function TransactionContextProvider({ children }) {
  const { transactions } = useTransaction();
  const [modal, setModal] = useState(false);

  return (
    <TransactionContext.Provider value={transactions}>
      {children}
    </TransactionContext.Provider>
  );
}
