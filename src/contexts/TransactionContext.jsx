import { createContext } from "react";
import useTransaction from "../hooks/useTransaction";

export const TransactionContext = createContext();

export function TransactionContextProvider({ children }) {
  // const [transactions, setTransactions] = useState([]);

  // const amounts = transactions.map((transaction) => transaction.amount);

  // const incomes = amounts
  //   .filter((amount) => amount > 0)
  //   .reduce((a, b) => a + b, 0);

  // const expenses = amounts
  //   .filter((amount) => amount < 0)
  //   .reduce((a, b) => a + b, 0);

  // const addTransaction = (transaction) => {
  //   setTransactions((currentState) => {
  //     const update = [...currentState, transaction];
  //     return update;
  //   });
  // };

  // const balance = {
  //   transactions,
  //   incomes,
  //   expenses,
  //   addTransaction,
  // };

  const balance = useTransaction();

  return (
    <TransactionContext.Provider value={balance}>
      {children}
    </TransactionContext.Provider>
  );
}
