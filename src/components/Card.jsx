export default function Card({ type, bg, color, svg, value }) {
  return (
    <div className={`p-3 rounded-2xl shadow-lg ${bg} w-60 md:p-4`}>
      <h1
        className={`text-sm flex items-center justify-between ${color} md:text-lg`}
      >
        {type}
        <img src={svg} alt="" />
      </h1>
      <p className={`text-lg md:text-2xl font-semibold ${color} md:text-2`}>
        {value || 0.0}
      </p>
    </div>
  );
}
