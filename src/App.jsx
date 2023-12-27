import Balance from "./components/Balance";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Table from "./components/Table";
import { TransactionContextProvider } from "./contexts/TransactionContext";

export default function App() {
  return (
    <TransactionContextProvider>
      <Header />
      <Balance />
      <Table />
      <Modal />
    </TransactionContextProvider>
  );
}
