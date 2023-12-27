import { useState } from "react";

export default function Modal({ toggleModal }) {
  const [typeTransaction, setTypeTransaction] = useState(null);

  function handleRadio({ target }) {
    setTypeTransaction(target.value);
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-slate-900/50 flex items-center justify-center">
      <div className="w-2/5 h-auto bg-slate-200 rounded-md p-8">
        <h1 className="text-2xl mb-2 font-medium">Nova Transação</h1>
        <form>
          <div>
            <h2 className="mb-1 font-medium">Tipo de transação:</h2>
            <div className="flex gap-3 mb-2">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="type"
                  value="receita"
                  onChange={handleRadio}
                />
                Receita
              </label>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="type"
                  value="despeza"
                  onChange={handleRadio}
                />
                Despeza
              </label>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="description">Descrição</label>
            <input
              className="bg-slate-300 p-1 outline-green-400 rounded-md"
              type="text"
            />
          </div>
          <div className="flex gap-4 mb-5">
            <div className="flex flex-col w-1/2">
              <label htmlFor="description">Valor</label>
              <input
                className="bg-slate-300 p-1  outline-green-300 rounded-md"
                type="number"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="description">Data</label>
              <input
                className="bg-slate-300 p-1  outline-green-300 rounded-md"
                type="date"
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
