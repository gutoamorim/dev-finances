import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export default function Button({ toggleModal }) {
  return (
    <div className="container m-auto mt-10 -mb-5 text-right">
      <button
        className="border bg-green-700 p-2 rounded-md text-white"
        onClick={toggleModal}
      >
        + Nova Transação
      </button>
    </div>
  );
}
