import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";

export default function Table() {
  const { transactions } = useContext(TransactionContext);

  return (
    <div className="container m-auto mt-12">
      <table className="w-full">
        <thead className="bg-slate-300">
          <tr className="text-left">
            <th className="py-4 px-2">Descrição</th>
            <th>Valor</th>
            <th>Data</th>
            <th className="max-w-min"></th>
          </tr>
        </thead>
        <tbody className="bg-slate-200">
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.description}>
                <td className="p-2 my-2">{transaction.description}</td>
                <td>
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td>{transaction.date}</td>
                <td className="w-1/12">
                  <button>
                    <img
                      className="w-5 h-5"
                      src={edit}
                      alt="Editar"
                      title="Editar"
                    />
                  </button>
                  <button>
                    <img
                      className="w-5 h-5 ml-5"
                      src={trash}
                      alt="Excluir"
                      title="Excluir"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
