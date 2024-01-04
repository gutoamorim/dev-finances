import Card from "./Card";
import income from "../assets/income.svg";
import expense from "../assets/expense.svg";
import total from "../assets/total.svg";
import { TransactionContext } from "../contexts/TransactionContext";
import { useContext } from "react";

export default function Balance() {
  const { incomes, expenses } = useContext(TransactionContext);
  const balance = incomes + expenses;

  return (
    <section className="container m-auto mt-5 flex flex-col items-center gap-2 md:flex-row md:justify-around md:-mt-12">
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
        type="Saldo"
        bg="bg-white"
        svg={total}
        value={balance.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      />
    </section>
  );
}
