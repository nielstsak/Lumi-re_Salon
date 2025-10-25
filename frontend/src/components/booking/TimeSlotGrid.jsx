import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';

const GridWrapper = styled.div`
  animation: subtle-fade-up 0.5s var(--transition-subtle) forwards;
`;

const SectionTitle = styled.h3`
  text-align: left;
  font-size: 1.3rem;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: calc(var(--spacing-unit) * 1.5);
  margin-top: calc(var(--spacing-unit) * 3);
`;

const Actions = styled.div`
  margin-top: calc(var(--spacing-unit) * 4);
  text-align: left;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const toYYYYMMDD = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const TimeSlotGrid = ({ serviceId, date, onSlotSelect, onBack }) => {
  const dateString = date ? toYYYYMMDD(date) : null;
  const { data, loading, error } = useApi(dateString && serviceId ? `/timeslots/available_slots/?date=${dateString}&serviceId=${serviceId}` : null);

  const formatTime = (isoString) => new Date(isoString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });

  if (!date || !serviceId) {
    return null;
  }

  return (
    <GridWrapper>
      <SectionTitle>Choisissez l'heure</SectionTitle>
      {loading && <InfoText>Recherche des créneaux...</InfoText>}
      {error && <InfoText style={{ color: 'var(--accent-error)' }}>Erreur: Impossible de charger les créneaux.</InfoText>}
      
      {data && (
        <Grid>
          {Array.isArray(data.slots) && data.slots.length > 0 ? (
            data.slots.map(slot => (
              <Button 
                key={slot.start} 
                variant="secondary" 
                onClick={() => onSlotSelect(slot)}
              >
                {formatTime(slot.start)}
              </Button>
            ))
          ) : (
            <InfoText>Aucun créneau disponible pour cette date.</InfoText>
          )}
        </Grid>
      )}
      <Actions>
        <Button type="button" variant="secondary" onClick={onBack}>
          Précédent
        </Button>
      </Actions>
    </GridWrapper>
  );
};

export default TimeSlotGrid;
