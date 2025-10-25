import React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../assets/icons/CheckIcon';
import useApi from '../../hooks/useApi';

const SelectorContainer = styled.div`
  animation: subtle-fade-up 0.5s var(--transition-subtle) forwards;
`;

const SectionTitle = styled.h3`
  text-align: left;
  font-size: 1.3rem;
  font-weight: 600;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: calc(var(--spacing-unit) * 2);
  margin-top: calc(var(--spacing-unit) * 3);
`;

const ServiceItem = styled.div`
  background: var(--theme-surface);
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--accent-action)' : 'var(--border-color)')};
  border-radius: 4px;
  padding: calc(var(--spacing-unit) * 2);
  cursor: pointer;
  transition: var(--transition-subtle);
  position: relative;
  box-shadow: ${({ $selected }) => ($selected ? 'var(--shadow-subtle)' : 'none')};
  transform: ${({ $selected }) => ($selected ? 'translateY(-2px)' : 'none')};

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent-action);
    box-shadow: var(--shadow-subtle);
  }
`;

const ServiceTitle = styled.h4`
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: calc(var(--spacing-unit) * 0.5);
`;

const ServiceInfo = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const SelectedIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  background-color: var(--accent-action);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServiceSelector = ({ onServiceSelect, selectedServiceId }) => {
  const { data: services, loading, error } = useApi('/services/');

  if (loading) return <p>Chargement des prestations...</p>;
  if (error) return <p style={{ color: 'var(--accent-error)' }}>Erreur de chargement des services.</p>;

  return (
    <SelectorContainer>
      <SectionTitle>Choisissez une prestation</SectionTitle>
      <ServicesGrid>
        {services?.map(service => (
          <ServiceItem 
            key={service.id} 
            onClick={() => onServiceSelect(service)}
            $selected={selectedServiceId === service.id}
          >
            {selectedServiceId === service.id && (
              <SelectedIcon>
                <CheckIcon color="var(--theme-surface)" size={14} />
              </SelectedIcon>
            )}
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceInfo>{service.duration} min · {parseFloat(service.price).toFixed(2)} €</ServiceInfo>
          </ServiceItem>
        ))}
      </ServicesGrid>
    </SelectorContainer>
  );
};

export default ServiceSelector;
