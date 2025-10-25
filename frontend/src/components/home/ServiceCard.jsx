import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: var(--theme-surface);
  padding: calc(var(--spacing-unit) * 3);
  box-shadow: var(--shadow-subtle);
  transition: var(--transition-subtle);
  border-left: 3px solid transparent;

  &:hover {
    box-shadow: var(--shadow-medium);
    transform: translateY(-4px);
    border-left-color: var(--accent-action);
  }
`;

const InfoLine = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: calc(var(--spacing-unit) * 0.5);
`;

const Title = styled.h4`
  font-family: var(--font-title);
  font-size: 1.2rem;
  flex-grow: 1;
`;

const Dots = styled.span`
  flex-grow: 1;
  border-bottom: 2px dotted var(--border-color);
  margin: 0 calc(var(--spacing-unit) * 2);
  transform: translateY(-4px);
`;

const Price = styled.span`
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--accent-action);
`;

const Duration = styled.p`
  font-family: var(--font-text);
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const ServiceCard = ({ title, duration, price }) => {
  return (
    <CardContainer>
      <InfoLine>
        <Title>{title}</Title>
        <Dots />
        <Price>{price.toFixed(2)} €</Price>
      </InfoLine>
      <Duration>Durée estimée : {duration} minutes</Duration>
    </CardContainer>
  );
};

export default ServiceCard;

