import { useContext, useState } from "react";
import { TransactionContext } from "../contexts/TransactionContext";
import { Transaction } from "../models/Transaction";

const defaultTransaction = {
  type: null,
  description: "",
  amount: "",
  date: "",
};

export default function Modal({ toggleModal, transactionUpdate }) {
  const [transaction, setTransaction] = useState(
    transactionUpdate ? transactionUpdate : defaultTransaction
  );

  const { addTransaction } = useContext(TransactionContext);

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
    const newTransaction = new Transaction(transaction);
    console.log(newTransaction);
    addTransaction(newTransaction);
    toggleModal();
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-slate-900/50 flex items-center justify-center">
      <div className="w-2/5 h-auto bg-slate-200 rounded-md p-8">
        <h1 className="text-2xl mb-2 font-medium">Nova Transação</h1>
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
          <div className="flex gap-4 mb-5">
            <div className="flex flex-col w-1/2">
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
            <div className="flex flex-col w-1/2">
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
          <div className="flex gap-2">
            <button className="w-1/2 bg-green-500 py-2 rounded text-white hover:bg-green-600">
              Salvar
            </button>
            <a
              onClick={toggleModal}
              href="#"
              className="w-1/2 border border-red-500 py-2 text-red-500 hover:border-red-700 hover:text-red-700 text-center"
            >
              Cancelar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
