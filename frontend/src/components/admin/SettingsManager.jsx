import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import Input from '../common/Input';
import useApi from '../../hooks/useApi';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../contexts/NotificationContext';
import AdminSection from './AdminSection';

const SettingsForm = styled.form`
  max-width: 500px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing-unit) * 3);
  margin-bottom: calc(var(--spacing-unit) * 3);
`;

const SettingsManager = () => {
  const { data: initialBreak, loading, error, refresh } = useApi('/break/');
  const { showNotification } = useNotification();
  const [breakTime, setBreakTime] = useState({ start_time: '13:00', end_time: '14:00' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialBreak) {
      setBreakTime({
        start_time: initialBreak.start_time || '13:00',
        end_time: initialBreak.end_time || '14:00',
      });
    }
  }, [initialBreak]);

  const handleChange = (e) => {
    setBreakTime(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.post('/break/', breakTime);
      showNotification('La pause déjeuner a été mise à jour.');
      refresh();
    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'var(--accent-error)' }}>Erreur de chargement des réglages.</p>;

  return (
    <AdminSection title="Réglages Généraux">
      <SettingsForm onSubmit={handleSubmit}>
        <h3>Pause déjeuner</h3>
        <FormGrid>
          <Input
            label="Début de la pause"
            name="start_time"
            type="time"
            value={breakTime.start_time}
            onChange={handleChange}
          />
          <Input
            label="Fin de la pause"
            name="end_time"
            type="time"
            value={breakTime.end_time}
            onChange={handleChange}
          />
        </FormGrid>
        <Button type="submit" variant="primary" loading={isSaving} disabled={isSaving}>
          Enregistrer les réglages
        </Button>
      </SettingsForm>
    </AdminSection>
  );
};

export default SettingsManager;