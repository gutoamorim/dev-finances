import { useState } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Table from "./components/Table";

export default function App() {
  const [balance, setBalance] = useState([]);
  return (
    <>
      <Header />
      <Balance />
      <Table />
    </>
  );
}
