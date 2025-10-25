import React from 'react';
import styled from 'styled-components';
import Section from '../layout/Section';
import ServiceCard from './ServiceCard';
import useApi from '../../hooks/useApi';
import SalonCarousel from './SalonCarousel';

const ServicesLayout = styled.div`
  display: grid;
  grid-template-columns: 9fr 3fr;
  gap: calc(var(--spacing-unit) * 4);
  align-items: start;
`;

const CarouselWrapper = styled.div`
  /* styles pour le conteneur du carrousel si nécessaire */
`;

const ServicesWrapper = styled.div`
  /* styles pour le conteneur des services si nécessaire */
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing-unit) * 3);
`;

const InfoText = styled.p`
  font-size: 1.1rem;
`;

const ServicesSection = () => {
  const { data: services, loading, error } = useApi('/services/');

  return (
    <Section id="nos-services" title="Nos Services">
      <ServicesLayout>
        <CarouselWrapper>
          <SalonCarousel />
        </CarouselWrapper>
        <ServicesWrapper>
          {loading && <InfoText>Chargement des prestations...</InfoText>}
          {error && <InfoText style={{ color: 'var(--accent-error)' }}>Erreur: Impossible de charger les prestations.</InfoText>}
          {services && (
            <ServicesGrid>
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  duration={service.duration}
                  price={parseFloat(service.price)}
                />
              ))}
            </ServicesGrid>
          )}
        </ServicesWrapper>
      </ServicesLayout>
    </Section>
  );
};

export default ServicesSection;