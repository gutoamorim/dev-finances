import Card from "./Card";
import income from "../assets/income.svg";
import expense from "../assets/expense.svg";
import total from "../assets/total.svg";

export default function Balance() {
  return (
    <section className="container m-auto flex items-center justify-around -mt-12">
      <Card type="Entradas" bg="bg-green-800" color="text-white" svg={income} />
      <Card type="Saídas" bg="bg-red-700" color="text-white" svg={expense} />
      <Card type="Total" bg="bg-white" svg={total} />
    </section>
  );
}
