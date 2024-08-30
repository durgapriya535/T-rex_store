import { useContext } from "react";
import MaterialContext from "../Store/Context";
import Modal from "./UI/Modal";

const ModalError = ({ message, onClose }) => {
  const cartCtx = useContext(MaterialContext);
  return (
    <Modal className="error-style" open= {true}>
        <div>{message}</div>
        <button onClick={onClose}>Close</button>

    </Modal>
  );
};



export default ModalError;
