import Card from "./Card";

export default function Balance() {
  return (
    <section className="container m-auto flex items-center justify-around -mt-10">
      <Card type="Entradas" bg="bg-lime-500" color="text-white" />
      <Card type="Saídas" bg="bg-red-500" color="text-white" />
      <Card type="Total" bg="bg-white" />
    </section>
  );
}
