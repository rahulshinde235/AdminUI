import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
