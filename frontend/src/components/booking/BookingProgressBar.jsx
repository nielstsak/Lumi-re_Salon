import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-w: 600px;
  margin: 0 auto calc(var(--spacing-unit) * 6);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 19px;
    left: 15%;
    right: 15%;
    height: 1px;
    background-color: var(--border-color);
    z-index: 1;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  text-align: center;
`;

const StepCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: var(--spacing-unit);
  transition: all 0.3s ease-in-out;
  background-color: ${({ $active }) => ($active ? 'var(--accent-primary)' : 'var(--theme-surface)')};
  color: ${({ $active }) => ($active ? 'var(--text-on-accent)' : 'var(--text-secondary)')};
  border: 2px solid ${({ $active }) => ($active ? 'var(--accent-primary)' : 'var(--border-color)')};
`;

const StepLabel = styled.span`
  font-family: var(--font-text);
  font-weight: 600;
  color: ${({ $active }) => ($active ? 'var(--text-primary)' : 'var(--text-secondary)')};
`;

const steps = ['Service', 'Créneau', 'Infos', 'Confirmation'];

const BookingProgressBar = ({ currentStep = 1 }) => {
  return (
    <ProgressBarContainer>
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        return (
          <Step key={stepNumber}>
            <StepCircle $active={isActive}>{stepNumber}</StepCircle>
            <StepLabel $active={isActive}>{label}</StepLabel>
          </Step>
        );
      })}
    </ProgressBarContainer>
  );
};

export default BookingProgressBar;