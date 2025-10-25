import React from 'react';
import styled, { css } from 'styled-components';

const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionContainer = styled.section`
  ${fadeIn}
  padding: calc(var(--spacing-unit) * 10) 0;
  animation: fadeIn 0.7s ease-out forwards;
  text-align: center;
  transition: var(--transition-subtle);

  ${({ $variant }) => $variant === 'primary' && css`
    background-color: var(--theme-primary);
    color: var(--text-on-primary);

    h2, p {
      color: var(--text-on-primary);
    }

    a {
      color: var(--theme-surface);
      &:hover {
        opacity: 0.8;
      }
    }
  `}
`;

const SectionTitle = styled.h2`
  margin-bottom: calc(var(--spacing-unit) * 4);
`;

const Section = ({ id, title, children, variant }) => {
  return (
    <SectionContainer id={id} $variant={variant}>
      <div className="container">
        {title && <SectionTitle>{title}</SectionTitle>}
        {children}
      </div>
    </SectionContainer>
  );
};

export default Section;

