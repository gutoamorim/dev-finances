import { createContext, useState } from "react";
import useTransaction from "../hooks/useTransaction";

const teste = [
  {
    type: "despeza",
    description: "Luz",
    amount: -150,
    date: "25/12/2023",
  },
  {
    type: "despeza",
    description: "Agua",
    amount: -50,
    date: "25/12/2023",
  },
  {
    type: "receita",
    description: "Web Site",
    amount: 3000,
    date: "25/12/2023",
  },
];

export const TransactionContext = createContext();

export function TransactionContextProvider({ children }) {
  const [transactions, setTransactions] = useState(teste);

  const amounts = transactions.map((transaction) => transaction.amount);
  const incomes = amounts
    .filter((amount) => amount > 0)
    .reduce((a, b) => a + b, 0);
  const expenses = amounts
    .filter((amount) => amount < 0)
    .reduce((a, b) => a + b, 0);

  const addTransaction = (transaction) => {
    setTransactions((currentState) => {
      const update = [...currentState, transaction];
      return update;
    });
  };

  const balance = {
    transactions,
    incomes,
    expenses,
    addTransaction,
  };

  return (
    <TransactionContext.Provider value={balance}>
      {children}
    </TransactionContext.Provider>
  );
}
