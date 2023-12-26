import Card from "./Card";
import income from "../assets/income.svg";
import expense from "../assets/expense.svg";
import total from "../assets/total.svg";
import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export default function Balance() {
  const transactions = useContext(TransactionContext);

  const balance = transactions.map((transaction) => transaction.amount);

  const expenses = balance
    .filter((expense) => expense < 0)
    .reduce((a, b) => a + b, 0);

  const incomes = balance
    .filter((expense) => expense > 0)
    .reduce((a, b) => a + b, 0);

  const saldo = incomes + expenses;

  return (
    <section className="container m-auto flex items-center justify-around -mt-12">
      <Card
        type="Entradas"
        bg="bg-green-800"
        color="text-white"
        svg={income}
        value={incomes.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />
      <Card
        type="Saídas"
        bg="bg-red-700"
        color="text-white"
        svg={expense}
        value={expenses.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />
      <Card
        type="Total"
        bg="bg-white"
        svg={total}
        value={saldo.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />
    </section>
  );
}
