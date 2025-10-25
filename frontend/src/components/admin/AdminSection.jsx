import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  animation: fadeInUp 0.5s ease-out;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: calc(var(--spacing-unit) * 4);
  padding-bottom: calc(var(--spacing-unit) * 2);
  border-bottom: 1px solid var(--border-color);
`;

const AdminSection = ({ title, children }) => {
  return (
    <SectionContainer>
      <Title>{title}</Title>
      {children}
    </SectionContainer>
  );
};

export default AdminSection;