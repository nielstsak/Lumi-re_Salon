import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const letterFadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--theme-primary-accent);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  animation: ${({ $isDismissed }) => ($isDismissed ? fadeOut : 'none')} 0.8s forwards;
`;

const WelcomeTextContainer = styled.h1`
  font-family: var(--font-title);
  font-size: clamp(2rem, 6vw, 3.5rem);
  color: var(--theme-surface);
`;

const Letter = styled.span`
  display: inline-block;
  opacity: 0;
  animation: ${letterFadeInUp} 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const AnimatedText = ({ text }) => (
  <WelcomeTextContainer>
    {text.split('').map((char, index) => (
      <Letter key={index} $delay={0.5 + index * 0.05}>
        {char === ' ' ? '\u00A0' : char}
      </Letter>
    ))}
  </WelcomeTextContainer>
);

const ScrollPrompt = styled.div`
  position: absolute;
  bottom: 5%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-unit);
  color: var(--theme-surface);
  opacity: 0;
  animation: ${letterFadeInUp} 1s 2s forwards;

  svg {
    animation: ${bounce} 2.5s infinite 2.5s;
  }
`;

const IntroOverlay = ({ isDismissed, onDismiss }) => {
  return (
    <Overlay $isDismissed={isDismissed}>
      <AnimatedText text="Bienvenue au Salon Lumière" />
      <ScrollPrompt onClick={onDismiss}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </ScrollPrompt>
    </Overlay>
  );
};

export default IntroOverlay;