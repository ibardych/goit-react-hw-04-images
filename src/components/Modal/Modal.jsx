import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalStyled } from './Modal.styled';
import { TfiClose } from 'react-icons/tfi';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseModal, children }) => {
  const [modalOpened, setModalOpened] = useState(false);

  const handleCloseModal = e => {
    if (
      e.code === 'Escape' ||
      e.target === e.currentTarget ||
      e.currentTarget.classList.contains('close')
    ) {
      setModalOpened(false);
      setTimeout(() => {
        onCloseModal(e);
      }, 150);
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      handleCloseModal(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    setTimeout(() => {
      setModalOpened(true);
    }, 150);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <ModalStyled
      onClick={handleCloseModal}
      className={!modalOpened ? 'is-hidden' : ''}
    >
      <div className="window">
        <div className="inner">
          <div className="container">
            <div className="text">{children}</div>
          </div>
        </div>
      </div>
      <TfiClose onClick={handleCloseModal} className="close" />
    </ModalStyled>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
