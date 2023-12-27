export default function Modal() {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-slate-900/50 flex items-center justify-center">
      <div className="w-2/4 h-80 bg-white rounded-md p-5">
        <h1>Tansações</h1>
        <form action="">
          <div>
            <h2>Tipo de transação</h2>
            <label>
              <input type="radio" />
              Receita
            </label>
            <label>
              <input type="radio" />
              Despeza
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Descrição</label>
            <input className="bg-slate-100" type="text" />
          </div>
          <div className="flex">
            <div className="flex flex-col">
              <label htmlFor="description">Valor</label>
              <input className="bg-slate-100" type="number" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description">Data</label>
              <input className="bg-slate-100" type="date" />
            </div>
          </div>
          <button>Salvar</button>
          <button>Cancelar</button>
        </form>
      </div>
    </div>
  );
}
