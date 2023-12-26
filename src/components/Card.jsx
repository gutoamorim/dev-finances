export default function Card({ type, bg, color, svg, value }) {
  return (
    <div className={`p-4 rounded-2xl shadow-lg ${bg} w-60`}>
      <h1 className={`flex items-center justify-between ${color}`}>
        {type}
        <img src={svg} alt="" />
      </h1>
      <p className={`text-2xl font-semibold ${color}`}>{value || 0.0}</p>
    </div>
  );
}
