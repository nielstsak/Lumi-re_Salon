import React from 'react';
import styled from 'styled-components';
import Section from '../layout/Section';
import ImageCarousel from './ImageCarousel';

const SectionText = styled.p`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
`;

const ExhibitionSection = () => {
  return (
    <Section id="expo" title="Exposition de peintures" variant="primary">
      <SectionText>
        Le Salon Lumière est fier d'accueillir une exposition permanente des œuvres de{' '}
        <a href="http://simonnemartin.com/" target="_blank" rel="noopener noreferrer">
          Simonne Martin
        </a>
        , artiste peintre lyonnaise.
      </SectionText>
      <ImageCarousel />
    </Section>
  );
};

export default ExhibitionSection;

