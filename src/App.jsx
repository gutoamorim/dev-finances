import Balance from "./components/Balance";
import Header from "./components/Header";
import Table from "./components/Table";
import { TransactionContextProvider } from "./contexts/TransactionContext";

export default function App() {
  return (
    <TransactionContextProvider>
      <Header />
      <Balance />
      <Table />
    </TransactionContextProvider>
  );
}
