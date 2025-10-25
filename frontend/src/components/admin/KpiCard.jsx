import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: var(--bg-paper);
  padding: calc(var(--spacing-unit) * 3);
  border-radius: 4px;
  text-align: center;
  border: 1px solid var(--accent-blue);
`;

const Value = styled.div`
  font-family: var(--font-title);
  font-size: 3rem;
  color: var(--accent-red);
  font-weight: 700;
`;

const Label = styled.div`
  font-size: 1rem;
  color: var(--accent-blue);
  margin-top: var(--spacing-unit);
`;

const KpiCard = ({ value, label }) => {
  return (
    <Card>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Card>
  );
};

export default KpiCard;