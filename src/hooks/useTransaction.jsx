import { useState } from "react";
import { toast } from "react-toastify";

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
      toast.success("Transação adicionada com sucesso!");
      return update;
    });
  };

  const deleteTransaction = (id) => {
    setTransactions((currentState) => {
      const update = currentState.filter(
        (transaction) => transaction.id !== id
      );
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
