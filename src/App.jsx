import { useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Table from "./components/Table";
import { TransactionContextProvider } from "./contexts/TransactionContext";
import Button from "./components/Button";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [modal, setModal] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [id, setId] = useState(null);

  return (
    <TransactionContextProvider>
      <Header />
      <ToastContainer autoClose={3000} />
      <Balance />
      <Button setModal={setModal} setTransaction={setTransaction} />
      <Table
        setModal={setModal}
        setTransaction={setTransaction}
        setId={setId}
      />
      <Modal
        modal={modal}
        setModal={setModal}
        transactionUpdate={transaction}
        id={id}
      />
    </TransactionContextProvider>
  );
}
