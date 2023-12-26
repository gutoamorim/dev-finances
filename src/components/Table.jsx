import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export default function Table() {
  const transactions = useContext(TransactionContext);

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
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="p-2 my-2">{transaction.description}</td>
                <td>
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{transaction.date}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
