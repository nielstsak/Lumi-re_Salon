import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../contexts/NotificationContext';
import AdminSection from './AdminSection';

const DayRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: calc(var(--spacing-unit) * 3);
  align-items: center;
  padding: calc(var(--spacing-unit) * 2) 0;
  border-bottom: 1px solid var(--border-color);
  opacity: ${({ $isClosed }) => ($isClosed ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

const DayLabel = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-unit);
  font-weight: 600;
`;

const TimeInput = styled.input`
  padding: var(--spacing-unit);
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-family: var(--font-text);
  font-size: 1rem;
  background-color: var(--theme-surface);

  &:disabled {
    background-color: var(--theme-background);
    cursor: not-allowed;
  }
`;

const Actions = styled.div`
  margin-top: calc(var(--spacing-unit) * 4);
`;

const dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const HoursManager = () => {
  const { data: initialHours, loading, error, refresh } = useApi('/opening-hours/');
  const { showNotification } = useNotification();
  const [hours, setHours] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialHours) {
      const formattedHours = dayNames.map((name, index) => {
        const dayOfWeek = index + 1;
        const existing = initialHours.find(h => h.day_of_week === dayOfWeek) || {};
        return {
          day_of_week: dayOfWeek,
          start_time: existing.start_time || '11:00',
          end_time: existing.end_time || '19:00',
          is_open: !!existing.start_time && !!existing.end_time
        };
      });
      setHours(formattedHours);
    }
  }, [initialHours]);

  const handleDayChange = useCallback((dayOfWeek, field, value) => {
    setHours(currentHours =>
      currentHours.map(h => (h.day_of_week === dayOfWeek ? { ...h, [field]: value } : h))
    );
  }, []);

  const handleSaveAll = async () => {
    setIsSaving(true);
    const payload = hours.map(h => ({
      day_of_week: h.day_of_week,
      start_time: h.is_open ? h.start_time : null,
      end_time: h.is_open ? h.end_time : null,
    }));

    try {
      await apiClient.post('/opening-hours/bulk_update/', payload);
      showNotification('Tous les horaires ont été enregistrés.');
      refresh();
    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{color: 'var(--accent-error)'}}>Erreur de chargement.</p>;

  return (
    <AdminSection title="Gérer les Horaires d'ouverture">
      <div>
        {hours.map(h => (
          <DayRow key={h.day_of_week} $isClosed={!h.is_open}>
            <DayLabel>
              <input 
                type="checkbox" 
                checked={h.is_open}
                onChange={(e) => handleDayChange(h.day_of_week, 'is_open', e.target.checked)}
              />
              <strong>{dayNames[h.day_of_week - 1]}</strong>
            </DayLabel>
            <TimeInput 
              type="time" 
              value={h.start_time || ''} 
              disabled={!h.is_open}
              onChange={(e) => handleDayChange(h.day_of_week, 'start_time', e.target.value)} 
            />
            <TimeInput 
              type="time" 
              value={h.end_time || ''}
              disabled={!h.is_open}
              onChange={(e) => handleDayChange(h.day_of_week, 'end_time', e.target.value)} 
            />
          </DayRow>
        ))}
      </div>
      <Actions>
        <Button variant="primary" onClick={handleSaveAll} loading={isSaving} disabled={isSaving}>
          Enregistrer toutes les modifications
        </Button>
      </Actions>
    </AdminSection>
  );
};

export default HoursManager;