export default function Card({ type, bg, color, svg }) {
  return (
    <div className={`p-4 rounded-2xl shadow-lg ${bg} w-60`}>
      <h1 className={`flex items-center justify-between ${color}`}>
        {type}
        <img src={svg} alt="" />
      </h1>
      <p className={`text-2xl font-semibold ${color}`}>R$ 5.000,00</p>
    </div>
  );
}
