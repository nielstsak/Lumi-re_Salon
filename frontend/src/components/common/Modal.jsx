import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalSlideIn = keyframes`
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: calc(var(--spacing-unit) * 2);
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: var(--theme-surface); /* Correction : var(--white) -> var(--theme-surface) */
  padding: calc(var(--spacing-unit) * 4);
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  animation: ${modalSlideIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        {children}
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;