import { useState } from "react";

export default function useTransaction() {
  const [transactions, setTransactions] = useState(teste);

  return {
    transactions,
  };
}
