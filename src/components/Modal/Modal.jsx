import React from 'react';

const Modal = ({children, isOpen}) => {
  return (
    isOpen ? 
      <div className="modal">
        {children}
      </div>
      : null
  );
}

export default Modal;