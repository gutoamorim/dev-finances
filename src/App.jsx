import { useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Table from "./components/Table";
import { TransactionContextProvider } from "./contexts/TransactionContext";
import Button from "./components/Button";

export default function App() {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal((modal) => !modal);
  }

  function editItem(item) {
    return <Modal toggleModal={toggleModal} transactionUpdate={item} />;
  }

  return (
    <TransactionContextProvider>
      <Header />
      <Balance />
      <Button toggleModal={toggleModal} />
      <Table />
      {modal && <Modal toggleModal={toggleModal} />}
    </TransactionContextProvider>
  );
}
