import { useState } from "react";
import { toast } from "react-toastify";

export default function useTransaction() {
  const [transactions, setTransactions] = useState(() => {
    const localTransactions = localStorage.getItem("transactions");
    if (localTransactions) return JSON.parse(localTransactions);
    return [];
  });

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
      localStorage.setItem("transactions", JSON.stringify(update));
      toast.success("Transação adicionada com sucesso!");
      return update;
    });
  };

  const deleteTransaction = (id) => {
    setTransactions((currentState) => {
      const update = currentState.filter(
        (transaction) => transaction.id !== id
      );
      localStorage.setItem("transactions", JSON.stringify(update));
      toast.success("Transação removida com sucesso!");
      return update;
    });
  };

  const updateTransaction = (itemId, newAtributes) => {
    setTransactions((currentState) => {
      const itemIndex = currentState.findIndex((item) => item.id === +itemId);
      const updatedItems = [...currentState];
      Object.assign(updatedItems[itemIndex], newAtributes);
      toast.success("Transação editada com sucesso!");
      localStorage.setItem("transactions", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return {
    transactions,
    amounts,
    incomes,
    expenses,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
}
