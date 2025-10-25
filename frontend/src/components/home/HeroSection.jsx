import React from 'react';
import styled from 'styled-components';
import facadeImage from '../../assets/images/salon-facade-watercolor.webp';

const HeroContainer = styled.section`
  height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-image: url(${facadeImage});
  background-position: center;
  background-size: cover;
  background-attachment: fixed; /* Crée l'effet de parallaxe */
  text-align: center;
  color: var(--white);
`;

const HeroSection = () => {
  return (
    <HeroContainer id="hero">
    </HeroContainer>
  );
};

export default HeroSection;