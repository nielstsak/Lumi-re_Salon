import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNotification } from '../../contexts/NotificationContext';
import SuccessIcon from '../../assets/icons/SuccessIcon';
import ErrorIcon from '../../assets/icons/ErrorIcon';

const slideIn = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2.5);
  border-radius: 4px;
  color: var(--text-on-accent);
  background-color: ${({ $type }) => ($type === 'success' ? 'var(--accent-success)' : 'var(--accent-error)')};
  box-shadow: var(--shadow-medium);
  z-index: 3000;
  animation: ${slideIn} 0.5s var(--transition-subtle);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-unit);
`;

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }

  return (
    <NotificationContainer $type={notification.type}>
      {notification.type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
      <span>{notification.message}</span>
    </NotificationContainer>
  );
};

export default Notification;