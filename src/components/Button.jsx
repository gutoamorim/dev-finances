export default function Button({ setModal, setTransaction }) {
  function addTransaction() {
    setTransaction(null);
    setModal((state) => !state);
  }

  return (
    <div className="container m-auto mt-10 -mb-5 text-right">
      <button
        className="border bg-green-700 p-2 rounded-md text-white"
        onClick={() => addTransaction()}
      >
        + Nova Transação
      </button>
    </div>
  );
}
