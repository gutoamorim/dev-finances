import { useState } from "react";

export default function useTransaction() {
  const [transactions, setTransactions] = useState([]);

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

  const deleteTransaction = (id) => {
    setTransactions((currentState) => {
      const update = currentState.filter(
        (transaction) => transaction.id !== id
      );
      return update;
    });
  };

  return {
    transactions,
    amounts,
    incomes,
    expenses,
    addTransaction,
    deleteTransaction,
  };
}
