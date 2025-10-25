import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import CheckIcon from '../../assets/icons/CheckIcon';

const ConfirmationContainer = styled.div`
  text-align: center;
  padding: calc(var(--spacing-unit) * 4) 0;
  animation: subtle-fade-up 0.5s var(--transition-subtle) forwards;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--accent-success);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto calc(var(--spacing-unit) * 3);
`;

const Title = styled.h3`
  font-size: 1.8rem;
  color: var(--text-primary);
`;

const Message = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin: var(--spacing-unit) 0 calc(var(--spacing-unit) * 4);
`;

const ConfirmationStep = ({ onReset }) => {
  return (
    <ConfirmationContainer>
      <IconWrapper>
        <CheckIcon color="var(--theme-surface)" size={32} />
      </IconWrapper>
      <Title>Rendez-vous confirmé !</Title>
      <Message>Votre réservation a bien été enregistrée. Merci de votre confiance.</Message>
      <Button variant="primary" onClick={onReset}>
        Prendre un autre rendez-vous
      </Button>
    </ConfirmationContainer>
  );
};

export default ConfirmationStep;
