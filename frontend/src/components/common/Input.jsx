import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: calc(var(--spacing-unit) * 2);
`;

const Label = styled.label`
  display: block;
  font-family: var(--font-text);
  font-weight: 600;
  color: var(--text-ink);
  margin-bottom: var(--spacing-unit);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5);
  font-size: 1.1rem;
  font-family: var(--font-text);
  background-color: var(--bg-paper);
  border: none;
  border-bottom: 2px solid var(--accent-blue);
  transition: border-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-bottom-color: var(--accent-red);
  }
`;

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <InputWrapper>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};

export default Input;