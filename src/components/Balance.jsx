import Card from "./Card";
import income from "../assets/income.svg";
import expense from "../assets/expense.svg";
import total from "../assets/total.svg";

export default function Balance() {
  return (
    <section className="container m-auto flex items-center justify-around -mt-10">
      <Card type="Entradas" bg="bg-lime-500" color="text-white" svg={income} />
      <Card type="Saídas" bg="bg-red-400" color="text-white" svg={expense} />
      <Card type="Total" bg="bg-white" svg={total} />
    </section>
  );
}
