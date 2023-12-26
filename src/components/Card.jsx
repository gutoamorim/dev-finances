export default function Card({ type, bg, color }) {
  return (
    <div className={`p-4 rounded-2xl shadow-lg ${bg} w-60`}>
      <h1 className={`${color}`}>{type}</h1>
      <p className={`text-2xl font-semibold ${color}`}>R$ 5.000,00</p>
    </div>
  );
}
