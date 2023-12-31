import { useContext, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { Transaction } from "../models/Transaction";

const defaultTransaction = {
  description: "",
  amount: "",
  date: "",
};

export default function Modal({
  modal,
  setModal,
  transactionUpdate,
  id,
  setId,
}) {
  if (!modal) return null;
  const [transaction, setTransaction] = useState(
    transactionUpdate ? transactionUpdate : defaultTransaction
  );

  const { addTransaction, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);

  function handlechange(ev) {
    setTransaction((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    if (transactionUpdate) {
      const newTransaction = new Transaction(transaction);
      updateTransaction(transactionUpdate.id, newTransaction);
    } else {
      const newTransaction = new Transaction(transaction);
      addTransaction(newTransaction);
    }
    setModal((state) => !state);
  }

  function handleDelete(id) {
    deleteTransaction(id);
    closeModal();
  }

  function closeModal() {
    setId(null);
    setTransaction(defaultTransaction);
    setModal((state) => !state);
  }

  if (id) {
    return (
      <div className="w-full h-full absolute top-0 left-0 bg-slate-900/50 flex items-center justify-center">
        <div className="h-auto bg-slate-200 rounded-md p-8 md:w-2/5">
          <h1 className="text-2xl mb-2 font-medium">Remover Transação</h1>
          <p>
            Tem certeza que deseja remover a transação:{" "}
            <strong>{transactionUpdate.description}</strong>
          </p>
          <div className="flex w-full gap-4 items-center justify-between mt-5">
            <button
              className="w-1/2 bg-red-500 py-2 rounded text-white hover:bg-red-600"
              onClick={() => handleDelete(id)}
            >
              Excluir
            </button>
            <a
              onClick={closeModal}
              href="#"
              className="w-1/2 border border-red-300 py-2 rounded text-red-300 text-center hover:text-red-500 hover:border-red-500"
            >
              Cancelar
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-slate-900/50 flex items-center justify-center">
      <div className="h-auto bg-slate-200 rounded-md p-8 md:w-2/5">
        <h1 className="text-xl mb-2 font-medium md:text-2xl">
          {transactionUpdate ? "Editar Transação" : "Nova Transação"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label htmlFor="description">Descrição</label>
            <input
              className="bg-slate-300 p-1 outline-green-400 rounded-md"
              type="text"
              name="description"
              id="description"
              value={transaction.description}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-5">
            <div className="flex flex-col md:w-1/2">
              <label htmlFor="amount">Valor</label>
              <input
                className="bg-slate-300 p-1  outline-green-300 rounded-md"
                type="number"
                name="amount"
                id="amount"
                value={transaction.amount}
                onChange={handlechange}
              />
            </div>
            <div className="flex flex-col md:w-1/2">
              <label htmlFor="date">Data</label>
              <input
                className="bg-slate-300 p-1  outline-green-300 rounded-md"
                type="date"
                name="date"
                id="date"
                value={transaction.date}
                onChange={handlechange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:gap-2">
            <button className="md:w-1/2 bg-green-500 py-2 rounded text-white hover:bg-green-600">
              Salvar
            </button>
            <a
              onClick={closeModal}
              href="#"
              className="md:w-1/2 border border-red-500 py-2 text-red-500 hover:border-red-700 hover:text-red-700 text-center"
            >
              Cancelar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
