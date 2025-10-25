import React from 'react';
import styled from 'styled-components';
import Section from '../layout/Section';

const SectionText = styled.p`
  max-width: 800px;
  margin: 0 auto calc(var(--spacing-unit) * 3);
  font-size: 1.1rem;
  line-height: 1.8;
`;

const ArtisanSection = () => {
  return (
    <Section id="artisan-barber" title="Un artisan Barbier historique" variant="primary">
      <SectionText>
        Bienvenue au Salon Lumière, votre destination privilégiée pour une expérience de coiffure et de barbier authentique à Lyon 8e. 
        Fort de plus de 25 ans d'expertise depuis 1997, je vous accueille dans un espace chaleureux, pour m'occuper de vos cheveux et votre barbe avec une approche traditionnelle.
      </SectionText>

    </Section>
  );
};

export default ArtisanSection;

