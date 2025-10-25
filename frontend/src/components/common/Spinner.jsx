import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: ${rotate} 1s ease-in-out infinite;
`;

const Spinner = ({ size = 24 }) => {
  return <SpinnerContainer size={size} />;
};

export default Spinner;