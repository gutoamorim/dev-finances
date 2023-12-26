import { createContext } from "react";
import useTransaction from "../hooks/useTransaction";

export const TransactionContext = createContext();

export function TransactionContextProvider({ children }) {
  const { transactions } = useTransaction();

  return (
    <TransactionContext.Provider value={transactions}>
      {children}
    </TransactionContext.Provider>
  );
}
