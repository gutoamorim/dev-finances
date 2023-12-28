import { useState } from "react";

const teste = [
  {
    description: "Luz",
    amount: -150,
    date: "25/12/2023",
  },
  {
    description: "Agua",
    amount: -50,
    date: "25/12/2023",
  },
  {
    description: "Web Site",
    amount: 3000,
    date: "25/12/2023",
  },
];

export default function useTransaction() {
  const [transactions, setTransactions] = useState(teste);

  return {
    transactions,
  };
}
