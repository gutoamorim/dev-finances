import { useState } from "react";

export default function useTransaction() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Salário",
      amount: 9000,
      date: "26/12/2023",
    },
    {
      id: 2,
      description: "agua",
      amount: -32,
      date: "26/12/2023",
    },
    {
      id: 3,
      description: "Internet",
      amount: -100,
      date: "26/12/2023",
    },
  ]);

  const incomes = transactions.filter((transaction) => transaction.amount > 0);
  const expenses = transactions.filter((transaction) => transaction.amount < 0);

  return {
    transactions,
    incomes,
    expenses,
  };
}
