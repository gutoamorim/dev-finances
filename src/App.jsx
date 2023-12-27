import { useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Table from "./components/Table";
import { TransactionContextProvider } from "./contexts/TransactionContext";

export default function App() {
  const [modal, setModal] = useState(false);

  return (
    <TransactionContextProvider>
      <Header />
      <Balance />
      <div className="container m-auto mt-10 -mb-5 text-right">
        <button
          className="border bg-green-700 p-2 rounded-md text-white"
          onClick={() => setModal((modal) => !modal)}
        >
          + Nova Transação
        </button>
      </div>
      <Table />
      {modal && <Modal />}
    </TransactionContextProvider>
  );
}
