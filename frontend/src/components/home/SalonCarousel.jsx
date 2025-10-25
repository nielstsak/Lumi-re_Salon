import React, { useState } from 'react';
import styled from 'styled-components';
import tableau1 from '../../assets/images/interieur_1.jpeg';
import tableau2 from '../../assets/images/interieur_2.jpeg';
import tableau3 from '../../assets/images/interieur_3.jpeg';

const images = [tableau1, tableau2, tableau3];

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => -props.currentIndex * 100}%);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  flex-shrink: 0;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
  color: #333;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  ${props => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
`;

const SalonCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <CarouselContainer>
      <NavButton direction="prev" onClick={goToPrevious}>&#10094;</NavButton>
      <Slide currentIndex={currentIndex}>
        {images.map((image, index) => (
          <Image key={index} src={image} alt={`Salon image ${index + 1}`} />
        ))}
      </Slide>
      <NavButton direction="next" onClick={goToNext}>&#10095;</NavButton>
    </CarouselContainer>
  );
};

export default SalonCarousel;