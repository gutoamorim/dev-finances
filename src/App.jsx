import { useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Table from "./components/Table";
import { TransactionContextProvider } from "./contexts/TransactionContext";
import Button from "./components/Button";

export default function App() {
  const [modal, setModal] = useState(false);
  const [transaction, setTransaction] = useState(null);

  return (
    <TransactionContextProvider>
      <Header />
      <Balance />
      <Button setModal={setModal} setTransaction={setTransaction} />
      <Table setModal={setModal} setTransaction={setTransaction} />
      <Modal
        modal={modal}
        setModal={setModal}
        transactionUpdate={transaction}
      />
    </TransactionContextProvider>
  );
}
