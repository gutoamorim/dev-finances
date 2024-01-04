import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import edit from "../assets/edit.svg";
import trash from "../assets/trash.svg";

export default function Table({ setModal, setTransaction, setId }) {
  const { transactions } = useContext(TransactionContext);

  if (transactions.length === 0)
    return (
      <p className="text-center md:text-2xl mt-16 font-medium">
        Você não possui transações adicionadas.
      </p>
    );

  function handleEdit(transaction) {
    setTransaction(transaction);
    setModal((state) => !state);
  }

  function handleDelete(id, transaction) {
    setId(id);
    setTransaction(transaction);
    setModal((state) => !state);
  }

  return (
    <div className="container m-auto mt-12 overflow-x-auto ">
      <table className="min-w-full border-separate border-spacing-x-0 border-spacing-y-0.5">
        <thead className="bg-slate-300">
          <tr className="text-left px-2">
            <th className="py-4 px-4">Descrição</th>
            <th className="py-2 px-4">Valor</th>
            <th className="py-2 px-4">Data</th>
            <th className="py-2 px-4"></th>
          </tr>
        </thead>
        <tbody className="bg-slate-200">
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-2 px-4">{transaction.description}</td>
                <td className="py-2 px-4">
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="py-2 px-4">
                  {transaction.date.split("-").reverse().join("/")}
                </td>
                <td className="py-2 px-4 md:w-1/12">
                  <div className="flex gap-5 px-5 md:gap-3">
                    <button>
                      <img
                        className="min-w-5 min-h-5"
                        src={edit}
                        alt="Editar"
                        title="Editar"
                        onClick={() => handleEdit(transaction)}
                      />
                    </button>
                    <button>
                      <img
                        className="min-w-5 min-h-5 md:ml-5"
                        src={trash}
                        alt="Excluir"
                        title="Excluir"
                        onClick={() =>
                          handleDelete(transaction.id, transaction)
                        }
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
