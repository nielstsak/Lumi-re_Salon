import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import apiClient from '../../services/apiClient';
import { useNotification } from '../../contexts/NotificationContext';
import AdminSection from './AdminSection';

const ManagerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: calc(var(--spacing-unit) * 6);
  align-items: flex-start;
`;

const FormContainer = styled.form`
  background-color: var(--theme-background);
  padding: calc(var(--spacing-unit) * 4);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  position: sticky;
  top: calc(var(--spacing-unit) * 4);
`;

const FormActions = styled.div`
  display: flex;
  gap: var(--spacing-unit);
  margin-top: calc(var(--spacing-unit) * 2);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 1rem;

  th, td {
    padding: calc(var(--spacing-unit) * 2);
    border-bottom: 1px solid var(--border-color);
  }

  th {
    font-family: var(--font-text);
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 1px;
  }
`;

const initialFormState = { id: null, title: '', duration: '', price: '' };

const ServicesManager = () => {
  const { data: services, loading, error, refresh } = useApi('/services/');
  const { showNotification } = useNotification();
  const [formState, setFormState] = useState(initialFormState);
  const [originalService, setOriginalService] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (formState.id) {
      const serviceToEdit = services?.find(s => s.id === formState.id);
      setOriginalService(serviceToEdit || null);
    } else {
      setOriginalService(null);
    }
  }, [formState.id, services]);
  
  const handleChange = e => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = service => setFormState(service);

  const handleCancel = () => {
    if (originalService) {
      setFormState(originalService);
    } else {
      setFormState(initialFormState);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { id, ...data } = formState;
    const url = id ? `/services/${id}/` : '/services/';
    const method = id ? 'put' : 'post';

    try {
      await apiClient[method](url, data);
      showNotification(`Service ${id ? 'mis à jour' : 'ajouté'}.`);
      refresh();
      setFormState(initialFormState);
    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/services/${id}/`);
      showNotification('Service supprimé.');
      refresh();
      if (formState.id === id) {
        setFormState(initialFormState);
      }
    } catch (err) {
      showNotification(`Erreur: ${err.message}`, 'error');
    }
  };

  return (
    <AdminSection title="Gérer les Services">
      <ManagerGrid>
        <FormContainer onSubmit={handleSubmit}>
          <h3>{formState.id ? 'Modifier le service' : 'Ajouter un service'}</h3>
          <Input label="Titre" name="title" value={formState.title} onChange={handleChange} />
          <Input label="Durée (minutes)" name="duration" type="number" value={formState.duration} onChange={handleChange} />
          <Input label="Prix (€)" name="price" type="number" step="0.01" value={formState.price} onChange={handleChange} />
          <FormActions>
            <Button type="submit" variant="primary" loading={isSaving} disabled={isSaving}>
              {formState.id ? 'Mettre à jour' : 'Créer'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCancel}>Annuler</Button>
          </FormActions>
        </FormContainer>
        
        <div>
          {loading && <p>Chargement...</p>}
          {error && <p style={{color: 'var(--accent-error)'}}>Erreur de chargement.</p>}
          <Table>
            <thead>
              <tr><th>Titre</th><th>Durée</th><th>Prix</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {services?.map(service => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.duration} min</td>
                  <td>{service.price} €</td>
                  <td>
                    <Button variant="secondary" onClick={() => handleEdit(service)}>Modifier</Button>
                    <Button variant="secondary" onClick={() => handleDelete(service.id)}>Supprimer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </ManagerGrid>
    </AdminSection>
  );
};

export default ServicesManager;