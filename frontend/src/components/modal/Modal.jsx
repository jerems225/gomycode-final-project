import React from 'react';
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose} className="btn btn-sm btn-dark w-100 mt-2"><strong>CANCEL</strong></button>
      </section>
    </div>
  );
};

export default Modal;
