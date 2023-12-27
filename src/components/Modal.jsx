import { useState } from "react";

export default function Modal() {
  const [typeTransaction, setTypeTransaction] = useState(null);

  function handleChange({ target }) {
    setTypeTransaction(target.value);
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 bg-slate-900/50 flex items-center justify-center">
      <div className="w-2/5 h-auto bg-white rounded-md p-8">
        <h1 className="text-2xl mb-2">Nova Transação</h1>
        <form action="">
          <div>
            <h2 className="mb-1">Tipo de transação:</h2>
            <div className="flex gap-3 mb-2">
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="type"
                  value="receita"
                  onChange={handleChange}
                />
                Receita
              </label>
              <label>
                <input
                  className="mr-1"
                  type="radio"
                  name="type"
                  value="despeza"
                  onChange={handleChange}
                />
                Despeza
              </label>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="description">Descrição</label>
            <input className="bg-slate-100 p-1 outline-green-300" type="text" />
          </div>
          <div className="flex gap-4 mb-5">
            <div className="flex flex-col w-1/2">
              <label htmlFor="description">Valor</label>
              <input
                className="bg-slate-100 p-1  outline-green-300"
                type="number"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="description">Data</label>
              <input
                className="bg-slate-100 p-1  outline-green-300"
                type="date"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-1/2 bg-green-500 py-2 rounded text-white">
              Salvar
            </button>
            <button className="w-1/2 border border-red-500 py-2 text-red-500">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
