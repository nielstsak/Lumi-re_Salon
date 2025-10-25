import React, { useState } from 'react';
import styled from 'styled-components';
import tableau1 from '../../assets/images/tableau_1.webp';
import tableau2 from '../../assets/images/tableau_2.webp';
import tableau3 from '../../assets/images/tableau_3.webp';
import tableau4 from '../../assets/images/tableau_4.webp';
import tableau5 from '../../assets/images/tableau_5.webp';

const images = [tableau1, tableau2, tableau3, tableau4, tableau5];

const CarouselContainer = styled.div`
  max-width: 1000px;
  margin: calc(var(--spacing-unit) * 4) auto 0;
  position: relative;
`;

const SlideContainer = styled.div`
  overflow: hidden;
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => -props.$currentIndex * 100}%);
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  padding: calc(var(--spacing-unit) * 2);
`;

const Image = styled.img`
  width: 100%;
  height: 60vh;
  object-fit: cover;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-subtle);
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--theme-surface);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 10;
  transition: var(--transition-subtle);

  ${props => props.direction === 'prev' ? 'left: 0;' : 'right: 0;'}

  &:hover {
    background: var(--theme-background);
    transform: translateY(-50%) scale(1.1);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-unit);
  margin-top: calc(var(--spacing-unit) * 2);
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? 'var(--theme-surface)' : 'var(--border-color)')}; /* MODIFIÉ ICI */
  transition: var(--transition-subtle);
`;

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  const goToNext = () => setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);

  return (
    <CarouselContainer>
      <NavButton direction="prev" onClick={goToPrev}>&#8249;</NavButton>
      <SlideContainer>
        <Slide $currentIndex={currentIndex}>
          {images.map((img, index) => (
            <ImageWrapper key={index}>
              <Image src={img} alt={`Oeuvre ${index + 1}`} />
            </ImageWrapper>
          ))}
        </Slide>
      </SlideContainer>
      <NavButton direction="next" onClick={goToNext}>&#8250;</NavButton>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot key={index} $active={index === currentIndex} onClick={() => setCurrentIndex(index)} />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default ImageCarousel;