import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";

export default function Table({ balance }) {
  return (
    <div className="container m-auto mt-12">
      <table className="w-full">
        <thead className="bg-slate-300">
          <tr className="text-left">
            <th className="py-4 px-2">Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className="bg-slate-200">
          <tr>
            <td className="p-2 my-2">Luz</td>
            <td>R$ 200,00</td>
            <td>26/12/2023</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
