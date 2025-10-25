import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const StyledButton = styled.button`
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 1.1rem;
  padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-unit);

  ${({ $variant, disabled }) => `
    opacity: ${disabled ? 0.6 : 1};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    ${$variant === 'primary' ? `
      background-color: var(--accent-primary);
      color: var(--text-on-accent);
      border: 2px solid var(--accent-primary);

      &:hover {
        background-color: ${disabled ? 'var(--accent-primary)' : 'var(--accent-primary-hover)'};
        border-color: ${disabled ? 'var(--accent-primary)' : 'var(--accent-primary-hover)'};
      }
    ` : `
      background-color: transparent;
      color: var(--text-primary);
      border: 2px solid var(--border-color);

      &:hover {
        background-color: ${disabled ? 'transparent' : 'var(--accent-secondary-hover)'};
        color: var(--text-primary);
      }
    `}
  `}
`;

const Button = ({ children, onClick, variant = 'primary', type = 'button', disabled = false, loading = false }) => {
  return (
    <StyledButton $variant={variant} onClick={onClick} type={type} disabled={disabled || loading}>
      {loading && <Spinner size={20} />}
      {children}
    </StyledButton>
  );
};

export default Button;